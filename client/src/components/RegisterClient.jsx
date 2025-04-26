import React, { useState } from 'react';
import { registerClient } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterClient = () => {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    }
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Changed from useHistory to useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('contactInfo.')) {
      const contactField = name.split('.')[1];
      setClient(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [contactField]: value
        }
      }));
    } else {
      setClient(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerClient(client);
      navigate('/clients'); // Changed from history.push to navigate
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Register New Client</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={client.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={client.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={client.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              value={client.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <h4 className="mt-4">Contact Information</h4>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="contactInfo.phone"
              value={client.contactInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="contactInfo.email"
              value={client.contactInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="contactInfo.address"
              value={client.contactInfo.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Register Client
        </button>
      </form>
    </div>
  );
};

export default RegisterClient;