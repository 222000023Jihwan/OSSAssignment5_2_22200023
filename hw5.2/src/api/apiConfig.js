// src/api/apiConfig.js
import axios from 'axios';

const API_URL = "https://6911d70152a60f10c81f7bf3.mockapi.io/students";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export { API_URL, apiClient };
