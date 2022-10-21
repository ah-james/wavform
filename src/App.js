import React, { useState } from 'react';
import './App.css';
import AlbumFilter from './components/AlbumFilter';
import AlbumItem from './components/AlbumItem';
import Card from './components/Card';
import NewAlbum from './components/NewAlbum';

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
  const [filteredYear, setFilteredYear] = useState('2020')

  const handleAddAlbum = album => {
    setReviews((prevReviews) => {
      return [album, ...prevReviews]
    })
  }

  const handleFilterChange = selectedYear => {
    setFilteredYear(selectedYear)
  }


  return (
    <div className="App">
      <h1>Bouncr</h1>
      <h3>Social Media for Music Fans</h3>
      <NewAlbum onAddAlbum={handleAddAlbum} />
      <Card className='albums'>
      <AlbumFilter selectedYear={filteredYear} handleFilterChange={handleFilterChange}/>
        {reviews.map((review) => <AlbumItem key={review.id} artist={review.artist} album={review.album} date={review.date} rating={review.rating} />)}
      </Card>
    </div>
  );
}

export default App;
