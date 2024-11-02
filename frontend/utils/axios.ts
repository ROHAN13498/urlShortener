import { AxiosRequestConfig } from "axios";
import axios from "axios";

// Create an Axios instance with the base URL of your API
const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Update this URL to your backend
  withCredentials: true, // Allow sending cookies with requests
});

// Intercept responses to handle token refreshing
AxiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if it's successful
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized status
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      // Access cookies only in the browser
      let refreshToken;
      if (typeof document !== 'undefined') {
        refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('refreshToken='))?.split('=')[1];
      }

      console.log("Refresh token is:", refreshToken);
      
      try {
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        // Attempt to refresh the token
        const refreshTokenResponse = await AxiosInstance.post(
          "/api/auth/refreshToken",
          null,
          { withCredentials: true } // Send cookies with this request
        );

        // Assuming the response contains the new access token in a standard location
        // const newAccessToken = refreshTokenResponse.data.accessToken;

        // Optionally, you could store the new access token if you needed to
        // localStorage.setItem('accessToken', newAccessToken); 

        // Retry the original request with the refreshed token
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Redirect to login if the refresh fails
        if (typeof window !== 'undefined') {
          window.location.href = "/auth/login"; 
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject the error if it's not handled
  }
);

export default AxiosInstance;
