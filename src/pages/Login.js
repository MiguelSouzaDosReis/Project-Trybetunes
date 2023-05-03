import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

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
    const { redirect } = this.state;
    return (
      <div>
          <h1 className='title'>Trybetunes</h1>
        <div className='container'>
          {redirect && <Redirect to="/search" />}
          <form>
            <input
              className='text'
              value={ name }
              data-testid="login-name-input"
              type="text"
              onChange={ HabilitarOBotao }
              placeholder='name'
            />
            <button
              data-testid="login-submit-button"
              onClick={ this.CarregandoTrue }
              type="submit"
              disabled={ botoaDesabilidado }
              className='enter'
            >
              Entrar
            </button>
          </form>
        </div>
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
