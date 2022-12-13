import './App.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'

import Header from './components/Header/Header';
import { fetchReviews } from './store/reviews-actions';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  return (
    <div>
      <Header />
      <Route path='/home'>
        <HomeContainer />
      </Route>
      <Route path='/login'>
        <LoginContainer />
      </Route>
      {/* <ArtistSearchContainer /> */}
    </div>
  );
}

export default App;
