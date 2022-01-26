import React from 'react';
import { useState } from "react";
import './Register.css';

function Register(props) {

    const [Name, setName] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Email, setEmail] = useState("");
    const [Callback, setCallback] = useState("true");
    //const [resMessage, setresMessage] = useState("");

    //Register function
    const callRegister = (e) => {

        fetch("http://localhost:8000/RegisterUsers", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: Name,
                Mobile: Mobile,
                Email: Email,
                Callback: Callback,
            })
        })

            .then(res => res.json())
            //.then(data => setresMessage(data.message));
            .then(data => alert(data.message));  
    }


    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='title'>
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Thanks for your interest in us!
                                </h5>
                                <p>Leave your details below and we'll get back to you with more information</p>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="formbody">
                                <input className="formItem" onChange={(e) => setName(e.target.value)} value={Name} type='text' name='name' id='name' placeholder='Name' />
                                <br />
                                <input className="formItem" onChange={(e) => setEmail(e.target.value)} value={Email} type='email' name='email' id='email' placeholder='Email' />

                                <label htmlFor='callback'>Would you like to receive a callback about this?</label>
                                <div className='option'>
                                    <input onChange={(e) => setCallback('true')} value={Callback} type='radio' name='callback' id='callback' defaultChecked={true} />Yes
                                </div>
                                <div className='option'>
                                    <input onChange={(e) => setCallback('false')} value={Callback} type='radio' name='callback' id='callback' />No
                                </div>
                                <br />

                                <input onChange={(e) => setMobile(e.target.value)} value={Mobile} type='number' name='mobile' id='mobile' placeholder='Mobile' />

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={(e) => callRegister(e)} type="button" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register;