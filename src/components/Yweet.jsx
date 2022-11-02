import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../fBase';

const Yweet = ({ yweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newYweet, setNewYweet] = useState(yweet.text);

  const handleDelete = async (e) => {
    const ok = confirm('Are you sure you want to delete this yweet?');
    //! Test code
    console.log(ok);
    if (ok) {
      //delete
      await deleteDoc(doc(db, `yweets/${yweet.id}`));
      yweet.attachmentURL &&
        (await deleteObject(ref(storage, yweet.attachmentURL)));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = ({ target }) => setNewYweet(target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(yweet);
    await updateDoc(doc(db, `yweets/${yweet.id}`), {
      text: newYweet,
    });
    setEditing(false);
    console.log(yweet);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type={'text'}
              placeholder='Edit your yweet'
              onChange={onChange}
              value={newYweet}
              required
            />
            <input type='submit' value={'Update!'} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{yweet.text} </h3>
          {yweet.attachmentURL && (
            <img src={yweet.attachmentURL} alt='yweet image' width='100px' />
          )}
          {isOwner && (
            <>
              <button onClick={handleDelete}>Del</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Yweet;
