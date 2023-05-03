import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbum from '../services/searchAlbumsAPI';

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
      return <p className='errorMessage'>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section className='SectionOfMusic'>
        <div className='container'>
          <h1 className='ResultsMusic'>{`Resultado de álbuns de: ${lastName}`}</h1>
          <div className="cards">
            {album.map((element) => (
              <Link
                className="linkSearc"
                to={`/album/${element.collectionId}`}
                key={element.collectionId}
              >
                <div className="card-item">
                  <img className='ImageMusic' src={element.artworkUrl100} alt="imagem do album" />
                  <h3 className='artistName'>{element.artistName}</h3>
                  <h4 className='CollectionName'>{element.collectionName}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { botoaDesabilidado, name } = this.state;
    return (
      <div className='containerSearch'>
        <Header />
          <form onSubmit={ this.CarregandoTrue }>
            <input
              value={ name }
              onChange={ this.HabilitarOBotao }
              className='inputNameMusic'
            />
            <button
              disabled={ botoaDesabilidado }
              type="submit"
              className='search'
            >
              Pesquisar

            </button>
          </form>
        {this.AlbumVazioECheio()}
      </div>
    );
  }
}

export default Search;
