import { AxiosRequestConfig } from "axios";
import axios from "axios";
import { useAuth } from "./authcontext";

// Create an Axios AxiosInstance
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // To send cookies with requests
});

AxiosInstance.interceptors.response.use(
  // Add interceptor to handle token refresh logic
  (response) => {
    return response; // If response is successful, return it as is.
  },
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 (Unauthorized) and it's not from the refresh endpoint
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to avoid retry loops

      try {
        // Call the refresh token endpoint
        const refreshTokenResponse = await axios.post(
          "/api/auth/refresh",
          null,
          { withCredentials: true }
        );
        const newAccessToken = refreshTokenResponse.data.accessToken;
        const {setAccessToken}=useAuth();

        setAccessToken( "Bearer " + newAccessToken)

        // Update the Authorization header with the new token
        AxiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // Reject the error if it's not a 401 or refresh fails
    return Promise.reject(error);
  }
);

export default AxiosInstance;
