import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

export const fetchStandards = async (params = {}) => {
    const response = await api.get('/standards/', { params });
    // Handle DRF pagination layout safely
    return response.data.results ? response.data.results : response.data;
};

export const fetchIncidents = async (params = {}) => {
    const response = await api.get('/incidents/', { params });
    // Handle DRF pagination layout safely
    return response.data.results ? response.data.results : response.data;
};

export const reportIncident = async (data: any) => {
    const response = await api.post('/incidents/', data);
    return response.data;
};

export const fetchDashboardStats = async () => {
    const response = await api.get('/dashboard/stats/');
    return response.data;
};
