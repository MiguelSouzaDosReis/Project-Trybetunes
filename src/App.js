import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Logins from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      botoaDesabilidado: true,
      name: '',
    };
  }

  HabilitarOBotao = (event) => {
    const { name } = this.state;
    this.setState({ name: event.target.value });
    if (name.length >= 0) {
      this.setState({
        botoaDesabilidado: false,
      });
    }
  }

  render() {
    const { botoaDesabilidado, name } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ () => (<Logins
            botoaDesabilidado={ botoaDesabilidado }
            name={ name }
            HabilitarOBotao={ this.HabilitarOBotao }
          />) }
        />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
