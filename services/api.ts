import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

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

export const loginUser = async (credentials: any) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
};

export const registerUser = async (data: any) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
};

export const fetchCurrentUser = async () => {
    const response = await api.get('/auth/me/');
    return response.data;
};

export const updateCurrentUser = async (userData: any) => {
    // If userData contains a File, use multipart/form-data
    if (userData.avatar instanceof File) {
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
            if (key === 'specialty' || key === 'avatar') {
                if (key === 'avatar' && userData[key] === null) return;
                formData.append(`profile.${key}`, userData[key]);
            } else {
                formData.append(key, userData[key]);
            }
        });
        const response = await api.patch('/auth/me/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
    
    // Fallback to JSON if no file uploaded
    const response = await api.patch('/auth/me/', userData);
    return response.data;
};

export const fetchNotifications = async () => {
    const response = await api.get('/notifications/');
    return response.data.results ? response.data.results : response.data;
};

export const markNotificationRead = async (id: string) => {
    const response = await api.patch(`/notifications/${id}/`, { is_read: true });
    return response.data;
};
