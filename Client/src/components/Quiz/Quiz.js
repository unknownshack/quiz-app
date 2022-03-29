/**
 * This page connected with demo button on the Navbar
 * This page is obsolate that it only retrives questions using Front-end only.
 * However, it contains funxtions that may be useful for later developing.
 */

import React from 'react';
import './Quiz.css';
import questions from './Questions';
import TimerContainer from '../Timer/TimerContainer';
import Register from '../Register/Register';

// Voice features components
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechRecog from '../SpeechRecog/SpeechRecog';
// Drawing feature component
import Canvas from '../Canvas/Canvas';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOver: false,
            currentQuestion: Math.floor(Math.random() * questions.length),
            currentQuestionTime: 4,
            questionNumber: 1,
            totalPoints: 0,
            answerStyle: "btn border border-light border-2 answer"
        };

        this.generateRandomQuestion = this.generateRandomQuestion.bind(this);
        this.handleAnswerClick = this.handleAnswerClick.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.handleGameOver = this.handleGameOver.bind(this);
        this.toNextQuestion = this.toNextQuestion.bind(this);
        // this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    // Generates random question from questions array
    generateRandomQuestion() {
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

    // Shuffles answers options' positions everytime, but original answers array isn't altered because .slice() is used
    shuffleArray(array) {
        let arrCopy = array.slice(0);
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        };
        return arrCopy;
    }

    // Handler for when an answer is clicked
    handleAnswerClick(answer) {
        let nextQuestion = this.generateRandomQuestion();
        let questionNumber = this.state.questionNumber + 1;

        // Check if answer clicked is correct
        this.checkAnswer(answer);

        // Automatically moves to the next question after a delay
        setTimeout(() => {
            if (nextQuestion < questions.length) {
                this.setState({
                    currentQuestion: nextQuestion,
                    questionNumber: questionNumber,
                    answerStyle: 'btn border border-light answer'
                });
            }
        }, 500);
    }

    // Checks if answer is correct
    checkAnswer(answer) {
        let newTotal = answer.isCorrect ? this.state.totalPoints + 1 : this.state.totalPoints;
        let isCorrect = answer.isCorrect ? 'btn btn-success border border-light answer' : 'btn btn-danger border border-light answer';

        this.setState({
            totalPoints: newTotal,
            answerStyle: isCorrect
        });
    }

    toNextQuestion() {
        let nextQuestion = this.generateRandomQuestion();
        let questionNumber = this.state.questionNumber + 1;
        let questionTime = this.handleQuestionDifficulty();

        if (nextQuestion < questions.length) {
            this.setState({
                currentQuestion: nextQuestion,
                currentQuestionTime: questionTime,
                questionNumber: questionNumber,
                answerStyle: 'btn border border-light answer'
            });
        }
    }

    // Method to call the above method when individual question timer completes
    handleNextQuestion() {
        if (this.state.questionNumber > questions.length) {
            this.handleGameOver();
        }

        this.toNextQuestion();
    }

    // Handler for game's over (time's up) or after last question's asked
    handleGameOver() {
        this.setState({ gameOver: true });
    }

    // Handler for different question difficulty
    handleQuestionDifficulty() {
        let currentQuestion = questions[this.state.currentQuestion];
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
        console.log(`${difficulty}: ${time}`);
        return time;
    }

    render() {
        let currentQuestion = questions[this.state.currentQuestion];

        /* If game's over or time's up or all questions have been asked, display this finish screen */
        if (this.state.gameOver || this.state.questionNumber > questions.length) {
            return (
                <div
                    style={{
                        width: '100%',
                        padding: '3%',
                        textAlign: 'center'
                    }}
                >
                    <h1>GAME OVER</h1>
                    <h4>You got {this.state.totalPoints} out of {questions.length} questions correctly</h4>
                    <p>To get more info about this product, register your interest now.</p>

                    <div className='registerInterest'>
                        <Register />
                    </div>

                </div>
            )
        }


        return (
            <div>
                <TimerContainer num={this.state.questionNumber} time={30} onComplete={this.toNextQuestion} />
                <p>Question {this.state.questionNumber} of {questions.length}</p>
                {/* <h5>Points: {this.state.totalPoints}</h5> */}

                <div className='container'>
                    <div className='question-section'>
                        {/* If the question is vocal question type */}
                        {currentQuestion.isVocalQuestion && <TextToSpeech text={currentQuestion.questionText} />}


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
                        {currentQuestion.isVocalQuestion && <SpeechRecog />}


                        {/* If answer has image in it */}
                        {currentQuestion.questionImg && this.shuffleArray(currentQuestion.answers).map((answer, index) => (
                            <button
                                type='button'
                                className={this.state.answerStyle}
                                key={index}
                                onClick={() => this.handleAnswerClick(answer)}
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
                        {currentQuestion.isMultipleChoice && !currentQuestion.questionImg && this.shuffleArray(currentQuestion.answers).map((answer, index) => (
                            <button
                                type='button'
                                className={this.state.answerStyle}
                                key={index}
                            // onClick={() => this.handleAnswerClick(answer)}
                            >
                                {answer.answerText}
                            </button>
                        ))}

                        {/* If question is yes/no type */}
                        {currentQuestion.isForcedAnswer && this.shuffleArray(currentQuestion.answers).map((answer, index) => (
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
                            onClick={this.toNextQuestion}
                        >
                            Next
                        </button>


                    </div>
                </div>

            </div>
        )
    }
}

export default Quiz;
