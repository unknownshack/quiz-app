/*
This script is used to handle drawing questions.
It allow user to draw on canvas.
*/

import React, { useEffect, useRef, useState } from 'react';
import './Canvas.css'

function Canvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth*0.7;
        canvas.height = window.innerHeight;

        //canvas.style.width = `${canvas.width - 300}px`;
        //canvas.style.height = `${canvas.height}px`;

        // Context to draw on canvas
        const context = canvas.getContext('2d');
        context.scale(1, 1);
        context.lineCap = 'round';
        context.strokeStyle = 'white';
        context.lineWidth = 5;
        contextRef.current = context;
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = ({nativeEvent}) => {
        // if not currently drawing, no line should be drawn
        if(!isDrawing) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;
        // Draw a line to coordinates whenenver mouse is moved
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    const clear = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


    return (
        <div className='canvasWrap'>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
                style={{border: '1px solid white'
            }}
            />
            <button className='btn-secondary clearbtn' onClick={clear}>Clear</button>
        </div>
    )
}

export default Canvas;