import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { auth, db } from '../fBase';

const Profile = ({ userObj }) => {
  useEffect(() => {
    getMyYweets();
  }, []);

  const handleLogOutClick = () => {
    signOut(auth);
    return <Navigate replace to='/' />;
  };
  const getMyYweets = async () => {
    const yweets = await getDocs(
      query(collection(db, 'yweets'), where('creatorId', '==', userObj.uid), orderBy('createdAt'))
    );
    console.log(yweets.docs.map((doc) => doc.data()));
  };

  return (
    <div>
      <Navigation />
      <button onClick={handleLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
