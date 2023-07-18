import axios from "axios";

const api = {
  getQuestions: (numberQuestions) =>
    axios.get("http://localhost:8001/questions"),
};

export default api;
