import React, { useState, useEffect } from 'react';
import { createProgram, fetchPrograms  } from '../services/api';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const response = await fetchPrograms();
        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProgram(newProgram);
      setPrograms([response.data, ...programs]);
      setNewProgram({ name: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleChange = (e) => {
    setNewProgram({
      ...newProgram,
      [e.target.name]: e.target.value
    });
  };


  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading programs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        Error: {error}
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => setError(null)}
          aria-label="Close"
        ></button>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#2c3e50', fontWeight: '600' }}>Health Programs</h2>
      </div>
      
      {/* Create Program Card */}
      <div className="card mb-4 shadow-sm border-0" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-4" style={{ color: '#3498db' }}>Create New Program</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Program Name</label>
              <input
                type="text"
                className="form-control border-primary"
                name="name"
                value={newProgram.name}
                onChange={handleChange}
                required
                style={{ borderRadius: '0.25rem' }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Description (Optional)</label>
              <textarea
                className="form-control border-primary"
                name="description"
                value={newProgram.description}
                onChange={handleChange}
                rows="3"
                style={{ borderRadius: '0.25rem' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary px-4 py-2"
              style={{ backgroundColor: '#3498db', borderColor: '#3498db', borderRadius: '0.25rem' }}
            >
              Create Program
            </button>
          </form>
        </div>
      </div>

      {/* Programs List */}
      <div className="mt-5">
        <h3 className="mb-4" style={{ color: '#2c3e50', fontWeight: '600' }}>Available Programs</h3>
        {programs.length === 0 ? (
          <div className="alert alert-info">
            No programs available. Create your first program above.
          </div>
        ) : (
          <div className="row g-4">
            {programs.map(program => (
              <div key={program._id} className="col-md-6">
                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '0.5rem' }}>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="card-title mb-3" style={{ color: '#2c3e50' }}>
                        {program.name}
                      </h5>
                     
                    </div>
                    {program.description && (
                      <p className="card-text text-muted flex-grow-1">
                        {program.description}
                      </p>
                    )}
                    <div className="mt-3 text-end">
                      <small className="text-muted">
                        Created: {new Date(program.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;