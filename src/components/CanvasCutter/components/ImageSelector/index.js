import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { PreviewImage } from './styles';
import { messages } from './messages';

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

  render() {
    const { imageSrc } = this.state;
    return (
      <div>
        <input
          onChange={this.readUrl}
          className="fileSelection"
          type="file"
          ref={this.inputRef}
        />
        {imageSrc ? (
          <div>
            <PreviewImage
              className="previewImage"
              src={imageSrc}
              alt="preview"
            />
            <button className="selectImageButton" onClick={this.onImageSelect}>
              {messages.selectImage}
            </button>
          </div>
        ) : (
          <p className="selectImageText">{messages.pleaseSelect}</p>
        )}
      </div>
    );
  }
}

ImageSelector.propTypes = {
  onImageSelected: PropTypes.func
};
