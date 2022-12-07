import React, { useState, useContext, useEffect } from 'react';
import './App.css';

import NewAlbum from './components/NewAlbum/NewAlbum';
import Albums from './components/Albums/Albums';
import Login from './components/Users/Login'
import Home from './components/Users/Home';
import Header from './components/Header/Header';
import AuthContext from './store/auth-context';
import styles from './components/Albums/AlbumsList.module.css'
import useHttp from './hooks/use-http';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

function App() {
  const [reviews, setReviews] = useState([])

  // move url object and loadReviews function to useEffect to control constant rerender 
  const { loading, error, sendRequest: handleFetchReviews } = useHttp()

  useEffect(() => {
    // use loadReviews in here to reduce hook bloat
    const loadReviews = reviewsObj => {
      const loadedReviews = []
    
      for (const key in reviewsObj) {
        loadedReviews.push({
          id: key,
          artist: reviewsObj[key].artist,
          album: reviewsObj[key].album,
          date: reviewsObj[key].date,
          rating: reviewsObj[key].rating
        })
      }
      setReviews(loadedReviews)
    }

    handleFetchReviews({url: 'https://react-bouncr-default-rtdb.firebaseio.com/reviews.json'}, loadReviews)
  }, [handleFetchReviews])

  // useContext hook to manage state 
  const ctx = useContext(AuthContext)

  let content = <p className={styles["albums-list-fallback"]}>No content found.</p>

  if (error) {
    content = <p className={styles["albums-list-fallback"]}>{error}</p>
  }

  if (loading) {
    content = <p className={styles["albums-list-fallback"]}>Loading...</p>
  }

  if (reviews.length > 0) {
    content = <Albums reviews={reviews} />
  }

  return (
    <React.Fragment>
      <Header />
      <NewAlbum />
      {content}
      {/* managing handleLogin & logout functions in auth context now */}
      {!ctx.loggedIn && <Login />}
      {ctx.loggedIn && <Home />}
      {/* <ArtistSearchContainer /> */}
    </React.Fragment>
  );
}

export default App;
