import React from "react"
import parse from "html-react-parser"

export default function Choice(props){
    
    const styles = {}
    
    switch(props.status){
        case 'selected':
            styles.backgroundColor = "#D6DBF5"
            styles.border = "none"
            break;
        case 'correct':
            styles.backgroundColor = "#94D7A2"
            styles.border = "none"
            break;
        case 'incorrect':
            styles.backgroundColor = "#F8BCBC"
            styles.border = "none"
        // incorrect answers are also faded
        case 'faded': 
            styles.opacity = 0.5;       
    }
    
    return (
        <div 
            className={`choice`}
            onClick={props.selectChoice}
            style={styles}
        >
            {parse(props.choiceText)}
        </div>
    )
    
}