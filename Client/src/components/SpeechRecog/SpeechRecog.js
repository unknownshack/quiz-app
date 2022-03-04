import React, { useState, useEffect } from 'react';

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

export default function SpeechRecog({transcriptRef, start}) {
    const [isListening, setListening] = useState(false);
    const [transcript, setTranscript] = useState(null);


    useEffect(()=>{

        transcriptRef.current = transcript;

    },[transcript])


    
    useEffect(()=>{

        setListening(start)

    },[start])



    useEffect(()=>{

        if (isListening) {
            mic.start();
            mic.onend = () => {
                console.log('Continue');
                mic.start();
            };
        } else {
            mic.stop();
            mic.onend = () => {
                console.log('Mic no longer listening');
            };
        }

        mic.onstart = () => {
            console.log('Mic on');
        }

        let recordedScript;
        mic.onresult = e => {
            recordedScript = e.results[0][0].transcript;
            console.log(recordedScript);
            setTranscript(recordedScript);

            mic.onerror = e => {
                console.log(e.error);
            }
        }
       
    },[isListening])



    /*

useEffect(() => {
        clickCallback();
    }, [isListening])



    const clickCallback = () => {
        if (isListening) {
            mic.start();
            mic.onend = () => {
                console.log('Continue');
                mic.start();
            };
        } else {
            mic.stop();
            mic.onend = () => {
                console.log('Mic no longer listening');
            };
        }

        mic.onstart = () => {
            console.log('Mic on');
        }

        let recordedScript;
        mic.onresult = e => {
            recordedScript = e.results[0][0].transcript;
            console.log(recordedScript);
            setTranscript(recordedScript);

            mic.onerror = e => {
                console.log(e.error);
            }
        }

    }
    
    
    // previous button 
    
                <button
                className='btn btn-primary'
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '5%',
                    marginBottom: '5%'
                }}
                onClick={() => setListening(prevState => !prevState)}
            >
                Answer
            </button>
    
    
    
    */

    return (
        <div>
            {isListening ? <p>Listening</p> : <p>Not listening</p>}


            <p>You answered: {transcript}</p>
        </div>
    );
}

//export default SpeechRecog;