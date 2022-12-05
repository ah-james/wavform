import React, { useState, useContext, useEffect, useCallback } from 'react';
import './App.css';

import NewAlbum from './components/NewAlbum/NewAlbum';
import Albums from './components/Albums/Albums';
import Login from './components/Users/Login'
import Home from './components/Users/Home';
import Header from './components/Header/Header';
import AuthContext from './store/auth-context';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

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
  const [reviews, setReviews] = useState([])

  const handleFetchReviews = useCallback(async () => {
    const response = await fetch('https://react-bouncr-default-rtdb.firebaseio.com/reviews.json')
    const data = await response.json()
    const loadedReviews = []

    for (const key in data) {
      loadedReviews.push({
        id: key,
        artist: data[key].artist,
        album: data[key].album,
        date: data[key].date,
        rating: data[key].rating
      })
    }

    setReviews(loadedReviews)
  }, [])

  useEffect(() => {
    handleFetchReviews()
  }, [handleFetchReviews])

  // useContext hook to manage state 
  const ctx = useContext(AuthContext)

  const handleAddReview = review => {
    setReviews((prevReviews) => {
      return [review, ...prevReviews]
    })
  }

  return (
    <React.Fragment>
      <Header />
      <NewAlbum onAddReview={handleAddReview} />
      <Albums reviews={reviews} />
      {/* managing handleLogin & logout functions in auth context now */}
      {!ctx.loggedIn && <Login />}
      {ctx.loggedIn && <Home />}
      {/* <ArtistSearchContainer /> */}
    </React.Fragment>
  );
}

export default App;
