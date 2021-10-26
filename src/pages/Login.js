import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Logins extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      redirect: false,
    };
  }

  CarregandoTrue = (event) => {
    event.preventDefault();
    const { name } = this.props;
    this.setState({ carregando: true }, () => {
      createUser({ name })
        .then(() => this.setState({ redirect: true }));
    });
  }

  render() {
    const { botoaDesabilidado, name, HabilitarOBotao } = this.props;
    const { carregando, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {carregando && <Carregando />}
        {redirect && <Redirect to="/search" />}
        <form>
          <input
            value={ name }
            data-testid="login-name-input"
            type="text"
            onChange={ HabilitarOBotao }
          />
          <button
            data-testid="login-submit-button"
            onClick={ this.CarregandoTrue }
            type="submit"
            disabled={ botoaDesabilidado }
          >
            Entrar
          </button>
        </form>

      </div>

    );
  }
}

Logins.propTypes = {
  botoaDesabilidado: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  HabilitarOBotao: PropTypes.func.isRequired,

};
export default Logins;
