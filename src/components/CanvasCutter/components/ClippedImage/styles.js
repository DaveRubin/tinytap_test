import styled from '@emotion/styled';

export const ClippedImageWrapper = styled.div(
  {
    position: 'relative',
    height: 0,
    width: 0
  },
  ({ offset }) => ({
    left: offset[0],
    top: offset[1]
  })
);

export const RemoveButton = styled.button({
  position: 'absolute',
  top: 0,
  zIndex: 999
});
export const ClippedImageCanvas = styled.canvas(
  {
    position: 'relative',
    top: 0,
    left: 0,
    display: 'block'
  },
  ({ dimensions, shadow }) => ({
    filter: shadow ? 'drop-shadow(0 5px 10px #000)' : null,
    width: dimensions[0],
    height: dimensions[1]
  })
);
