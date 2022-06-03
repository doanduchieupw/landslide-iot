import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Register, Login, Home } from './components'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}