import React from 'react';

import SpeechRecog from '../SpeechRecog/SpeechRecog';

class TextToSpeech extends React.Component {
    speak() {
        let reader = window.speechSynthesis;

        if (reader.speaking) {
            console.error('Already start reading');
            return;
        }

        let utterThis = new SpeechSynthesisUtterance(this.props.text);

        // After the question is read
        utterThis.onend = e => {
            console.log('Question read');
            this.props.onEnd();
        };

        // If there's an error
        //utterThis.onerror = e => console.error('An error encountered');
        utterThis.onerror = e => console.log(e);
        // Set rate and pitch for reader's voice
        utterThis.rate = 1; //1.25
        utterThis.pitch = 1;

        // Start reading the screen (question)
        reader.speak(utterThis);
    }

    componentDidMount() {
        // Immediately reads the first question
        console.log("speak 1");
        this.speak();
    }

    componentDidUpdate(prevProps) {
        //  Immediately reads the question after the Next button is clicked
        if (this.props.text !== prevProps.text) {
            console.log("speak 2");
            this.speak();
        }
    }

    render() {
        return (
            <div>
                {/* <SpeechRecog
                    text={this.props.text}
                    textAsButton={true}
                    displayText='Hear the question'
                    onClick={this.speak}
                /> */}
                <p>Listen closely to the question!</p>
            </div>
        );
    }
}

export default TextToSpeech;