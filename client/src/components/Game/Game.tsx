import Timer from "../Timer/Timer"
import './Game.css'

export default function Game() {
    const redBalls = [];
    const greenBalls = [];
    const purpleBoxes = [];

    for(let i = 0; i<10; i++){
        const size:number = (Math.floor(Math.random() * 5) + 1)
        redBalls.push(
        <div className="red" style={{
            top:`${(Math.floor(Math.random() * 10)) * 10}%`, 
            left:`${(Math.floor(Math.random() * 10)) * 10}%`, 
            width:`${size}rem`, 
            height:`${size}rem`}}>
        </div>)

        greenBalls.push(
            <div className="green" style={{
                top:`${(Math.floor(Math.random() * 10)) * 10}%`, 
                left:`${(Math.floor(Math.random() * 10)) * 10}%`, 
                width:`${size}rem`, 
                height:`${size}rem`}}>
            </div>)
    }

    for(let i = 0; i < 5; i++){
        const size:number = (Math.floor(Math.random() * 5) + 1)
        purpleBoxes.push(
            <div className="change" style={{
                top:`${(Math.floor(Math.random() * 10)) * 10}%`, 
                left:`${(Math.floor(Math.random() * 10)) * 10}%`, 
                width:`${size}rem`, 
                height:`${size}rem`}}>
            </div>)
    }

  return (
    <div className="game-div">
        <Timer />
        <div className="action-div">
            {redBalls}
            {greenBalls}
            {purpleBoxes}    
        </div>
    </div>
  )
}
