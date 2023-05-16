import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

const DEFAULT_PROFILE_IMAGE = 'https://cdn0.iconfinder.com/data/icons/head-1/128/10-512.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      objeto: {},
      carregando: false,
    };
  }

  componentDidMount() {
    this.BuscaUsuario();
  }

  BuscaUsuario = () => {
    this.setState({ carregando: true },
      () => getUser().then((response) => {
        this.setState({ objeto: response, carregando: false });
      }));
  }

  getImageUrl(objeto) {
    if (this.state.carregando) {
      return "https://convertingcolors.com/chess-F2F2F2.svg" ;
    } else if (objeto.image) {
      return objeto.image;
    } else {
      return DEFAULT_PROFILE_IMAGE;
    }
  }

  render() {
    const { objeto, carregando } = this.state;
    return (
      <header>
        <h1 className='titleHeader'>Trybetunes</h1>
        <span>
          <p className='name'> {objeto.name} </p>
          <img src={this.getImageUrl(objeto)} alt="Imagem do perfil" />
        </span>
        {carregando && <Carregando />}
        <div className='navbar'>
          <Link className="navbar-link" to="/search">Search</Link>
          <Link className="navbar-link" to="/favorites"> Favoritos </Link>
          <Link className="navbar-link" to="/profile"> Profile </Link>
        </div>
      </header>
    );
  }
}

export default Header;
