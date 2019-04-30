import styled from '@emotion/styled';
import { Button } from './components/shared/components/Button';

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

export const ResetButton = styled(Button)({
  position: 'absolute',
  zIndex: 999,
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white'
});
