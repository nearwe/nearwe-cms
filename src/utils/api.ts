import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.29.140:5010"
    : process.env.REACT_APP_APISTAGE_URL;

export const core_services = {
  getWayyoDownloadStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/downloads/wayyo/stats`, {
        timeout: 5000,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  registerWayyoDownloadClick: async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/downloads/wayyo/click`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          timeout: 1500,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
