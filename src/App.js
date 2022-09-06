import './App.css';
import AlbumItem from './components/AlbumItem';

function App() {
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


  return (
    <div className="App">
      <h1>Bouncr</h1>
      <h3>Social Media for Music Fans</h3>
      <AlbumItem artist={reviews[0].artist} album={reviews[0].album} date={reviews[0].date} rating={reviews[0].rating} />
      <AlbumItem artist={reviews[1].artist} album={reviews[1].album} date={reviews[1].date} rating={reviews[1].rating} />
    </div>
  );
}

export default App;
