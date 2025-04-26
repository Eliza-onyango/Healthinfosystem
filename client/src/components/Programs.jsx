import React, { useState, useEffect } from 'react';
import { createProgram, fetchPrograms } from '../services/api';

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

  if (loading) return <div>Loading programs...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Health Programs</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Create New Program</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Program Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newProgram.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea
                className="form-control"
                name="description"
                value={newProgram.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Program
            </button>
          </form>
        </div>
      </div>

      <h3>Available Programs</h3>
      <ul className="list-group">
        {programs.map(program => (
          <li key={program._id} className="list-group-item">
            <h5>{program.name}</h5>
            {program.description && <p>{program.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;