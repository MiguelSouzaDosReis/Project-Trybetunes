import React from 'react';
import Header from '../components/Header';
import ProfileEdit from './ProfileEdit';

class Profile extends React.Component {
  render() {
    return (
      <div className='containerSearch'>
        <Header />
        <ProfileEdit />
      </div>
    );
  }
}

export default Profile;
