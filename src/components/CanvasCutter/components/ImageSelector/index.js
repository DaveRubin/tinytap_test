import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  PreviewWrapper,
  PreviewImage,
  FileInput,
  FileInputBox,
  FileInputText,
  IconWrapper,
  ImageSelectorWrapper,
  SelectButton
} from './styles';
import { messages } from './messages';
import { FaImage } from 'react-icons/fa';

export class ImageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null
    };
    this.inputRef = React.createRef();
    this.reader = new FileReader();
    this.reader.addEventListener('load', this.onReaderOnload);
  }

  onReaderOnload = event => {
    this.setState({ imageSrc: event.target.result });
  };

  readUrl = () => {
    // TODO: should add type check to verify only image types pass
    const selectedFile = _.get(this.inputRef, 'current.files[0]', null);
    if (selectedFile) {
      this.reader.readAsDataURL(selectedFile);
    }
  };
  onImageSelect = () => {
    const { imageSrc } = this.state;
    this.props.onImageSelected(imageSrc);
  };

  renderPreview = () =>
    this.state.imageSrc && (
      <PreviewWrapper>
        <SelectButton
          className="selectImageButton"
          onClick={this.onImageSelect}
        >
          {messages.selectImage}
        </SelectButton>
        <PreviewImage
          className="previewImage"
          src={this.state.imageSrc}
          alt="preview"
        />
      </PreviewWrapper>
    );

  render() {
    const { imageSrc } = this.state;
    return (
      <ImageSelectorWrapper>
        <FileInputBox>
          <FileInputText>
            <IconWrapper>
              <FaImage />
            </IconWrapper>
            <p className="selectImageText">
              {imageSrc ? messages.dragToReplace : messages.pleaseSelect}
            </p>
          </FileInputText>
          <FileInput
            onChange={this.readUrl}
            className="fileSelection"
            type="file"
            name="file"
            id="fileSelection"
            ref={this.inputRef}
          />
        </FileInputBox>
        {this.renderPreview()}
      </ImageSelectorWrapper>
    );
  }
}

ImageSelector.propTypes = {
  onImageSelected: PropTypes.func
};
