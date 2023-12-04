import './HomePage.css'
import { Link } from "react-router-dom"
import Mouse from '../../assets/mouse.png'

export default function HomePage() {
  return (
    <div className='home-page'>
        <h1>Mouse  <img src={Mouse} />Race</h1>
        <Link to="/game" className='play-btn'>Play</Link>
    </div>
  )
}
