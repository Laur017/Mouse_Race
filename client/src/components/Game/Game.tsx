import React, { useState, useEffect } from "react";
import './Game.css';
import Timer from "../Timer/Timer";

export default function Game() {
    const [objects, setObjects] = useState<{id: number; class:string; top: number; left: number; size: number}[]>([]);

    useEffect(() => {
        const newObjects = [];
        
        const generateRandomPosition = ():{top:number, left:number, size:number} => {
            const top = Math.floor(Math.random() * 10) * 10;
            const left = Math.floor(Math.random() * 10) * 10;
            const size = Math.floor(Math.random() * 5) + 1;
            return {top, left, size};
        };
    
        for(let i = 0; i < 25; i++){
            const position = generateRandomPosition();
            const classType = i >= 0 && i < 10 ? "red" : i >=10 && i < 20 ? "green" : "change";
            const object = {
                id:i,
                class: classType,
                top: position.top,
                left: position.left,
                size: position.size
            };
            newObjects.push(object);
        }
    
        setObjects(newObjects);

        const interval = setInterval(() => {
            setObjects(prevObjects => {
              return prevObjects.map(obj => {
                if (obj.class === 'change') {
                  return { ...obj, class: obj.class === 'change' ? 'changed' : 'change' };
                } else if (obj.class === 'changed') {
                  return { ...obj, class: 'change' };
                }
                return obj;
              });
            });
          }, 2000);
          
          return () => clearInterval(interval);
    }, []); 

    const handleClick = (id: number) => {
        const updatedBalls = objects.filter((ball) => ball.id !== id);
        setObjects(updatedBalls);
    };

    return (
        <div className="game-div">
            <Timer />
            <div className="action-div">
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        className={obj.class}
                        style={{ 
                            top: `${obj.top}%`, 
                            left: `${obj.left}%`, 
                            width: `${obj.class === 'green' ? obj.size + 2 : obj.size}rem`, 
                            height: `${obj.class === 'green' ? obj.size - 1 : obj.size}rem`}}
                        onClick={() => handleClick(obj.id)}
                    ></div>
                ))}
            </div>
        </div>
    );
}
