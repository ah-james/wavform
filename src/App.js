import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';

import NewAlbum from './components/NewReview/NewReview';
import Reviews from './components/Reviews/Reviews';
// import Login from './components/Users/Login'
// import Home from './components/Users/Home';
import Header from './components/Header/Header';
import styles from './components/Reviews/ReviewsList.module.css'
import { fetchReviews } from './store/reviews-actions';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

function App() {

  const dispatch = useDispatch()
  const reviews = useSelector((state) => {
    return state.reviews.albums
  })

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  // need to use this when updating state after posting because state won't rerender without it
  const handleAddReview = review => {
    // setReviews((prevReviews) => prevReviews.concat(review))
  }

  let content = <p className={styles["reviews-list-fallback"]}>Loading...</p>

  // I'll figure this out someday \/

  // if (error) {
  //   content = <p className={styles["reviews-list-fallback"]}>{error}</p>
  // }

  // if (loading) {
  //   content = <p className={styles["reviews-list-fallback"]}>Loading...</p>
  // }

  if (reviews.length > 0) {
    content = <Reviews reviews={reviews} />
  }

  return (
    <React.Fragment>
      <Header />
      <NewAlbum onAddReview={handleAddReview} />
      {content}
      {/* managing handleLogin & logout functions in auth context now */}
      {/* {!ctx.loggedIn && <Login />}
      {ctx.loggedIn && <Home />} */}
      {/* <ArtistSearchContainer /> */}
    </React.Fragment>
  );
}

export default App;
