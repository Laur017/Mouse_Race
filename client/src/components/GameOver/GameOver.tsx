import './GameOver.css'
import { useNavigate } from 'react-router'

export default function GameOver({type}) {
    const navigate = useNavigate();
  return (
    <div className="game-over-card">
        <h2>Game Over !</h2>
        {type === true ? 
        <div>
            <h3>You Won !</h3>
            <input placeholder='Enter your username'></input>
            <label>
                Your time : 
            </label>
            <button className='play-again-button'> Submit score</button>
        </div>
        :
        <div>
        <h3>You Lost !</h3>
        <button className='play-again-button' onClick={() => navigate("/")}>Play again</button>
        </div>
        }
    </div>
  )
}
