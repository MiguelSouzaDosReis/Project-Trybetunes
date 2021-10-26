import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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

  render() {
    const { objeto, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          {objeto.name}
        </span>
        {carregando && <Carregando />}
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
