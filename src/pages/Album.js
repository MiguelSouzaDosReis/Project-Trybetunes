import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      carregando: false,
      favorito: [],
    };
  }

  componentDidMount() {
    this.AlbumCheio();
    this.FavoriteSongs();
  }

  componentDidUpdate(_paramentro, estadoAnterior) {
    const { favorito } = this.state;
    if (estadoAnterior.favorito !== favorito) {
      this.CheckDeFavoritos();
    }
  }

  AlbumCheio = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await musicsAPI(id);
    this.setState({
      album: response,
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
      artworkUrl100: response[0].artworkUrl100,
    });
  }

  FavoriteSongs = async () => {
    this.setState({ carregando: true });
    const resposta = await getFavoriteSongs();
    this.setState({ carregando: false, favorito: resposta });
  }

  CheckDeFavoritos = () => {
    const { favorito } = this.state;
    favorito.forEach(({ trackId }) => {
      const id = document.getElementById(trackId);
      if (id) {
        id.checked = true;
      }
    });
  }

  render() {
    const { artistName, collectionName, artworkUrl100, album } = this.state;
    return (
      <div>
        <Header />
        <div className='containerCard'>
          <h1 className='artistNameMusicCard'>{ artistName }</h1>
          <h2 className='collectionNameMusicCard'>{ collectionName }</h2>
          <img className='imagemMusicCard'  width="200" src={ artworkUrl100 } alt={ collectionName } />
          {album.slice(1).map((element) => (
            <MusicCard key={ element.collectionId } element={ element } />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
