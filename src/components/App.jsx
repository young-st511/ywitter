import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { auth } from '../fBase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, 'onAuth');
        setIsLoggedIn(true);
      } else {
        console.log('user signed out');
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : <div>Loading...</div>}</>
  );
}

export default App;
