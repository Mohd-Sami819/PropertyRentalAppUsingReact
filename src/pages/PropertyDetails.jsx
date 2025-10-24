import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const PropertyDetails = ({ properties, user, onBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prop = properties.find(p => p.id === id);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);

  if (!prop) return <h4>Property not found</h4>;

  const submit = () => {
    if (!user) return alert('Login to book');
    const booking = { id: uuid(), propertyId: id, userEmail: user.email, checkin, checkout, guests };
    onBook(booking);
    alert('Booking Confirmed');
    navigate('/dashboard');
  };

  return (
    <div className="row">
      <div className="col-md-7">
        <img src={prop.images[0]} alt="property" className="img-fluid rounded" />
        <h3>{prop.title}</h3>
        <p>{prop.description}</p>
      </div>
      <div className="col-md-5">
        <div className="card p-3">
          <div><strong>₹{prop.price}</strong> | {prop.location}</div>
          <hr />
          <label>Check-in</label>
          <input type="date" className="form-control mb-2" value={checkin} onChange={e => setCheckin(e.target.value)} />
          <label>Check-out</label>
          <input type="date" className="form-control mb-2" value={checkout} onChange={e => setCheckout(e.target.value)} />
          <label>Guests</label>
          <input type="number" className="form-control mb-3" min={1} value={guests} onChange={e => setGuests(Number(e.target.value))} />
          <button className="btn btn-primary w-100" onClick={submit}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
