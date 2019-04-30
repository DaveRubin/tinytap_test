import styled from '@emotion/styled';

export const Backdrop = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const Panel = styled.div({
  backgroundColor: 'white',
  width: 300,
  padding: 15,
  borderRadius: 10,
  filter: 'drop-shadow(0 5px 10px #000)',
  textAlign: 'center'
});
