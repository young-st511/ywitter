import React, { useState } from 'react';
import { auth, createUser } from '../fBase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  };

  const handleSocialClick = async (e) => {
    const {
      target: { name },
    } = e;

    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }

    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = 'a';
      if (newAccount) {
        // create account
        console.log(email, password);
        data = await createUser(auth, email, password);
      } else {
        //Log in
        console.log(email, password);
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log({ ...error });
      console.log(error.customData);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type={'text'}
          placeholder='Your Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type={'password'}
          placeholder='Enter Your Password'
          required
          value={password}
          onChange={onChange}
        />
        <input
          type={'submit'}
          value={newAccount ? 'Create Account' : 'Log in'}
        />
      </form>
      <div onClick={toggleAccount}>
        {newAccount ? 'Log in' : 'Create Account'}
      </div>
      <div>
        <button name='google' onClick={handleSocialClick}>
          Continue with Google
        </button>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Auth;
