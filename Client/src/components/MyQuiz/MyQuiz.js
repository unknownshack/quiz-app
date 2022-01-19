import React from 'react';
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";


import '../Quiz/Quiz.css';
import questions from '../Quiz/Questions';
import TimerContainer from '../Timer/TimerContainer';
import Register from '../Register/Register';

// Voice features components
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechRecog from '../SpeechRecog/SpeechRecog';
// Drawing feature component
import Canvas from '../Canvas/Canvas';


function MyQuiz(props) {

    const location = useLocation();

    /*
    const test = ()=>{

        let Quiz_id = location.pathname.split("/")[2]
        return Quiz_id;
    }*/

    const [gameOver, setgameOver] = useState(false);
    const [currentQuestion, setcurrentQuestion] = useState('0');
    const [currentQuestionTime, setcurrentQuestionTime] = useState(4);
    const [ questionNumber, setquestionNumber] = useState(1);
    const [ totalPoints, settotalPoints] = useState(0);
    const [ answerStyle, setanswerStyle] = useState("btn border border-light border-2 answer");





    const generateRandomQuestion = ()=> {
        let min = 0;
        let max = questions.length;
        let index = Math.floor(Math.random() * (max - min) + min);

        if (questions[index].hasBeenAsked === false) {
            // Set the question hasBeenAsked property to true so it doesn't get selected again
            questions[index].hasBeenAsked = true;
            return index;
        } else {
            index = questions.findIndex((q) => q.hasBeenAsked === false);
            questions[index].hasBeenAsked = true;
        }
        return index;
    }

    const componentDidMount = ()=> {

        let Quiz_id = location.pathname.split("/")[2]



        //return Quiz_id;

    }

    const shuffleArray = (array)=> {
        let arrCopy = array.slice(0);
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        };
        return arrCopy;
    }

    // Handler for when an answer is clicked
    const handleAnswerClick = (answer)=> {
        let nextQuestion = generateRandomQuestion();
        let questionNum = questionNumber + 1;

        // Check if answer clicked is correct
        checkAnswer(answer);

        // Automatically moves to the next question after a delay
        setTimeout(() => {
            if (nextQuestion < questions.length) {
               
                    setcurrentQuestion(nextQuestion);
                    setquestionNumber(questionNum);
                    setanswerStyle('btn border border-light answer');
                
            }
        }, 500);
    }

    // Checks if answer is correct
    const checkAnswer = (answer)=> {
        let newTotal = answer.isCorrect ? totalPoints + 1 : totalPoints;
        let isCorrect = answer.isCorrect ? 'btn btn-success border border-light answer' : 'btn btn-danger border border-light answer';

        settotalPoints(newTotal);
        setanswerStyle(isCorrect);
   
    }

    const toNextQuestion = () =>{
        let nextQuestion = generateRandomQuestion();

        let questionTime = handleQuestionDifficulty();

        if (nextQuestion < questions.length) {
            setcurrentQuestion(nextQuestion);
            setcurrentQuestionTime(questionTime);
            setquestionNumber(questionNumber + 1);
            setanswerStyle( 'btn border border-light answer');
        
         
        }
    }

    // Method to call the above method when individual question timer completes
    const handleNextQuestion = ()=> {
        if (questionNumber > questions.length) {
            handleGameOver();
        }

        toNextQuestion();
    }

    // Handler for game's over (time's up) or after last question's asked
    const handleGameOver = ()=> {
        setgameOver(true);
    }

    // Handler for different question difficulty
    function handleQuestionDifficulty(){
        let current_Question = questions[currentQuestion];
        let difficulty = current_Question.questionType;
        let time;

        switch (difficulty) {
            case 'easy':
                time = 4;
                break;
            case 'medium':
                time = 7;
                break;
            case 'hard':
                time = 10;
                break;
            default:
                time = 4;
                break;
        };
        console.log(`${difficulty}: ${time}`);
        return time;
    }


    return (

        <div>


            <p>My Quiz Page</p>

            <div>
                <TimerContainer num={questionNumber} time={30} onComplete={()=>toNextQuestion()} />
                <p>Question {questionNumber} of {questions.length}</p>
                {/* <h5>Points: {this.state.totalPoints}</h5> */}
  
                <div className='container'>
                    <div className='question-section'>
                        {/* If the question is vocal question type */}
                        {questions[currentQuestion].isVocalQuestion && <TextToSpeech text={questions[currentQuestion].questionText} />}


                        {/* If question has image */}
                        {questions[currentQuestion].questionImg && <h3 style={{ color: '#ffffff' }}>{questions[currentQuestion].questionText}</h3>}
                        {questions[currentQuestion].questionImg && <img
                            src={questions[currentQuestion].questionImg}
                            alt='Questionillustration'
                            style={{ margin: 20 }}
                        />
                        }


                        {/* If question regular multiple choice */}
                        {questions[currentQuestion].isMultipleChoice && !questions[currentQuestion].questionImg && <h3>{questions[currentQuestion].questionText}</h3>}

                        {/* If question is yes/no, or short-answer, or drawing type */}
                        {!questions[currentQuestion].isVocalQuestion && (
                            questions[currentQuestion].isForcedAnswer ||
                            questions[currentQuestion].isShortAnswer ||
                            questions[currentQuestion].isDrawingQuestion
                        ) &&
                            <h3 style={{ color: '#ffffff' }}>
                                {questions[currentQuestion].questionText}
                            </h3>
                        }
                    </div>

                    <div className='answer-section'>
                        {/* If question is a vocal question */}
                        {questions[currentQuestion].isVocalQuestion && <SpeechRecog />}


                        {/* If answer has image in it */}
                        {questions[currentQuestion].questionImg && shuffleArray(questions[currentQuestion].answers).map((answer, index) => (
                            <button
                                type='button'
                                className={answerStyle}
                                key={index}
                                onClick={() => handleAnswerClick(answer)}
                                style={{
                                    margin: 2,
                                    height: 'auto',
                                    display: 'inline-flex'
                                }}
                            >
                                <img
                                    src={answer.answerImg}
                                    alt='Answer illustration'
                                    width='auto'
                                    height='auto'
                                />
                            </button>
                        ))}


                        {/* If question regular multiple choice */}
                        {questions[currentQuestion].isMultipleChoice && !questions[currentQuestion].questionImg && shuffleArray(questions[currentQuestion].answers).map((answer, index) => (
                            <button
                                type='button'
                                className={answerStyle}
                                key={index}
                            // onClick={() => this.handleAnswerClick(answer)}
                            >
                                {answer.answerText}
                            </button>
                        ))}

                        {/* If question is yes/no type */}
                        {questions[currentQuestion].isForcedAnswer && shuffleArray(questions[currentQuestion].answers).map((answer, index) => (
                            <div>
                                <input
                                    type='checkbox'
                                    key={index}
                                    value={answer}
                                    id={index}
                                    style={{ margin: 10 }}
                                />
                                <label for={index}>{answer}</label>
                            </div>
                        ))}


                        {/* If question is short-answer type */}
                        {/* {currentQuestion.isShortAnswer && <textarea style={{margin: 10}}></textarea>} */}


                        {/* If question is drawing type */}
                        {questions[currentQuestion].isDrawingQuestion && <Canvas />}


                        {/* If question is yes/no, or short-answer, or drawing type */}
                        {/* {(
                            currentQuestion.isVocalQuestion ||
                            currentQuestion.isForcedAnswer ||
                            currentQuestion.isShortAnswer ||
                            currentQuestion.isDrawingQuestion
                        ) &&
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={this.toNextQuestion}
                            >
                                Next
                            </button>
                        } */}

                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={()=>toNextQuestion()}
                        >
                            Next
                        </button>


                    </div>
                </div>

            </div>


            

        </div>


    )
}

export default MyQuiz;