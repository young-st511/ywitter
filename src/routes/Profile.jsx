import { signOut } from 'firebase/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { auth } from '../fBase';

const Profile = () => {
  const handleLogOutClick = () => {
    signOut(auth);
    return <Navigate replace to='/' />
  }
  
  return (
    <div>
      <Navigation />
      <button onClick={handleLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
