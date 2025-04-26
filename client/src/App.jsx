import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Programs from './components/Programs';
import Clients from './components/Clients';
import ClientProfile from './components/ClientProfile';
import RegisterClient from './components/RegisterClient';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/register" element={<RegisterClient />} />
            <Route path="/clients/:id" element={<ClientProfile />} />
            
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}


export default App;