import './App.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import Header from './components/Header/Header';
import { fetchReviews } from './store/reviews-actions';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import ShowReviewContainer from './containers/ShowReviewContainer';
import ReviewsContainer from './containers/ReviewsContainer';
import PageNotFound from './containers/PageNotFound';

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
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/home' element={<HomeContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/reviews' element={<ReviewsContainer />} />
          <Route path='/reviews/:id' element={<ShowReviewContainer />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </main>
      {/* <ArtistSearchContainer /> */}
    </div>
  );
}

export default App;
