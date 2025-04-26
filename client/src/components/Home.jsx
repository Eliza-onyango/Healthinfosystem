import React, { useEffect, useState } from 'react';
import { FaUserMd, FaClinicMedical, FaChartLine, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import 'animate.css/animate.min.css';

const Home = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

 // Set loaded to true immediately on component mount
 useEffect(() => {
  setLoaded(true);
}, []);

  // Stats data
  const stats = [
    { id: 1, value: '1,240+', label: 'Patients Served', icon: <FaHeartbeat className="text-primary" size={40} /> },
    { id: 2, value: '15+', label: 'Health Programs', icon: <FaClinicMedical className="text-primary" size={40} /> },
    { id: 3, value: '98%', label: 'Satisfaction Rate', icon: <FaChartLine className="text-primary" size={40} /> },
    { id: 4, value: '24/7', label: 'Availability', icon: <FaUserMd className="text-primary" size={40} /> }
  ];

  return (
    <div className="container-fluid p-0 ">
      {/* Hero Section */}
      <section className="hero-section bg-light py-5 min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className={`transition-all ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="display-4 fw-bold mb-4">
                Modern <span className="text-primary">Health</span> Management System
              </h1>
              <p className="lead text-muted mb-4">
                Streamline patient care and program management with our comprehensive healthcare solution.
              </p>
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-primary btn-lg px-4"
                  onClick={() => navigate('/clients')}
                >
                  <FaUserMd className="me-2" />
                  Manage Patients
                </button>
                <button 
                  className="btn btn-outline-primary btn-lg px-4"
                  onClick={() => navigate('/programs')}
                >
                  <FaClinicMedical className="me-2" />
                  View Programs
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={`transition-all ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <img 
                src="https://img.freepik.com/free-vector/medical-team-concept-illustration_114360-8404.jpg" 
                alt="Healthcare illustration" 
                className="img-fluid rounded-3 shadow-lg"
                loading="eager" // Force immediate loading
              />
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
            <div className="row g-4">
              {stats.map((stat) => (
                <div key={stat.id} className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="card-body text-center p-4">
                      <div className="mb-3">{stat.icon}</div>
                      <h3 className="card-title mb-2">{stat.value}</h3>
                      <p className="card-text text-muted">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimationOnScroll>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
            <h2 className="text-center mb-5 display-5 fw-bold">Key Features</h2>
          </AnimationOnScroll>
          
          <div className="row g-4">
            <div className="col-md-4">
              <AnimationOnScroll animateIn="animate__fadeInUp" delay={100} animateOnce>
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <FaUserMd className="text-primary" size={50} />
                    </div>
                    <h3 className="text-center mb-3">Patient Management</h3>
                    <p className="text-muted text-center">
                      Comprehensive patient records with medical history tracking and program enrollment.
                    </p>
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
            
            <div className="col-md-4">
              <AnimationOnScroll animateIn="animate__fadeInUp" delay={200} animateOnce>
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <FaClinicMedical className="text-primary" size={50} />
                    </div>
                    <h3 className="text-center mb-3">Program Tracking</h3>
                    <p className="text-muted text-center">
                      Manage TB, Malaria, HIV and other health programs with real-time monitoring.
                    </p>
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
            
            <div className="col-md-4">
              <AnimationOnScroll animateIn="animate__fadeInUp" delay={300} animateOnce>
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <FaChartLine className="text-primary" size={50} />
                    </div>
                    <h3 className="text-center mb-3">Analytics Dashboard</h3>
                    <p className="text-muted text-center">
                      Visualize patient data and program effectiveness with interactive charts.
                    </p>
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;