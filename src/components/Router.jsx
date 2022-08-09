import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/*' element={<Navigate replace to='/' />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Auth />} />
            <Route path='/*' element={<Navigate replace to='/' />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;