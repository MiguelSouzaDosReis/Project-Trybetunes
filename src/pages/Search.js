import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbum from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      botoaDesabilidado: true,
      name: '',
      carregando: false,
      album: [],
      lastName: '',
    };
  }

  HabilitarOBotao = (event) => {
    const um = 1;
    const { name } = this.state;
    this.setState({ name: event.target.value });
    if (name.length >= um) {
      this.setState({
        botoaDesabilidado: false,
      });
    }
  }

  CarregandoTrue = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ carregando: true, lastName: name });
    const response = await searchAlbum(name);
    this.setState({ carregando: false, album: [...response], name: '' });
  }

  AlbumVazioECheio = () => {
    const { album, lastName } = this.state;
    if (album.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section>
        <h1>{`Resultado de álbuns de: ${lastName}`}</h1>
        {album.map((element) => (
          <Link
            data-testid={ `link-to-album-${element.collectionId}` }
            to={ `/album/${element.collectionId}` }
            key={ element.collectionId }
          >
            <h2>{element.artistName}</h2>
            <img src={ element.artworkUrl100 } alt="imagem do album" />
            <h3>{element.collectionName}</h3>
          </Link>
        ))}
      </section>);
  }

  render() {
    const { botoaDesabilidado, carregando, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {carregando ? <Carregando /> : (
          <form onSubmit={ this.CarregandoTrue }>
            <input
              value={ name }
              onChange={ this.HabilitarOBotao }
              data-testid="search-artist-input"
            />
            <button
              disabled={ botoaDesabilidado }
              type="submit"
              data-testid="search-artist-button"
            >
              Pesquisar

            </button>
          </form>
        )}
        {this.AlbumVazioECheio()}
      </div>
    );
  }
}

export default Search;
