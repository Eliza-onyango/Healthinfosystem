import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchClient, enrollClient, fetchPrograms } from '../services/api';
import { FaUser, FaCalendarAlt, FaVenusMars, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clientRes, programsRes] = await Promise.all([
          fetchClient(id),
          fetchPrograms()
        ]);
        
        setClient(clientRes.data);
        setPrograms(programsRes.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load data');
        toast.error('Failed to load client data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleProgramSelect = (programId) => {
    setSelectedPrograms(prev => 
      prev.includes(programId)
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const response = await enrollClient(id, selectedPrograms);
      setClient(response.data);
      setSelectedPrograms([]);
      toast.success('Client enrolled successfully!');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Enrollment failed');
      toast.error('Failed to enroll client');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
        <button 
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={() => navigate('/clients')}
        >
          Back to Clients
        </button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="alert alert-warning">
        Client not found
        <button 
          className="btn btn-sm btn-outline-warning ms-3"
          onClick={() => navigate('/clients')}
        >
          Back to Clients
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="card-title mb-3">
                <FaUser className="me-2" />
                {client.firstName} {client.lastName}
              </h2>
              
              <div className="mb-3">
                <p className="mb-1">
                  <FaCalendarAlt className="me-2 text-muted" />
                  <strong>Date of Birth:</strong> {new Date(client.dateOfBirth).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <FaVenusMars className="me-2 text-muted" />
                  <strong>Gender:</strong> {client.gender}
                </p>
              </div>
            </div>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/clients')}
            >
              Back to Clients
            </button>
          </div>

          {client.contactInfo && (
            <div className="mt-4 border-top pt-3">
              <h5 className="mb-3">Contact Information</h5>
              <div className="row">
                {client.contactInfo.phone && (
                  <div className="col-md-4 mb-2">
                    <p className="mb-1">
                      <FaPhone className="me-2 text-muted" />
                      <strong>Phone:</strong> {client.contactInfo.phone}
                    </p>
                  </div>
                )}
                {client.contactInfo.email && (
                  <div className="col-md-4 mb-2">
                    <p className="mb-1">
                      <FaEnvelope className="me-2 text-muted" />
                      <strong>Email:</strong> {client.contactInfo.email}
                    </p>
                  </div>
                )}
                {client.contactInfo.address && (
                  <div className="col-md-4 mb-2">
                    <p className="mb-1">
                      <FaMapMarkerAlt className="me-2 text-muted" />
                      <strong>Address:</strong> {client.contactInfo.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Enrolled Programs</h3>
              {client.enrolledPrograms.length > 0 ? (
                <div className="list-group">
                  {client.enrolledPrograms.map(program => (
                    <div key={program._id} className="list-group-item">
                      <h5 className="mb-2">{program.name}</h5>
                      {program.description && (
                        <p className="text-muted mb-0">{program.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info mb-0">
                  This client is not enrolled in any programs yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Available Programs</h3>
              {programs.length > 0 ? (
                <>
                  <div className="list-group mb-4">
                    {programs.map(program => (
                      <button
                        key={program._id}
                        type="button"
                        className={`list-group-item list-group-item-action ${
                          selectedPrograms.includes(program._id) ? 'active' : ''
                        }`}
                        onClick={() => handleProgramSelect(program._id)}
                      >
                        {program.name}
                        {selectedPrograms.includes(program._id) && (
                          <span className="float-end">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleEnroll}
                    disabled={selectedPrograms.length === 0 || loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <FaPlus className="me-2" />
                    )}
                    Enroll in Selected Programs
                  </button>
                </>
              ) : (
                <div className="alert alert-warning mb-0">
                  No programs available to enroll in.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
