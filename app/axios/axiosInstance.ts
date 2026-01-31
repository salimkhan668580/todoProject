import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const BASE_URL = "http://43.204.250.254:4001"; //server url

const BASE_URL = "http://192.168.0.122:3000"; //localhost url

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

/**
 * Request Interceptor
 */
axiosInstance.interceptors.request.use(

  async (config) => {
    const fullUrl =
  (config.baseURL ? config.baseURL.replace(/\/$/, "") : "") +
  (config.url?.startsWith("/") ? config.url : `/${config.url}`);

    console.log("➡️", config.method?.toUpperCase(), fullUrl, config.data);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }
    console.log("token", token);
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅", response?.status, response?.data);
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response) {
      console.log("❌", response.status, response.data);
      if (response.status === 401) {
        await AsyncStorage.clear();

        // 🔥 RN me window.location nahi hota
        // Navigation yahan handle karna padega
        // example: navigation.reset(...)
      }
    } else {
      // Network error or no response
      console.log("❌ Network Error:", error.message || "No response from server");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
