import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BASE_URL = "http://43.204.250.254:4002"; //server url


// const BASE_URL = "http://172.30.1.119:3000"; //aruba


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
    console.log("token in intecepter", token);
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
        
      }
    } else {
      // Network error or no response
      console.log("❌ Network Error:", error.message || "No response from server");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
