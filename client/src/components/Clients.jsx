import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchClients, searchClients } from '../services/api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch clients on component mount
  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const response = await fetchClients();
        setClients(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  // Handle client search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // If search is empty, reload all clients
      try {
        setSearchLoading(true);
        const response = await fetchClients();
        setClients(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch clients');
      } finally {
        setSearchLoading(false);
      }
      return;
    }

    try {
      setSearchLoading(true);
      const response = await searchClients(searchQuery);
      setClients(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Search failed');
    } finally {
      setSearchLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading clients...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => setError(null)}
          aria-label="Close"
        ></button>
      </div>
    );
  }

  // Empty state
  if (clients.length === 0) {
    return (
      <div className="text-center my-5">
        <h2>No Clients Found</h2>
        <p>There are currently no clients registered in the system.</p>
        <Link to="/clients/register" className="btn btn-primary">
          Register New Client
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: '1200px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <h2 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>Client Management</h2>
        </div>
        <div className="d-flex gap-2">
          {/* <Link to="/programs/enroll" className="btn btn-success" style={{ backgroundColor: '#27ae60', borderColor: '#27ae60' }}>
            <i className="bi bi-journal-plus me-2"></i>
            Enroll Program
          </Link> */}
          <Link to="/clients/register" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Register New Client
          </Link>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group shadow-sm">
          <input
            type="text"
            className="form-control border-primary"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search clients"
            style={{ borderRadius: '0.25rem 0 0 0.25rem' }}
          />
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={searchLoading}
            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
          >
            {searchLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Searching...
              </>
            ) : (
              <>
                <i className="bi bi-search me-2"></i>
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {/* Clients List */}
      <div className="list-group shadow-sm">
        {clients.map(client => (
          <div 
            key={client._id} 
            className="list-group-item list-group-item-action hover-shadow"
            onClick={() => navigate(`/clients/${client._id}`)}
            style={{ 
              cursor: 'pointer',
              borderLeft: '4px solid #3498db',
              marginBottom: '8px',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              border: '1px solid #e0e0e0'
            }}
          >
            <div className="d-flex w-100 justify-content-between align-items-center">
              <div>
                <h5 className="mb-1" style={{ color: '#2c3e50', fontWeight: '500' }}>
                  {client.firstName} {client.lastName}
                </h5>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="badge bg-light text-dark" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="bi bi-gender-ambiguous me-1" style={{ color: '#e74c3c' }}></i>
                    {client.gender}
                  </span>
                  <span className="badge bg-light text-dark" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="bi bi-calendar me-1" style={{ color: '#3498db' }}></i>
                    {new Date(client.dateOfBirth).toLocaleDateString()}
                  </span>
                  {client.contactInfo?.phone && (
                    <span className="badge bg-light text-dark" style={{ backgroundColor: '#f8f9fa' }}>
                      <i className="bi bi-telephone me-1" style={{ color: '#2ecc71' }}></i>
                      {client.contactInfo.phone}
                    </span>
                  )}
                </div>
              </div>
              <i className="bi bi-chevron-right text-muted"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination would go here if implemented */}
    </div>
  );
};

export default Clients;