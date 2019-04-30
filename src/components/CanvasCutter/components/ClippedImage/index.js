import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ClippedImageWrapper, ClippedImageCanvas, IconWrapper } from './styles';
import { getShapeBounds } from '../shared/shapeHelpers';
import { FaTimesCircle } from 'react-icons/fa';

const HOLE_COLOR = '#111';

export class ClippedImage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { offset, dimensions } = getShapeBounds(props.shape);
    this.state = {
      isDrag: false,
      lastDragPosition: null,
      offset,
      dimensions
    };
    this.canvasRef = React.createRef();
  }

  startDrag = ({ clientX, clientY }) => {
    this.setState({
      isDrag: true,
      lastDragPosition: [clientX, clientY]
    });
  };
  drag = ({ clientX, clientY }, isFinalDrag = false) => {
    if (this.state.isDrag) {
      const { offset, lastDragPosition } = this.state;
      offset[0] += clientX - lastDragPosition[0];
      offset[1] += clientY - lastDragPosition[1];
      this.setState({
        isDrag: !isFinalDrag,
        lastDragPosition: isFinalDrag ? null : [clientX, clientY]
      });
    }
  };
  stopDrag = event => this.drag(event, true);

  componentDidMount = () => {
    if (_.get(this.canvasRef, 'current', null)) {
      const { isDraggable, imageSrc, shape, imageDimensions } = this.props;
      const { offset, dimensions } = this.state;
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.canvas.width = dimensions[0];
      ctx.canvas.height = dimensions[1];
      ctx.beginPath();
      ctx.setLineDash([10, 10]);
      ctx.lineWidth = 8;
      ctx.strokeStyle = 'white';
      ctx.fillStyle = HOLE_COLOR;
      shape.forEach(([x, y], index) => {
        const action = index === 0 ? 'moveTo' : 'lineTo';
        ctx[action](x - offset[0], y - offset[1]);
      });
      ctx.closePath();
      if (isDraggable) {
        ctx.clip();
        ctx.drawImage(
          imageSrc,
          -offset[0],
          -offset[1],
          imageDimensions.width,
          imageDimensions.height
        );
        ctx.stroke();
      } else {
        ctx.fill();
      }
    }
  };

  render() {
    const { offset, dimensions, isDrag } = this.state;
    const { isDraggable } = this.props;
    const dragActions = isDraggable
      ? {
          onMouseDown: this.startDrag,
          onMouseUp: this.stopDrag,
          onMouseMove: this.drag
        }
      : {};
    return (
      <ClippedImageWrapper offset={offset}>
        {isDraggable && (
          <IconWrapper className="removeButton" onClick={this.props.onRemove}>
            <FaTimesCircle />
          </IconWrapper>
        )}
        <ClippedImageCanvas
          isDraggable={isDraggable}
          isDrag={isDrag}
          className="clippedImage"
          dimensions={dimensions}
          ref={this.canvasRef}
          {...dragActions}
        />
      </ClippedImageWrapper>
    );
  }
}

ClippedImage.propTypes = {
  isDraggable: PropTypes.bool,
  imageSrc: PropTypes.object,
  imageDimensions: PropTypes.object,
  shape: PropTypes.array,
  onRemove: PropTypes.func
};
