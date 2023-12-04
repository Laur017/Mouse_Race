import './GameOver.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function GameOver({ type, seconds, minutes }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      if (!username) {
        console.error('Username is empty or undefined');
        return;
      }

      const response = await axios.post('http://localhost:4000/add-user', {
        username: username,
        minutes: minutes,
        seconds: seconds,
      });

      navigate("/leaderboard")

      if (response.status === 200) {
        console.log('Score submitted successfully!');
        
      } else {
        console.error('Failed to submit score.');
      }
    } catch (error) {
      console.error('Error submitting score: ', error);
    }
  };

  return (
    <div className="game-over-card">
      <h2>Game Over !</h2>
      {type === true ? (
        <div>
          <h3>You Won !</h3>
          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>
            Your time : {`${minutes < 9 ? '0' + minutes : minutes} : ${
              seconds < 9 ? '0' + seconds : seconds
            } `}
          </label>
          <button className="play-again-button" onClick={handleSubmit}>
            Submit score
          </button>
        </div>
      ) : (
        <div>
          <h3>You Lost !</h3>
          <button
            className="play-again-button"
            onClick={() => window.location.reload()}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
