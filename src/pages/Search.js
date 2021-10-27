import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      botoaDesabilidado: true,
      name: '',
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

  render() {
    const { botoaDesabilidado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input onChange={ this.HabilitarOBotao } data-testid="search-artist-input" />
          <button
            disabled={ botoaDesabilidado }
            type="submit"
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
