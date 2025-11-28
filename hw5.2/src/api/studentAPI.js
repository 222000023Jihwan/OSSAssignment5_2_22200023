// src/api/studentAPI.js
import { apiClient, API_URL } from './apiConfig';

// 모든 학생 조회
export const getAllStudents = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// 특정 학생 조회
export const getStudentById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

// 학생 생성
export const createStudent = async (studentData) => {
  try {
    const response = await apiClient.post('/', studentData);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// 학생 정보 수정
export const updateStudent = async (id, studentData) => {
  try {
    const response = await apiClient.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// 학생 삭제
export const deleteStudent = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
