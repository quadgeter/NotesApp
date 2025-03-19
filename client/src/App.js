import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Notes from "./pages/Notes"

console.log("Register component is being imported");

function App() {
    return (
      
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

