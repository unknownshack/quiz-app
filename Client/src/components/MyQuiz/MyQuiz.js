import React from 'react';
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { If, Then, Elseif, Else } from 'react-if-elseif-else-render';
import TimerContainer from '../Timer/TimerContainer';
// Voice features components
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechRecog from '../SpeechRecog/SpeechRecog';
// Drawing feature component
import Canvas from '../Canvas/Canvas';
import './MyQuiz.css'



// MyQuiz page
function MyQuiz(props) {

    const location = useLocation();
    let transcriptRef = useRef();
    //const [gameOver, setgameOver] = useState(false);
    //const [ totalPoints, settotalPoints] = useState(0);
    const [currentQuestion, setcurrentQuestion] = useState({});
    const [currentQuestionTime, setcurrentQuestionTime] = useState(4);
    const [questionNumber, setquestionNumber] = useState(0);
    const [answerStyle, setanswerStyle] = useState("btn btn-outline-success border border-light border-2 answer");
    const [myAnswers, setmyAnswers] = useState([]);
    const [myQuestions, setmyQuestions] = useState([]);
    const [startTimer, setstartTimer] = useState(false);

    const Quiz_id = location.pathname.split("/")[2];

    const [showQuestions, setshowQuestions] = useState(true);



    const getQuestion = () => {

        fetch("http://localhost:8000/getQuestion", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Quiz_id: Quiz_id,
                QuestionNum: questionNumber,
                Answer: transcriptRef.current,
            })
        })
            .then(res => res.json())
            .then(data => {

                setmyQuestions([...myQuestions, data]);

                transcriptRef.current = "";
                setcurrentQuestion(data);
                let questionTime = handleQuestionDifficulty();
                setcurrentQuestionTime(questionTime);

            })
            .catch(err => {
                console.log(err)
            });

    }


    useEffect(() => {

        console.log("my answer is: " + transcriptRef.current);
        getQuestion();

    }, [questionNumber]);


    const shuffleArray = (array) => {
        let arrCopy = array.slice(0);
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        };
        return arrCopy;
    }


    // Handler for when an answer is clicked
    const handleAnswerClick = (answer) => {

        //let nextQuestion = index; // questionlist[questionnumber+1]
        //let questionNum = questionNumber + 1;

        // Check if answer clicked is correct
        //checkAnswer(answer);

        // Automatically moves to the next question after a delay
        /*
        setTimeout(() => {
            if (questionNumber < 10) {
                setquestionNumber(questionNumber + 1);
                setanswerStyle('btn border border-light answer');

            }
        }, 500);*/
        transcriptRef.current = answer.answerText;


    }

    /*
    // Checks if answer is correct
    const checkAnswer = (answer)=> {
        let newTotal = answer.isCorrect ? totalPoints + 1 : totalPoints;
        let isCorrect = answer.isCorrect ? 'btn btn-success border border-light answer' : 'btn btn-danger border border-light answer';

        settotalPoints(newTotal);
        setanswerStyle(isCorrect);
   
    }
    */

    const uploadAnswer = (answer) => {

        fetch("http://localhost:8000/uploadAnswer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Quiz_id: Quiz_id,
                QuestionNum: questionNumber,
                Answer: answer,
            })
        })
            .then(res => res.json())
            .then(data=>{
                
                getAnswers();
            
            })
    }



    const getAnswers = () => {

        fetch("http://localhost:8000/getResult", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Quiz_id: Quiz_id,
            })
        })
            .then(res => res.json())
            .then(data => {

                setmyAnswers(data.answer);
                setshowQuestions(false);

            });
    }

    const toNextQuestion = () => {

        if(currentQuestion.isVocalQuestion){

            if(startTimer){
                setstartTimer(false);
                if (questionNumber < 9) {      
                    setquestionNumber(questionNumber + 1);
                    //setanswerStyle('btn border border-light answer');
        
                } else {       
                    uploadAnswer(transcriptRef.current);        
                }
            }
        }else{
            setstartTimer(false);
            if (questionNumber < 9) {  
                setquestionNumber(questionNumber + 1);
                //setanswerStyle('btn border border-light answer');    
            } else {   
                uploadAnswer(transcriptRef.current);  
            }
        }
    }


    // Handler for different question difficulty
    function handleQuestionDifficulty() {

        let difficulty = currentQuestion.questionType;
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
        //console.log(`${difficulty}: ${time}`);
        return time;
    }
