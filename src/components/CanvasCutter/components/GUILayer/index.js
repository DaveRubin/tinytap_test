import React from 'react';
import { DrawCanvas, GUILayerWrapper } from './styles';

export class GUILayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      shape: []
    };
    this.canvasRef = React.createRef();
    this.context2d = null;
    this.bounds = null;
  }

  setBounds = bounds => (this.bounds = bounds);
  setContext2D = context2d => (this.context2d = context2d);

  makeSureContextIsAvailable = () => {
    if (!this.context2d && this.canvasRef.current) {
      this.setContext2D(this.canvasRef.current.getContext('2d'));
      this.setBounds(this.canvasRef.current.getBoundingClientRect());
    }
  };

  initiateShape = position => {
    this.context2d.beginPath();
    this.context2d.setLineDash([10, 10]);
    this.context2d.lineWidth = '5';
    this.context2d.strokeStyle = 'white';
    this.context2d.fillStyle = 'rgba(255, 255, 255, 0.2)';
    this.context2d.moveTo(...position);
  };

  lineToPoint = point => {
    this.context2d.clearRect(0, 0, this.bounds.width, this.bounds.height);
    this.context2d.lineTo(...point);
    this.context2d.stroke();
    this.context2d.fill();
  };

  finalizeShape = position => {
    this.lineToPoint(position);
    this.context2d.closePath();
    this.context2d.stroke();
  };

  startDrawing = ({ clientX, clientY }) => {
    this.makeSureContextIsAvailable();
    if (!this.state.isDrawing) {
      const { left, top } = this.bounds;
      const position = [clientX - left, clientY - top];
      this.initiateShape(position);
      this.setState({ isDrawing: true, shape: [position] });
    }
  };

  endDrawing = ({ clientX, clientY }) => {
    if (this.state.isDrawing) {
      const { shape } = this.state;
      const { left, top } = this.bounds;
      const position = [clientX - left, clientY - top];
      this.updateShape(position, true);
      this.props.onShapeComplete(shape);
      this.finalizeShape(position);
    }
  };

  moveDrawing = ({ clientX, clientY }) => {
    if (this.state.isDrawing) {
      const { left, top } = this.bounds;
      const position = [clientX - left, clientY - top];
      this.updateShape(position);
      this.lineToPoint(position);
    }
  };

  updateShape = (position, closeShape = false) => {
    const { shape } = this.state;
    shape.push(position);
    if (closeShape) shape.push(shape[0]);
    this.setState({ shape, isDrawing: !closeShape });
  };

  render() {
    const { dimensions } = this.props;
    return (
      <GUILayerWrapper>
        <DrawCanvas
          ref={this.canvasRef}
          className="drawingArea"
          onMouseDown={this.startDrawing}
          onMouseUp={this.endDrawing}
          onMouseMove={this.moveDrawing}
          {...dimensions}
        />
      </GUILayerWrapper>
    );
  }
}
