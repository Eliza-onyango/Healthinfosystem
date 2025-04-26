import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
      <div className="container">
        {/* Branding text instead of logo */}
        <span className="navbar-brand fw-bold fs-4 text-white">
          Health Information System
          {/* Or just use: HIS */}
        </span>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/programs">Programs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/clients">Clients</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
