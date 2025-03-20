import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Notes from "./pages/Notes"
import Collaborate from "./pages/Collaborate"
import { SocketProvider } from "./context/SocketContext";
import useSocket from "./context/SocketContext";

function App() {

    return (
        <SocketProvider>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/collaborate" element={<Collaborate />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </SocketProvider>
        
    );
}

export default App;

