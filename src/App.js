import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';

import NewAlbum from './components/NewReview/NewReview';
import Reviews from './components/Reviews/Reviews';
// import Login from './components/Users/Login'
// import Home from './components/Users/Home';
import Header from './components/Header/Header';
import { fetchReviews } from './store/reviews-actions';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

function App() {
  // const [reviews, setReviews] = useState([])

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

  return (
    <React.Fragment>
      <Header />
      <NewAlbum onAddReview={handleAddReview} />
      <Reviews reviews={reviews} />
      {/* managing handleLogin & logout functions in auth context now */}
      {/* {!ctx.loggedIn && <Login />}
      {ctx.loggedIn && <Home />} */}
      {/* <ArtistSearchContainer /> */}
    </React.Fragment>
  );
}

export default App;
