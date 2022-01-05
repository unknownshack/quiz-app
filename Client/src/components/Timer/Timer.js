import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Timer.css';

class Timer extends React.Component {
    // Displays time in the middle of the timer
    children({ remainingTime }) {
        return remainingTime;
    }

    render() {
        return (
            <div className='timer'>
                <CountdownCircleTimer
                    duration={this.props.time}
                    key={this.props.num}
                    colors='#ff1505'
                    isPlaying
                    children={this.children}
                    onComplete={this.props.onComplete}
                />
            </div>
        );
    }
}

export default Timer;