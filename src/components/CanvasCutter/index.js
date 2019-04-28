import React from 'react';
import { CanvasCutterWrapper } from './styles';

const INITIAL_STATE = {
  loadedImage: null,
  parts: []
};

class CanvasCutter extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onImageLoad = ({ image }) => {
    this.setState({ loadedImage: image });
  };
  resetScene = () => this.setState(INITIAL_STATE);

  render() {
    const { loadedImage } = this.state;
    return (
      <CanvasCutterWrapper>
        {loadedImage === null ? (
          <div className="imageSelector" onImageLoad={this.onImageLoad} />
        ) : (
          <div className="ImageContainer">
            <div className="baseImage" />
            <div className="guiLayer" />
            <div className="imageParts" />
            <button className="resetSceneButton" onClick={this.resetScene} />
          </div>
        )}
      </CanvasCutterWrapper>
    );
  }
}

export default CanvasCutter;
