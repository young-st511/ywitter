import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { auth } from '../fBase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, 'onAuth');
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        console.log('user signed out');
        setUserObj(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : <div>Loading...</div>}</>
  );
}

export default App;
