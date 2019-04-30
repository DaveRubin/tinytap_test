import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  ClippedImageWrapper,
  ClippedImageCanvas,
  RemoveButton
} from './styles';

const HOLE_COLOR = '#111';

export class ClippedImage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { offset, dimensions } = this.getShapeBounds();
    this.state = {
      isDrag: false,
      lastDragPosition: null,
      offset,
      dimensions
    };
    this.canvasRef = React.createRef();
  }

  getShapeBounds = () => {
    const { shape } = this.props;
    const { minY, minX, maxX, maxY } = shape.reduce(
      (acc, [x, y]) => {
        if (x > acc.maxX) acc.maxX = x;
        if (x < acc.minX) acc.minX = x;
        if (y > acc.maxY) acc.maxY = y;
        if (y < acc.minY) acc.minY = y;
        return acc;
      },
      {
        minY: Number.POSITIVE_INFINITY,
        minX: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY
      }
    );
    return {
      offset: [minX, minY],
      dimensions: [maxX - minX, maxY - minY]
    };
  };

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
      } else {
        ctx.fill();
      }
    }
  };

  render() {
    const { offset, dimensions } = this.state;
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
          <RemoveButton
            className="removeButton"
            onClick={this.props.onRemove}
          />
        )}
        <ClippedImageCanvas
          shadow={isDraggable}
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
