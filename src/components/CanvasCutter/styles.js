import styled from '@emotion/styled';

export const CanvasCutterWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  height: '100%'
});

export const ImagesContainer = styled.div({});

export const BaseImage = styled.img({
  maxHeight: '100vh'
});

export const ImagePartsContainer = styled.div({
  position: 'absolute',
  top: 0,
  width: 0,
  height: 0
});

export const ResetButton = styled.button({
  position: 'absolute',
  zIndex: 999,
  border: 'none',
  borderRadius: 5,
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white'
});
