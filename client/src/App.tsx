import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './Login'
import Profile from './Profile'


function App() {
  return (
    <div className='app'>
      <div className='section'>
        <div className='container' style={{ maxWidth: '400px' }}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
          </div>
      </div>
    </div >
  )
}

export default App;
