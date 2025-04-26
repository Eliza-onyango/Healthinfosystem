# Health Information Management System

## Overview

A comprehensive health information system designed for clinics and hospitals to manage client data and health programs. This full-stack application provides tools for healthcare providers to register clients, enroll them in health programs, and track their medical information.

<video controls src="Health Information System - Google Chrome 2025-04-26 11-12-39.mp4" title="Title"></video>

## Features

### Client Management

- Register new clients with personal and contact information
- View and search existing client profiles
- Enroll clients in health programs (TB, Malaria, HIV, etc.)

### Program Management

- Create and manage health programs
- Track client enrollment across programs
- View program participation statistics

### User Experience

- Responsive design for desktop and mobile
- Intuitive dashboard and navigation
- Secure authentication (optional)

## Technologies Used

### Frontend

- React.js with Vite
- React Router for navigation
- Bootstrap 5 for styling
- React Icons
- Axios for API communication

### Backend

- Node.js with Express
- MongoDB with Mongoose
- RESTful API design
- CORS for secure cross-origin requests

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas cluster)
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Eliza-onyango/Healthinfosystem.git
   cd health-info-system
   ```

2. **Set up the backend**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and other settings
   npm start
   ```

3. **Set up the frontend**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
health-info-system/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # API service layer
│   │   ├── App.jsx       # Main application component
│   │   └── main.jsx      # Entry point
│   └── vite.config.js    # Vite configuration
│
├── server/               # Backend Node.js application
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Endpoints

| Endpoint                  | Method | Description               |
| ------------------------- | ------ | ------------------------- |
| `/api/clients`            | GET    | Get all clients           |
| `/api/clients`            | POST   | Create new client         |
| `/api/clients/:id`        | GET    | Get single client         |
| `/api/clients/:id/enroll` | POST   | Enroll client in programs |
| `/api/programs`           | GET    | Get all programs          |
| `/api/programs`           | POST   | Create new program        |

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Maintainer - [Your Name](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/health-info-system](https://github.com/yourusername/health-info-system)
