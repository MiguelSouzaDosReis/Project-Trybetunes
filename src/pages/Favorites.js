import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteSongs: [],
      carregando: false,
      selectedSongId: null,
    };
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = async () => {
    this.setState({ carregando: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ carregando: false, favoriteSongs });
  };

  handleSongSelect = (trackId) => {
    const { selectedSongId } = this.state;
    if (selectedSongId === trackId) {
      this.setState({ selectedSongId: null });
    } else {
      this.setState({ selectedSongId: trackId });
    }
  };

  handleSongRemove = async (trackId) => {
  const favoriteSongs = JSON.parse(localStorage.getItem('favorite_songs')) || [];

  const updatedFavoriteSongs = favoriteSongs.filter(song => song.trackId !== trackId);

  localStorage.setItem('favorite_songs', JSON.stringify(updatedFavoriteSongs));
  window.location.reload();

  };

  handleSongPlay = (trackId) => {
    this.setState({ selectedSongId: trackId });
    const audio = new Audio(this.state.favoriteSongs.find(song => song.trackId === trackId).previewUrl);
    audio.play();
  };

  render() {
    const { favoriteSongs, selectedSongId } = this.state;
    return (
      <div className='containerFavorite'>
        <Header />
        <div className='containerMusic'>
        <h1>Músicas Favoritas</h1>
        {favoriteSongs.length === 0 && <p className='errorMessage'>Não há músicas favoritas</p>}
        {favoriteSongs.map((element) => (
          <MusicCard
            key={element.trackId}
            element={element}
            selected={selectedSongId === element.trackId}
            onSelect={() => this.handleSongSelect(element.trackId)}
            onRemove={() => this.handleSongRemove(element.trackId)}
            onPlay={() => this.handleSongPlay(element.trackId)}
            favoritePage
          />
        ))}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Favorites;
