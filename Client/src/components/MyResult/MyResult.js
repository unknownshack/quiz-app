import React from 'react';
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



// MyQuiz page
function MyResult(props) {

    const location = useLocation();
    const Quiz_id = location.pathname.split("/")[2];


    const [myAnswers, setmyAnswers] = useState();
    useEffect(() => {

        fetch("http://localhost:8000/getResult", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Quiz_id: Quiz_id,

            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setmyAnswers(data.answer);
            });
  
    },[]);

    return(


        <div>

            <h1>My result page</h1>

            <p>{myAnswers}</p>
            
        </div>

    )

}

export default MyResult;