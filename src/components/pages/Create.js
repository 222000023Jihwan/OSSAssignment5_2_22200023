// src/components/Pages/Create.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { API_URL } from './List';

const Create = () => {
  // 1. 네비게이션 및 상태 관리
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    job: ''
  });

  // 2. 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. 폼 제출 (POST 요청으로 새 데이터 추가)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // 필수 필드 검증
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and Email are required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, formData);
      alert("New user has been successfully added.");
      // 추가 완료 후 새로 추가된 사용자의 상세 페이지로 이동
      navigate(`/detail/${response.data.id}`);
    } catch (error) {
      console.error("Failed to create user:", error);
      setError("Failed to add new user. Please try again.");
      setSubmitting(false);
    }
  };

  // 4. 취소 버튼 (목록 페이지로 이동)
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Add New User</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PhoneNum</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Job</Form.Label>
          <Form.Control
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button 
            variant="success" 
            type="submit" 
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add User"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Create;
