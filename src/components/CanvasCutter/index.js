import React from 'react';
import _ from 'lodash';
import {
  CanvasCutterWrapper,
  ImagesContainer,
  BaseImage,
  ImagePartsContainer,
  ResetButton
} from './styles';
import { ImageSelector } from './components/ImageSelector';
import { GUILayer } from './components/GUILayer';
import { ClippedImage } from './components/ClippedImage';
import { messages } from './messages';

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
    this.partId = 0;
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
      this.setState({
        imageDimensions
      });
    }
  }

  addPart = shape => {
    const { parts } = this.state;
    parts.push({ shape, id: this.partId });
    this.partId++;
    this.setState({ parts });
  };

  getRemoveListener = idToRemove => () => {
    const { parts } = this.state;
    _.remove(parts, ({ shape, id }) => id === idToRemove);
    this.setState({ parts });
  };

  renderPart = (isDraggable, imageDimensions) => ({ shape, id }) => (
    <ClippedImage
      isDraggable={isDraggable}
      imageSrc={this.imageRef.current}
      imageDimensions={imageDimensions}
      shape={shape}
      key={isDraggable ? `draggable_${id}` : `hole_${id}`}
      className={isDraggable ? 'draggablePart' : 'partHole'}
      onRemove={this.getRemoveListener(id)}
    />
  );

  render() {
    const { imageSrc, imageDimensions, parts } = this.state;
    return (
      <CanvasCutterWrapper>
        {imageSrc === null ? (
          <ImageSelector
            className="imageSelector"
            onImageSelected={this.onImageSelected}
          />
        ) : (
          <ImagesContainer className="ImageContainer">
            <ResetButton className="resetSceneButton" onClick={this.resetScene}>
              {messages.reset}
            </ResetButton>
            <BaseImage
              className="baseImage"
              src={imageSrc}
              ref={this.imageRef}
              alt=""
            />
            <ImagePartsContainer className="holes">
              {parts.map(this.renderPart(false, imageDimensions))}
            </ImagePartsContainer>
            <GUILayer
              className="guiLayer"
              onShapeComplete={this.addPart}
              dimensions={imageDimensions}
            />
            <ImagePartsContainer className="imageParts">
              {parts.map(this.renderPart(true, imageDimensions))}
            </ImagePartsContainer>
          </ImagesContainer>
        )}
      </CanvasCutterWrapper>
    );
  }
}
