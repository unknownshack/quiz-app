import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Quiz from '../Quiz/Quiz';
import MyQuiz from '../MyQuiz/MyQuiz';
import MyAccount from '../MyAccount/MyAccount';

//Define routes
/*
please note that route "quiz" is an obsolete page that retrive questions from Fornt-end only.
It is connected with the demo page, which is the first version of mettle project.
 */
export default function App() {
  return (

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path = "login" element={<Login />} />
            <Route path = "quiz" element={<Quiz />} />
            <Route path = "myquiz/*" element={<MyQuiz />}/>     
            <Route path = "myaccount" element={<MyAccount />} />
          </Route>
        </Routes>

      </BrowserRouter>

  );
}