//onComplete={() => toNextQuestion()}


    return (

        <div className="quiz">

            <If condition={showQuestions == true}>
                <Then>
                    <h2>My Quiz Page</h2>

                    <div className="question">
                        <div className='container'>
                            <TimerContainer num={questionNumber} time={currentQuestionTime} start={startTimer} onComplete={() => toNextQuestion()} />

                            <p>Question {questionNumber + 1} of 10 </p>
                            {/* <h5>Points: {this.state.totalPoints}</h5> */}


                            <div className='question-section'>
                                {/* If the question is vocal question type */}
                                {currentQuestion.isVocalQuestion && <TextToSpeech text={currentQuestion.questionText} onEnd={() => setstartTimer(true)} />}


                                {/* If question has image */}
                                {currentQuestion.questionImg && <h3 style={{ color: '#ffffff' }}>{currentQuestion.questionText}</h3>}
                                {currentQuestion.questionImg && <img
                                    src={currentQuestion.questionImg}
                                    alt='Questionillustration'
                                    style={{ margin: 20 }}
                                />
                                }


                                {/* If question regular multiple choice */}
                                {currentQuestion.isMultipleChoice && !currentQuestion.questionImg && <h3>{currentQuestion.questionText}</h3>}

                                {/* If question is yes/no, or short-answer, or drawing type */}
                                {!currentQuestion.isVocalQuestion && (
                                    currentQuestion.isForcedAnswer ||
                                    currentQuestion.isShortAnswer ||
                                    currentQuestion.isDrawingQuestion
                                ) &&
                                    <h3 style={{ color: '#ffffff' }}>
                                        {currentQuestion.questionText}
                                    </h3>
                                }
                            </div>

                            <div className='answer-section'>
                                {/* If question is a vocal question */}
                                {currentQuestion.isVocalQuestion &&!currentQuestion.isMultipleChoice && <SpeechRecog transcriptRef={transcriptRef} start={startTimer} />}


                                {/* If answer has image in it */}
                                {currentQuestion.questionImg && shuffleArray(currentQuestion.answers).map((answer, index) => (
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
                                {currentQuestion.isMultipleChoice && !currentQuestion.questionImg && currentQuestion.answers.map((answer, index) => (
                                    <button
                                        type='button'
                                        className={answerStyle}
                                        key={index}
                                        onClick={() => handleAnswerClick(answer)}
                                    // onClick={() => this.handleAnswerClick(answer)}
                                    >
                                        {answer.answerText}
                                    </button>
                                ))}

                                {/* If question is yes/no type */}
                                {currentQuestion.isForcedAnswer && shuffleArray(currentQuestion.answers).map((answer, index) => (
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

                            </div>

                            {/* If question is drawing type */}
                            {currentQuestion.isDrawingQuestion && <Canvas />}

                 
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
                                onClick={() => toNextQuestion()}
                            >
                                Next
                            </button>

                        </div>
                    </div>

                </Then>

                <Else>

                    <div className = "result">
                        <br/>
                        <h2>Quiz Result</h2>

                        <ul>

                            {myQuestions.map((question, index) => (

                                <li key={index} className="result_slot">
                                    <p>Question {index + 1}</p>
                                    <p>{question.questionText}</p>
                                    <ul>
                                        {question.answers.map((answer, i) => (

                                            <li key={i} className="ans">

                                                <If condition={answer.isCorrect == true}>

                                                    <Then><h5 className="correct-ans">{answer.answerText}</h5></Then>
                                                    <Else><p>{answer.answerText}</p></Else>
                                                </If>

                                            </li>

                                        ))}
                                    </ul>

                                    <p><b>my answer is :</b><span className="your-ans"> {myAnswers[index]}</span></p>

                                </li>
                            ))}

                        </ul>
                    </div>
                </Else>
            </If>
        </div>

    )

}

export default MyQuiz;

