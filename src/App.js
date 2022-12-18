import './App.css';

import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import Header from './components/Header/Header';
import { fetchReviews } from './store/actions/reviews-actions';

// import ArtistSearchContainer from './containers/ArtistSearchContainer';

// create constants for lazy loading with .lazy (take inline function of import with path for component)
const HomeContainer = React.lazy(() => import('./containers/HomeContainer'))
const AuthContainer = React.lazy(() => import('./containers/AuthContainer'))
const ShowReviewContainer = React.lazy(() => import('./containers/ShowReviewContainer'))
const ReviewsContainer = React.lazy(() => import('./containers/ReviewsContainer'))
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<p>Loading Page...</p>}>
          <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/home' element={<HomeContainer />} />
            <Route path='/login' element={<AuthContainer />} />
            <Route path='/reviews' element={<ReviewsContainer />} />
            <Route path='/reviews/:id' element={<ShowReviewContainer />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </main>
      {/* <ArtistSearchContainer /> */}
    </div>
  );
}

export default App;
