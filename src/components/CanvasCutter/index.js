import React from 'react';
import { CanvasCutterWrapper } from './styles';
import { ImageSelector } from './components/ImageSelector';

const INITIAL_STATE = {
  imageSrc: null,
  parts: []
};

export class CanvasCutter extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onImageSelected = imageSrc => {
    this.setState({ imageSrc });
  };

  resetScene = () => this.setState(INITIAL_STATE);

  render() {
    const { imageSrc } = this.state;
    return (
      <CanvasCutterWrapper>
        {imageSrc === null ? (
          <ImageSelector
            className="imageSelector"
            onImageSelected={this.onImageSelected}
          />
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
