import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div className="card h-100">
    <img src={property.images?.[0] || 'https://picsum.photos/400/250'} className="card-img-top" alt="prop" />
    <div className="card-body d-flex flex-column">
      <h5>{property.title}</h5>
      <p className="text-truncate">{property.description}</p>
      <div className="mt-auto d-flex justify-content-between">
        <div>
          <strong>₹{property.price}</strong>
          <div><small>{property.location}</small></div>
        </div>
        <Link to={`/property/${property.id}`} className="btn btn-outline-primary">View</Link>
      </div>
    </div>
  </div>
);

export default PropertyCard;