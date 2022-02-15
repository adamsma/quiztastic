import React from "react"

export default function StartScreen({title, instructions, initGame}){
    return(
        <div className="start-container">
            <h1 className="start--title">{title}</h1>
            <p className="start--instruct">{instructions}</p>
            <button className="start--btn" onClick={initGame}>Start Quiz</button>
        </div>
    )
}