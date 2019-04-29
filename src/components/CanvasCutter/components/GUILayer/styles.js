import styled from '@emotion/styled';

export const DrawCanvas = styled.canvas(
  {
    position: 'relative',
    top: 0,
    left: 0,
    display: 'block'
  },
  ({ width, height }) => ({
    width,
    height
  })
);

export const GUILayerWrapper = styled.div({
  position: 'absolute',
  top: 0
});
