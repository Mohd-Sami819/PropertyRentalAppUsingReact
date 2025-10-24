import React, { useState } from 'react';
import { save } from '../utils/storage';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');

  if (!open) return null;

  const submit = () => {
    if (!email) return alert('Enter email');
    save('user', { email });
    window.location.reload();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h5>Login / Signup</h5>
        <input className="form-control my-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={submit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
