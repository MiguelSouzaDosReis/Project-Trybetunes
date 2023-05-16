import React from 'react';
import { updateUser, getUser } from '../services/userAPI';



class ProfileEdit extends React.Component {
state = {
  name: '',
  email: '',
  description: '',
  image: '',
  isLoading: true,
  isSaving: false,
  isValid: false,
};

componentDidMount() {
  getUser().then(user => {
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      isLoading: false,
    });
  });
}

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value }, this.validateForm);
};

handleFileInputChange = event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.setState({ image: reader.result }, this.validateForm);
  };
};

handleSubmit = event => {
  event.preventDefault();
  if (this.state.isValid) {
    this.setState({ isSaving: true });
    updateUser({
      name: this.state.name,
      email: this.state.email,
      description: this.state.description,
      image: this.state.image,
    })
    .then(() => {
      this.setState({ isSaving: false });
      this.props.history.push('/profile');
    })
    .catch(error => {
      console.error(error);
      this.setState({ isSaving: false });
    });
  }
  window.location.reload();

};

validateForm = () => {
  const { name, email, description } = this.state;
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  const isValid = name && email && emailRegex.test(email) && description;
  this.setState({ isValid });
};

render() {
const { name, email, description, image, isSaving, isValid } = this.state;

return (
  <div className='containerPefilEdit'>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="edit-input-name">
          Nome
          <input
            id="edit-input-name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            className='inputName'
          />
        </label>
        <label htmlFor="edit-input-email">
          Email
          <input
            id="edit-input-email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            className='inputEmail'
          />
        </label>
        <label htmlFor="edit-input-description">
          Descrição
          <textarea
            id="edit-input-description"
            name="description"
            value={description}
            onChange={this.handleInputChange}
            className='inputDescricao'
          />
        </label>
                <label htmlFor="edit-input-image">
          <input
            id="edit-input-image"
            type="file"
            accept="image/*"
            onChange={this.handleFileInputChange}
            className='inputImage'
          />
          <img className='imageLillte' src={image}/>
        </label>
        <button
          type="submit"
          disabled={isSaving || !isValid}
          className='ButtonSave'
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
  </div>
);
}
}

export default ProfileEdit;