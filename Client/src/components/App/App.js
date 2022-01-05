import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Quiz from '../Quiz/Quiz';

export default function App() {
  return (

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path = "login" element={<Login />} />
            <Route path = "quiz" element={<Quiz />} />
          </Route>
        </Routes>

      </BrowserRouter>

  );
}

