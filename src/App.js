import './App.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Header/Header';
import { fetchReviews } from './store/reviews-actions';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import ShowReviewContainer from './containers/ShowReviewContainer';
import ReviewsContainer from './containers/ReviewsContainer';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
          <Route path='/home'>
            <HomeContainer />
          </Route>
          <Route path='/login'>
            <LoginContainer />
          </Route>
          <Route path='/reviews' exact>
            <ReviewsContainer />
          </Route>
          <Route path='/reviews/:id'>
            <ShowReviewContainer />
          </Route>
        </Switch>
      </main>
      {/* <ArtistSearchContainer /> */}
    </div>
  );
}

export default App;
