import React, { useEffect, useRef, useState } from 'react';

function Canvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${canvas.width - 300}px`;
        canvas.style.height = `${canvas.height}px`;

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
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
                style={{border: '1px solid white'}}
            />
            <button className='btn btn-secondary' onClick={clear}>Clear</button>
        </div>
    )
}

export default Canvas;