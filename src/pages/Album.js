import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    this.AlbumCheio();
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

  render() {
    const { artistName, collectionName, artworkUrl100, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
