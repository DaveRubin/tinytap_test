import styled from '@emotion/styled';

export const ClippedImageWrapper = styled.div(
  {
    position: 'relative',
    height: 0,
    width: 0,
    ':hover .removeButton': {
      opacity: 1
    }
  },
  ({ offset }) => ({
    left: offset[0],
    top: offset[1]
  })
);

export const IconWrapper = styled.div({
  color: 'white',
  position: 'absolute',
  zIndex: 999,
  opacity: 0,
  transition: 'opacity 0.2s',
  cursor: 'pointer'
});

export const ClippedImageCanvas = styled.canvas(
  {
    position: 'relative',
    top: 0,
    left: 0,
    display: 'block'
  },
  ({ dimensions, isDraggable, isDrag }) => ({
    cursor: isDraggable && (isDrag ? 'grabbing' : 'grab'),
    filter: isDraggable ? 'drop-shadow(0 5px 10px #000)' : null,
    width: dimensions[0],
    height: dimensions[1]
  })
);
