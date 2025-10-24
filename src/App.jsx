import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import Dashboard from './pages/Dashboard';
import { load, save } from './utils/storage';
import { SAMPLE_PROPERTIES } from './data/sample';

const App = () => {
  const [user, setUser] = useState(load('user', null));
  const [properties, setProperties] = useState(load('properties', SAMPLE_PROPERTIES));
  const [bookings, setBookings] = useState(load('bookings', []));
  const navigate = useNavigate();

  useEffect(() => save('properties', properties), [properties]);
  useEffect(() => save('bookings', bookings), [bookings]);
  useEffect(() => save('user', user), [user]);

  const login = (email) => { setUser({ email }); navigate('/'); };
  const logout = () => { setUser(null); navigate('/'); };

  const addProperty = (prop) => setProperties(prev => [prop, ...prev]);
  const updateProperty = (id, changes) =>
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));

  const addBooking = (booking) => {
    setBookings(prev => [booking, ...prev]);
    updateProperty(booking.propertyId, { available: false });
  };

  const cancelBooking = (bookingId) => {
    const b = bookings.find(x => x.id === bookingId);
    if (b) updateProperty(b.propertyId, { available: true });
    setBookings(prev => prev.filter(x => x.id !== bookingId));
  };

  // <-- Add this function for delete
  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setBookings(prev => prev.filter(b => b.propertyId !== id));
  };

  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home properties={properties} user={user} />} />
          <Route path="/property/:id" element={<PropertyDetails properties={properties} user={user} onBook={addBooking} />} />
          <Route path="/add" element={<AddProperty user={user} addProperty={addProperty} />} />

          {/* Dashboard route with deleteProperty */}
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                properties={properties}
                bookings={bookings}
                cancelBooking={cancelBooking}
                addProperty={addProperty}
                deleteProperty={deleteProperty} // <-- Pass the function here
              />
            }
          />
        </Routes>
      </div>
      <hr />

      <footer className="bg-light py-4 mt-5 text-center text-dark footer-custom">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-2">
        <h6>PropertyRent</h6>
        <p>Haridwar University - B.Tech Full Stack Project</p>
      </div>
      <div className="col-md-4 mb-2">
        <h6>Quick Links</h6>
        <ul className="list-unstyled">
          <li><a href="/" className="footer-link">Home</a></li>
          <li><a href="/add" className="footer-link">Add Property</a></li>
          <li><a href="/dashboard" className="footer-link">Dashboard</a></li>
        </ul>
      </div>
      <div className="col-md-4 mb-2">
        <h6>Contact</h6>
        <p>Email: mohdshami8199@gmail.com</p>
        <p>Phone: +91 8199989937</p>
        <div className="social-icons mt-2">
          <a href="https://huroorkee.ac.in/" className="me-2">🌐</a>
          <a href="https://www.instagram.com/haridwaruniversity/?hl=en" className="me-2">📘</a>
          <a href="https://x.com/HURoorkee/status/1684906025210499072">🐦</a>
        </div>
      </div>
    </div>
   
    <p className="mb-0">&copy; 2025 PropertyRent. All rights reserved.</p>
  </div>
</footer>

    </div>
    
  );
};

export default App;
