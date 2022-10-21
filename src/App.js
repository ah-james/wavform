import React, { useState } from 'react';
import './App.css';

import NewAlbum from './components/NewAlbum/NewAlbum';
import Albums from './components/Albums/Albums';

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

  const handleAddAlbum = album => {
    setReviews((prevReviews) => {
      return [album, ...prevReviews]
    })
  }

  return (
    <div className="App">
      <h1>Bouncr</h1>
      <h3>Social Media for Music Fans</h3>
      <NewAlbum onAddAlbum={handleAddAlbum} />
      <Albums reviews={reviews} />
    </div>
  );
}

export default App;
