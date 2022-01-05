import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Login from '../Login/Login';


export default function App() {
  return (

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path = "login" element={<Login />} />
          </Route>
        </Routes>

      </BrowserRouter>

  );
}

