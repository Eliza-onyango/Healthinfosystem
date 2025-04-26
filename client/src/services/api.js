import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Ensure this matches your backend
});

// Client-related API calls
export const fetchClients = () => API.get('/clients'); // Note: no leading slash in path
export const searchClients = (query) => API.get(`/clients/search?query=${query}`);
export const fetchClient = (id) => {
    console.log("Fetching client with ID:", id); // Debug log
    return API.get(`/clients/${id}`);
};
export const registerClient = (clientData) => API.post('/clients', clientData);
export const enrollClient = (id, programIds) =>
    API.post(`/clients/${id}/enroll`, { programIds });

// Program-related API calls
export const fetchPrograms = () => API.get('/programs');
export const createProgram = (programData) => API.post('/programs', programData); // Added this export

export const fetchProgram = (id) => API.get(`/programs/${id}`);
export const updateProgram = (id, programData) => API.put(`/programs/${id}`, programData);

// export const deleteProgram = async (programId) => {
//     const response = await API.delete(`/programs/${programId}`);
//     return response;
// };
API.get('/test')
    .then(response => console.log(response.data))
    .catch(error => console.error('Connection test failed:', error));


export default API;