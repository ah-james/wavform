import React, { useState } from 'react';
import './App.css';
import AlbumFilter from './components/AlbumFilter';
import AlbumItem from './components/AlbumItem';
import Card from './components/Card';
import NewAlbum from './components/NewAlbum';

function App() {
  const [filteredYear, setFilteredYear] = useState('2020')

  const reviews = [
    {
        artist: 'Pinegrove',
        album: '11:11',
        date: new Date(2022, 1, 28),
        rating: '8/10'
    },
    {
      artist: 'Hot Mulligan',
      album: `you'll be fine`,
      date: new Date(2020, 3, 6),
      rating: '10/10',
    }
  ]

  const handleAddAlbum = album => {
    console.log('here')
    console.log(album)
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
        {reviews.map(review => <AlbumItem artist={review.artist} album={review.album} date={review.date} rating={review.rating} />)}
      </Card>
    </div>
  );
}

export default App;
