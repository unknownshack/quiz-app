


import React from 'react';
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './MyAccount.css'
// My account page
function MyAccount(props) {


    const user = useSelector(selectUser);
    const navigate = useNavigate();

    // create new quiz
    const createQuiz = (e) => {

        console.log("create quiz");

        fetch("http://localhost:8000/createQuiz", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: user.uid
            })
        })
        .then(res => res.json())
        .then(quiz => {
            
            //Jump to a unique quiz page
            let s = quiz._id
            s = "/myquiz/"+s;
            navigate(s);
        
        })
        .catch(err =>{
                
            console.log(err)
        
        });
    }


    return (

        <div className="dashboard">

            <h4>My Account Page</h4>
            <p>USER ID：{user.uid}</p>
            <br/>
            <h5>Press the button below to start quiz.</h5>
            <br/>
            <button onClick={(e) => createQuiz(e)} type="button" id="registerBtn" className='btn-primary myacbtn'>
                Start Quiz
            </button>

        </div>

    )
}

export default MyAccount;