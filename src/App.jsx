import React from 'react';
import './App.css';
import { Components } from './pages/components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <x-header></x-header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/" element={<Navigate to="/home" />}></Route>
      </Routes>
      <x-footer></x-footer>
    </BrowserRouter>
  )
}

export default App;
