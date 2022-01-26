


import React from 'react';
import { selectUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// My account page
function MyAccount(props) {


    const user = useSelector(selectUser);
    const navigate = useNavigate();

    // create new quiz
    const createQuiz = (e) => {

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
        
        });
    }


    return (

        <div>

            <p>My Account Page</p>
            <p>my id is：{user.uid}</p>
      
            <button onClick={(e) => createQuiz(e)} type="button" id="registerBtn" className='buttons btn-primary btn'>
                StartQuiz
            </button>
        </div>

    )
}

export default MyAccount;