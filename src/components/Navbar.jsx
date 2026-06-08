import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate();
  return (
     <nav className="home-nav" style={{margin:"1rem 0"}}>
        <div className="nav-brand">
          <div className="logo">
            <span className="logo-icon">💸</span>
            <span className="logo-text">PayFlow</span>
          </div>
        </div>
        <div className="nav-actions">
          <button className="nav-btn login-btn" onClick={() => navigate('/')}>
            Home 
          </button>
        </div> 
      </nav>
  )
}

export default Navbar