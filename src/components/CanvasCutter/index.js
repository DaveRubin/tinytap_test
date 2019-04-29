import React from 'react';
import _ from 'lodash';
import { CanvasCutterWrapper, ImagesContainer, BaseImage } from './styles';
import { ImageSelector } from './components/ImageSelector';
import { GUILayer } from './components/GUILayer';

const INITIAL_STATE = {
  imageSrc: null,
  imageDimensions: { width: 0, height: 0 },
  parts: []
};

export class CanvasCutter extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.imageRef = React.createRef();
  }

  onImageSelected = imageSrc => {
    this.setState({ imageSrc });
  };

  resetScene = () => this.setState(INITIAL_STATE);

  componentDidUpdate(prevProps, prevState) {
    const image = _.get(this.imageRef, 'current', null);
    if (image && this.state.imageSrc !== prevState.imageSrc) {
      const imageDimensions = {
        width: image.clientWidth,
        height: image.clientHeight
      };
      console.log(imageDimensions);
      console.log(image);
      this.setState({
        imageDimensions
      });
    }
  }

  render() {
    const { imageSrc, imageDimensions } = this.state;

    return (
      <CanvasCutterWrapper>
        {imageSrc === null ? (
          <ImageSelector
            className="imageSelector"
            onImageSelected={this.onImageSelected}
          />
        ) : (
          <ImagesContainer className="ImageContainer">
            <BaseImage
              className="baseImage"
              src={imageSrc}
              ref={this.imageRef}
              alt=""
            />
            <GUILayer
              className="guiLayer"
              onShapeComplete={console.log}
              dimensions={imageDimensions}
            />
            <div className="imageParts" />
            <button className="resetSceneButton" onClick={this.resetScene} />
          </ImagesContainer>
        )}
      </CanvasCutterWrapper>
    );
  }
}
