// libraries
import './App.css';
import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
// components
import Header from './components/Header/Header';
// redux store
import { fetchComments } from './store/actions/comments-actions'
import { fetchReviews } from './store/actions/reviews-actions';
import { autoLogout } from './store/actions/auth-actions';
import { authActions } from './store/reducers/auth-slice';
import { authorizeSpotify } from './store/actions/spotify-actions';
// styling
import styles from './components/Reviews/ReviewsList.module.css'

// create constants for lazy loading with .lazy (take inline function of import with path for component)
const ProfileContainer = React.lazy(() => import('./containers/ProfileContainer'))
const AuthContainer = React.lazy(() => import('./containers/AuthContainer'))
const ShowReviewContainer = React.lazy(() => import('./containers/ShowReviewContainer'))
const ReviewsContainer = React.lazy(() => import('./containers/ReviewsContainer'))
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'))
const SettingsContainer = React.lazy(() => import('./containers/SettingsContainer'))
const ArtistSearchContainer = React.lazy(() => import('./containers/ArtistSearchContainer'))
const HomeContainer = React.lazy(() => import('./containers/HomeContainer'))
const UserReviewsContainer = React.lazy(() => import('./containers/UserReviewsContainer'))
const ShowUsersContainer = React.lazy(() => import('./containers/ShowUsersContainer'))
const AlbumContainer = React.lazy(() => import('./containers/AlbumContainer'))

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loggedIn = useSelector((state) => state.auth.loggedIn)

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  useEffect(() => {
    dispatch(authorizeSpotify())
  }, [dispatch])

  // run side effect to see if a token already exists in localstorage when page is loaded
  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if (token) {
      dispatch(dispatch(authActions.setLoggedIn({ token, email })))
      dispatch(autoLogout(navigate))
    }
  }, [dispatch, navigate])

  let homePage = <Route exact path='/' element={<HomeContainer />} />

  if (loggedIn) {
    homePage = <Route exact path='/' element={<ProfileContainer />} />
  }

  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<p className={styles['reviews-list-fallback']}>Loading Page...</p>}>
          <Routes>
            <Route path='/login' element={<AuthContainer newAccount={false} />} />
            <Route path='/signup' element={<AuthContainer newAccount={true} />} />
            <Route path='/reviews' element={<ReviewsContainer />} />
            <Route path='/reviews/:id' element={<ShowReviewContainer />} />
            {loggedIn && <Route path='/settings' element={<SettingsContainer />} />}
            {homePage}
            <Route path='*' element={<PageNotFound />} />
            <Route path='/search' element={<ArtistSearchContainer />} />
            <Route path='/user/:user' element={<UserReviewsContainer />} />
            <Route path='/users' element={<ShowUsersContainer />} />
            <Route path='/album/:title' element={<AlbumContainer />} />
          </Routes>
        </Suspense>
      </main>
      {/* <ArtistSearchContainer /> */}
    </div>
  );
}

export default App;
