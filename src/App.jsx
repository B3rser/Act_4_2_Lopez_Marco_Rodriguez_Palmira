import React from 'react';
import './App.css';
import { Components } from './pages/Components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExpUni } from './pages/ExpUni';
import { ExpCarr } from './pages/ExpCarr';
import { Becas } from './pages/Becas';
import { Asesorias } from './pages/Asesorias';

function App() {
  return (
    <BrowserRouter>
      <x-header></x-header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/expUni" element={<ExpUni/>}/>
        <Route path="/expCarr" element={<ExpCarr/>}/>
        <Route path="/becas" element={<Becas/>}/>
        <Route path="/asesorias" element={<Asesorias/>}/>
      </Routes>
      <x-footer></x-footer>
    </BrowserRouter>
  )
}

export default App;
