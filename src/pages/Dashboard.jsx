import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddProperty from './AddProperty';

const Dashboard = ({ user, properties, bookings, cancelBooking, addProperty, deleteProperty }) => {
  const [openAdd, setOpenAdd] = useState(false);

  if (!user) return <div>Please login to view dashboard.</div>;

  const myProps = properties.filter(p => p.owner === user.email);
  const myBookings = bookings.filter(b => b.userEmail === user.email);

  return (
    <div>
      <h4>Welcome, {user.email}</h4>

      {/* Add Property Button */}
      <button className="btn btn-success mb-3" onClick={() => setOpenAdd(true)}>
        + Add New Property / Hotel
      </button>

      {openAdd && (
        <AddProperty
          user={user}
          addProperty={(prop) => {
            addProperty(prop);
            setOpenAdd(false);
          }}
        />
      )}

      <div className="row">
        <div className="col-md-6">
          <h5>Your Listings</h5>
          {myProps.length === 0 && <p>No properties added yet.</p>}
          {myProps.map(p => (
            <div key={p.id} className="card p-2 mb-2 hover-shadow">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <b>{p.title}</b> <br />
                  <small>{p.location}</small>
                </div>
                <div className="d-flex gap-2">
                  <Link to={`/property/${p.id}`} className="btn btn-sm btn-outline-primary">View</Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete this property?')){
                        deleteProperty(p.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <h5>Your Bookings</h5>
          {myBookings.length === 0 && <p>No bookings yet.</p>}
          {myBookings.map(b => (
            <div key={b.id} className="card p-2 mb-2">
              <div className="d-flex justify-content-between">
                <div>
                  <div>Property ID: {b.propertyId}</div>
                  <small>{b.checkin} → {b.checkout}</small>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
