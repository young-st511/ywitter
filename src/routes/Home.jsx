import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { db } from '../fBase';
import { collection, addDoc, getDoc } from 'firebase/firestore';

const Home = () => {
  const [yweet, setYweet] = useState('');
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const docRef = await addDoc(collection(db, 'yweets'), {
        yweet: yweet,
        createdAt: Date.now(),
      });
      console.log(docRef);
      setSending(false);
      setYweet('');
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setYweet(value);
  };
  return (
    <div>
      <Navigation />
      <form onSubmit={onSubmit}>
        <input
          value={yweet}
          onChange={onChange}
          type={'text'}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type={'submit'} value='Yweet' />
      </form>
      {sending && <div>Sending...</div>}
    </div>
  );
};

export default Home;
