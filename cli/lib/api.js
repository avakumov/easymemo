import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001/";
axios.defaults.headers.common["Content-Type"] = "application/json";

const api = {
  login: async (email, password) => {
    const { data } = await axios.post("auth/login", { email, password });
    if (!data) {
      throw new Error("No data from login");
    }
    if (!data.access_token) {
      throw new Error("No access token");
    }
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + data.access_token;
  },
  logout: () => {
    delete axios.defaults.headers.common["Authorization"];
  },
  getQuestions: (numberQuestions) => axios.get("questions"),
};

export default api;
