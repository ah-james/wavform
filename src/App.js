import './App.css';

import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

import Header from './components/Header/Header';
import { fetchReviews } from './store/actions/reviews-actions';
import { authActions } from './store/reducers/auth-slice';
import styles from './components/Reviews/ReviewsList.module.css'

// create constants for lazy loading with .lazy (take inline function of import with path for component)
const HomeContainer = React.lazy(() => import('./containers/HomeContainer'))
const AuthContainer = React.lazy(() => import('./containers/AuthContainer'))
const ShowReviewContainer = React.lazy(() => import('./containers/ShowReviewContainer'))
const ReviewsContainer = React.lazy(() => import('./containers/ReviewsContainer'))
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'))
const SettingsContainer = React.lazy(() => import('./containers/SettingsContainer'))
const ArtistSearchContainer = React.lazy(() => import('./containers/ArtistSearchContainer'))

function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => {
    return state.auth.loggedIn
  })

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  // run side effect to see if a token already exists in localstorage when page is loaded
  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if (token) {
      dispatch(dispatch(authActions.setLoggedIn({token, email})))
    }
  }, [dispatch])

  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<p className={styles['reviews-list-fallback']}>Loading Page...</p>}>
          <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/login' element={<AuthContainer />} />
            <Route path='/reviews' element={<ReviewsContainer />} />
            <Route path='/reviews/:id' element={<ShowReviewContainer />} />
            {loggedIn && <Route path='/settings' element={<SettingsContainer />} />}
            {loggedIn && <Route path='/home' element={<HomeContainer />} />}
            <Route path='*' element={<PageNotFound />} />
            <Route path='/search' element={<ArtistSearchContainer />} />
          </Routes>
        </Suspense>
      </main>
      {/* <ArtistSearchContainer /> */}
    </div>
  );
}

export default App;
