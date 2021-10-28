import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { element } = this.props;
    return (
      <div>
        <p>{element.trackName}</p>
        <audio data-testid="audio-component" src={ element.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>

    );
  }
}
MusicCard.propTypes = {
  element: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
