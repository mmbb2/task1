import React  from 'react';
import Booking from './pages/Booking';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<ProtectedRoute component={<Home/>}> </ProtectedRoute>}/>
        <Route path='/booking' element={<ProtectedRoute component={<Booking/>}> </ProtectedRoute> }/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    
  )
  
}

export default App;
