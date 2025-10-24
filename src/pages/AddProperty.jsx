import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddProperty = ({ user, addProperty }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const submit = () => {
    if (!user) return alert('Login first');
    if (!title || !price || !location) return alert('Fill all required fields');
    const prop = {
      id: uuid(),
      owner: user.email,
      title, description: desc, price: Number(price),
      location, images: [image || 'https://picsum.photos/800/500'],
      available: true
    };
    addProperty(prop);
    alert('Property added');
    navigate('/dashboard');
  };

  return (
    <div className="card p-3">
      <h4>Add Property</h4>
      <input className="form-control my-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="form-control my-2" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input className="form-control my-2" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input className="form-control my-2" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input className="form-control my-2" placeholder="Image URL (optional)" value={image} onChange={e => setImage(e.target.value)} />
      <button className="btn btn-primary" onClick={submit}>Add Property</button>
    </div>
  );
};

export default AddProperty;
