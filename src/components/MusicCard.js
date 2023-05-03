import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: false,
      check: false,
    };
  }

  componentDidMount() {
    const { favoritePage } = this.props;
    if (favoritePage) {
      this.setState({ check: true });
    }
  }

  handleAddSong = async () => {
    const { element } = this.props;
    this.setState({ carregando: true });
    await addSong(element);
    this.setState({ carregando: false, check: true });
  };

  handleRemoveSong = async () => {
    const { element, onRemove } = this.props;
    this.setState({ carregando: true });
    await removeSong(element.trackId);
    this.setState({ carregando: false, check: false });
    onRemove();
  };

  render() {
    const { element, playing, favoritePage } = this.props;
    const { check } = this.state;
    return (
      <div className='audioContainer'>
        {check && !favoritePage && <p className='WordFavorite'>Música adicionada aos favoritos</p>}

        <p className='NameOfMusic'>{element.trackName}</p>

        <div className='audioPlayer'>
          <audio className='audio' src={element.previewUrl} controls autoPlay={playing} />
          {favoritePage ? (
            <button className='buttonRemove' type="button" onClick={this.handleRemoveSong}>
              Remover dos favoritos
            </button>
          ) : (
            <button className='buttonFavorite' type="button" onClick={this.handleAddSong}>
              Adicionar aos favoritos
            </button>
          )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  element: PropTypes.object.isRequired,
  playing: PropTypes.bool,
  onPlay: PropTypes.func.isRequired,
  favoritePage: PropTypes.bool,
  onRemove: PropTypes.func,
};

MusicCard.defaultProps = {
  playing: false,
  favoritePage: false,
  onRemove: () => {},
};

export default MusicCard;
