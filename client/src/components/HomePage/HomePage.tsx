import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div>
        <h1>Mouse Race</h1>
        <Link to="/game">Play</Link>
    </div>
  )
}
