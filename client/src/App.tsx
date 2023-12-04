import './App.css'
import {Routes, Route, useLocation} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage';
import Game from './components/Game/Game';
import Leaderboard from './components/Leaderbord/Leaderboard';

function App() {
  const location = useLocation();

  return (
    <div className='app-div'>
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
        <Route path='/game' element={<Game />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </div>
  )
}

export default App
