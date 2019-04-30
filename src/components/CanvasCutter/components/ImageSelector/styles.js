import styled from '@emotion/styled';

const boxDimensions = {
  width: 400,
  height: 200
};
const columnFlex = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export const PreviewImage = styled.img({
  width: 400
});

export const PreviewWrapper = styled.div({
  width: boxDimensions.width,
  ...columnFlex
});

export const SelectButton = styled.button({
  border: 'none',
  borderRadius: 5,
  padding: 5,
  margin: 10
});

export const ImageSelectorWrapper = styled.div({
  ...columnFlex
});

export const FileInput = styled.input({
  width: '100%',
  height: '100%',
  opacity: 0,
  position: 'relative',
  top: -boxDimensions.height,
  cursor: 'pointer'
});

export const FileInputBox = styled.div({
  backgroundColor: '#FF4433',
  color: 'white',
  outline: '2px dashed #FFF',
  outlineOffset: -10,
  ...boxDimensions
});

export const IconWrapper = styled.span({
  fontSize: '100px',
  ...columnFlex
});

export const FileInputText = styled.div({
  ...columnFlex,
  ...boxDimensions
});
