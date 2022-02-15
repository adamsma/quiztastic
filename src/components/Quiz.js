import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function Quiz({quizLength}){
    
    const [questions, setQuestions] = React.useState([]) 
    const [answers, setAnswers] = React.useState({})
    const [submitted, setSubmitted] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [gameCt, setGameCt] = React.useState(0)
    
    React.useEffect(() => {
        
        getNewQuestions(quizLength)
            .then(data => setQuestions(data))
        
    }, [gameCt])
    
    const qSetElems = questions.map((qBlock, i) => (
        <Question 
            key={qBlock.id}
            question={qBlock.question}
            choices={qBlock.choices}
            answer={answers[qBlock.id]}
            correctAns={qBlock.correctAns}
            setAnswer={(newAns) => setAnswerById(qBlock.id, newAns)}
            inProgress={!submitted}
            qn={i}
        />
    ))
    
    function getNewQuestions(n){
        
        return fetch(`https://opentdb.com/api.php?amount=${n}&type=multiple&difficulty=easy`)
            .then(res => res.json())
            .then(data => data.results.map(q => {
                
                // need to randomly insert correct answer so it's not alwasy same position
                const insertPos = Math.floor(Math.random() * 4)
                const allChoices = q.incorrect_answers
                
                allChoices.splice(insertPos, 0, q.correct_answer)
                
                return {
                    question: q.question,
                    choices: allChoices,
                    correctAns: q.correct_answer,
                    id: nanoid()
                }
                
            }))
    }
    
    function setAnswerById(id, newAns) {
        setAnswers(oldAns => ({
           ...oldAns, 
           [id]: newAns
        }))
    }
    
    function checkAnswers(){
        
        // compare each question's correct answer to selected answer
        // map through questions because answers can be selected by id
        // sum booleans to get score
        setScore(
            questions
                .map(q => q.correctAns == answers[q.id])
                .reduce((x, y) => x + y)
        )
        
        setSubmitted(true)
    }
    
    function newGame(){
        setAnswers({})
        setGameCt(n => n + 1)
        setSubmitted(false)
    }

    return(
        <div className="quiz">
            {submitted && score == quizLength && <Confetti />}
            {qSetElems}
            <div className="resultsArea">
                {submitted && 
                    <p className="results">
                        {`You scored ${score}/${quizLength} correct answers
                        ${score === quizLength ? "!" : ""}`}
                    </p>  
                }
                {// make sure every question is answered
                 // use quizLength as quesions will be empty while waitng for API
                    Object.keys(answers).length === quizLength && 
                        <button className="processQuiz" onClick={!submitted ? checkAnswers : newGame}>
                            {submitted ? "Play Again": "Check Answers"}
                        </button>
                }
            </div>
        </div>
    )
}