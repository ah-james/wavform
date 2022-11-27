import React, { useState, useContext } from 'react';
import './App.css';

import NewAlbum from './components/NewAlbum/NewAlbum';
import Albums from './components/Albums/Albums';
import Login from './components/Users/Login'
import Home from './components/Users/Home';
import Header from './components/Header/Header';
import AuthContext from './store/auth-context';

const DUMMY_DATA = [
  {
    id: '1',
    artist: 'Pinegrove',
    album: '11:11',
    date: new Date(2022, 1, 28),
    rating: '8'
  },
  {
    id: '2',
    artist: 'Hot Mulligan',
    album: `you'll be fine`,
    date: new Date(2020, 3, 6),
    rating: '10',
  }
]

function App() {
  const [reviews, setReviews] = useState(DUMMY_DATA)

  // useContext hook to manage state 
  const ctx = useContext(AuthContext)

  const handleAddAlbum = album => {
    setReviews((prevReviews) => {
      return [album, ...prevReviews]
    })
  }

  return (
    <React.Fragment>
      <Header />
      <NewAlbum onAddAlbum={handleAddAlbum} />
      <Albums reviews={reviews} />
      {/* managing handleLogin & logout functions in auth context now */}
      {!ctx.loggedIn && <Login />}
      {ctx.loggedIn && <Home />}
    </React.Fragment>
  );
}

export default App;
