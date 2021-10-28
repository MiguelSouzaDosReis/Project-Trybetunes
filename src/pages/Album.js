import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

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
    const { artistName, collectionName, artworkUrl100, album, carregando } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {carregando && <Carregando />}
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        <img src={ artworkUrl100 } alt={ collectionName } />
        {album.slice(1).map((element) => (
          <MusicCard key={ element.collectionId } element={ element } />
        ))}

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
