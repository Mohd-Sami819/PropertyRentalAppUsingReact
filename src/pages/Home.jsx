import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

const Home = ({ properties }) => {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');

  const filtered = properties.filter(p =>
    (p.title.toLowerCase().includes(q.toLowerCase()) ||
     p.description.toLowerCase().includes(q.toLowerCase())) &&
    (loc ? p.location.toLowerCase() === loc.toLowerCase() : true)
  );

  const locations = [...new Set(properties.map(p => p.location))];

  return (
    <>
      {/* Hero Section */}
<div className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center">
  <h1>Find Your Perfect Stay</h1>
  <p>Discover homes, apartments, and hotels in India</p>
</div>


      {/* Search Filters */}
      <div className="d-flex gap-2 mb-3 mt-3">
        <input className="form-control" placeholder="Search by title or description" value={q} onChange={e => setQ(e.target.value)} />
        <select className="form-select w-auto" value={loc} onChange={e => setLoc(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* Property Cards */}
      <div className="row">
        {filtered.map(p => (
          <div key={p.id} className="col-md-4 mb-4">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
