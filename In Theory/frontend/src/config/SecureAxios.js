import axios from "axios";

const secureAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-type": "application/json",
  },
});

export default secureAxios;
