import { signOut, updateProfile } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { auth, db } from '../fBase';

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  useEffect(() => {
    getMyYweets();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj.displayName != newDisplayName) {
      updateProfile(userObj, {
        displayName: newDisplayName,
      });
    }
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const handleLogOutClick = () => {
    signOut(auth);
    return <Navigate replace to='/' />;
  };
  const getMyYweets = async () => {
    const yweets = await getDocs(
      query(
        collection(db, 'yweets'),
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt')
      )
    );
    console.log(yweets.docs.map((doc) => doc.data()));
  };

  return (
    <div>
      <Navigation userObj={userObj} />
      <form onSubmit={handleSubmit}>
        <input
          type={'text'}
          placeholder={'Display name'}
          onChange={handleChange}
          value={newDisplayName}
        />
        <input type={'submit'} value={'Update Profile'} />
      </form>
      <button onClick={handleLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
