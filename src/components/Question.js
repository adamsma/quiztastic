import React from "react"
import Choice from "./Choice"
import parse from "html-react-parser"

export default function Question(
    {question, choices, answer, correctAns, setAnswer, inProgress,  qn}
){
    
    function getStatus(choice){
        
        let status
        
        if(inProgress){
            status = choice === answer ? "selected" : "unselected"
        } else if(choice === answer) {
            status = answer === correctAns ? "correct" : "incorrect"
        } else {
            status = choice === correctAns ? "correct" : "faded"
        }
        
        return status
    }
    
    const choiceElems = choices.map((choice, i) => (
        <Choice 
            key={i} 
            choiceText={choice} 
            status= {getStatus(choice)}
            selectChoice={() => setAnswer(choice)}
        />
    ))
    
    return(
        <div className="qCard">
            <h2 className="qCard--question">{parse(question)}</h2>
            <div className="qCard--ansOpts">
                {choiceElems}
            </div>
        </div>
    )
}

// {}