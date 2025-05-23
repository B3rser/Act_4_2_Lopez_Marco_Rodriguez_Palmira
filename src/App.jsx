import React from 'react';
import './App.css';
import { Components } from './pages/Components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExpUni } from './pages/ExpUni';
import { ExpCarr } from './pages/ExpCarr';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/expUni" element={<ExpUni/>}/>
        <Route path="/expCarr" element={<ExpCarr/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
