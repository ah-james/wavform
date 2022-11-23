import React, { useEffect, useState } from 'react';
import './App.css';

import NewAlbum from './components/NewAlbum/NewAlbum';
import Albums from './components/Albums/Albums';
import Login from './components/Users/Login'
import Home from './components/Users/Home';
import AuthContext from './store/auth-context';

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
  const [reviews, setReviews] = useState(DUMMY_DATA)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleAddAlbum = album => {
    setReviews((prevReviews) => {
      return [album, ...prevReviews]
    })
  }

  // useEffect hook to handle sideeffect of storing logged in user
  // code is ran whenever dependencies are changed
  // ex. run check on localStorage when app starts up, then again if state dependency is updated
  useEffect(() => {
    const savedData = localStorage.getItem('isLoggedIn')

    if (savedData === '1') {
      setLoggedIn(true)
    }
  }, [])

  const handleLogin = (email, password) => {
    // use localStorage.setItem to dummy storiing loggin in
    localStorage.setItem('isLoggedIn', '1')
    setLoggedIn(true)
  }

  const handleLogout = () => {
    // localstorage.removeitem to remove dummy
    localStorage.removeItem('isLoggedIn')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider 
      value={{
        loggedIn: loggedIn
      }}
    >
      <h1 className="App">Bouncr</h1>
      <h3 className="App">Social Media for Music Fans</h3>
      <NewAlbum onAddAlbum={handleAddAlbum} />
      <Albums reviews={reviews} />
      {!loggedIn && <Login handleLogin={handleLogin} />}
      {loggedIn && <Home handleLogout={handleLogout} />}
    </AuthContext.Provider>
  );
}

export default App;
