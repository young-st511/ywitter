import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { db, storage } from '../fBase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import Yweet from '../components/Yweet';

const Home = ({ userObj }) => {
  const [yweet, setYweet] = useState('');
  const [yweets, setYweets] = useState([]);
  const [sending, setSending] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    onSnapshot(collection(db, 'yweets'), (snapshot) => {
      setLoading(true);

      const yweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setYweets(yweetArray.sort((x, y) => y.createdAt - x.createdAt));

      setLoading(false);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = '';
    try {
      setSending(true);
      const attachmentRef = ref(storage, `${userObj.uid}/${uuid()}`);
      if (attachment) {
        const response = await uploadString(
          attachmentRef,
          attachment,
          'data_url'
        );
        attachmentURL = await getDownloadURL(response.ref);
      }

      const yweetObj = {
        text: yweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentURL,
      };
      const docRef = await addDoc(collection(db, 'yweets'), yweetObj);
      console.log(docRef);
      setYweet('');
      setAttachment(null);
      setSending(false);
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

  const onFileChange = (e) => {
    // console.log(e.target.files);
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    console.log(theFile);
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
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
        <input type={'file'} accept='image/*' onChange={onFileChange} />
        <input type={'submit'} value='Yweet' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' alt='preview' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      {sending && <div>Sending...</div>}

      <div className='nweets'>
        {isLoading ? (
          <h2>Loading Yweets...</h2>
        ) : yweets.length ? (
          yweets.map((elem) => (
            <Yweet
              key={elem.id}
              yweet={elem}
              isOwner={userObj.uid === elem.creatorId}
            />
          ))
        ) : (
          <h2>Ops... Please be the first Yweeter!</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
