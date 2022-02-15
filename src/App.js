import React from "react"
import StartScreen from "./components/StartScreen"
import Quiz from "./components/Quiz"

export default function App(){
    
    const [startGame, setStartGame] = React.useState(false)
    
    return(
        <main className={startGame ? "in-quiz" : "" }>
            <div className={`blob-top ${startGame ? "in-quiz" : "" }`}></div>
            <div className={`blob-bottom ${startGame ? "in-quiz" : "" }`}></div>
            {startGame ? 
                <Quiz quizLength={5} /> : 
                <StartScreen 
                    title="Quizzical" 
                    instructions="Click below to get your trivia on"
                    initGame={() => setStartGame(true)}
                />
            }
        </main>
    )
}