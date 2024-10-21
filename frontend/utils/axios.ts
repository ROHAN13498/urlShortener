import { AxiosRequestConfig } from "axios";
import axios from "axios";

// Create an Axios AxiosInstance
const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, 
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];


      try {
        if (!refreshToken) {
          throw("Refresh token not found")
        }
        const refreshTokenResponse = await AxiosInstance.post(
          "/api/auth/refreshToken",
          null,
          { withCredentials: true }
        );

        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        window.location.href = "/auth/login"; 
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
