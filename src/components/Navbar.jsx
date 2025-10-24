import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">PropertyRent</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add">Add Property</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="d-flex">
              {user ? (
                <>
                  <span className="me-3 fw-medium">{user.email}</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => { onLogout(); navigate('/'); }}>Logout</button>
                </>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>Login / Signup</button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
