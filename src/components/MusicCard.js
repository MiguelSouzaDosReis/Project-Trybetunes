import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      check: false,
    };
  }

  AdicionarMusica = async () => {
    const { element } = this.props;
    this.setState({ carregando: true });
    await addSong({ element });
    this.setState({ carregando: false, check: true });
  }

  render() {
    const { element } = this.props;
    const { carregando, check } = this.state;
    return (
      <div>
        {carregando && <Carregando /> }

        <p>{element.trackName}</p>
        <audio data-testid="audio-component" src={ element.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        <label htmlFor={ element.trackId }>

          <input
            data-testid={ `checkbox-music-${element.trackId}` }
            type="checkbox"
            checked={ check }
            onChange={ this.AdicionarMusica }
          />
          {' '}
          Favorita
        </label>
      </div>

    );
  }
}
MusicCard.propTypes = {
  element: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
