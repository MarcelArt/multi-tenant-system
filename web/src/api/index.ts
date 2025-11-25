import useAuth from '@/hooks/useAuth';
import type { JsonResponse } from '@/types/json-response';
import type { LoginResponse } from '@/types/user';
import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
	(config) => {
		const { accessToken } = useAuth.getState();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const { setUser, logout } = useAuth.getState();
		const originalRequest = error.config;
		console.log(1, originalRequest._retry);

		if (originalRequest?.url === '/user/refresh') {
			logout();
			localStorage.removeItem('refreshToken');
			window.location.href = '/login';
			return Promise.reject(error);
		}


		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Try to refresh token
			try {
				const refreshToken = localStorage.getItem('refreshToken');
				if (refreshToken) {
					const response = await api.post('/user/refresh', {
						refreshToken,
					});

					const { items } = response.data as JsonResponse<LoginResponse>;
					localStorage.setItem('refreshToken', items.refreshToken);
					setUser(items.accessToken, items.username, items.email, items.userId);

					// Retry original request with new token
					originalRequest.headers.Authorization = `Bearer ${items.accessToken}`;
					return api(originalRequest);
				}
			} catch (refreshError) {
				// Refresh failed, redirect to login
				logout();
				localStorage.removeItem('refreshToken');
				window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}

		// If no refresh token or refresh failed, redirect to login
		if (error.response?.status === 401) {
			logout();
			localStorage.removeItem('refreshToken');
			window.location.href = '/login';
		}

		return Promise.reject(error);
	},
);

export default api;
