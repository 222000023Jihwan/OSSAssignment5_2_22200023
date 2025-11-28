// src/components/Pages/Edit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { API_URL } from './List';

const Edit = () => {
  // 1. URL 파라미터에서 ID 받기
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. 상태 관리
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    job: ''
  });

  // 3. 편집할 데이터 불러오기 (Mount 시 1회 실행)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          country: response.data.country || '',
          job: response.data.job || ''
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load user data:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // 4. 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 5. 폼 제출 (PUT 요청으로 데이터 수정)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.put(`${API_URL}/${id}`, formData);
      alert("The data has been successfully modified.");
      // 수정 완료 후 목록 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Failed to modify data.");
      setSubmitting(false);
    }
  };

  // 6. 취소 버튼 (목록 페이지로 이동)
  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Edit user information</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Input Your Name"
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
            placeholder="Input Your PhoneNum"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Where are you from?"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>직업</Form.Label>
          <Form.Control
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
            placeholder="What is your job?"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            type="submit" 
            disabled={submitting}
          >
            {submitting ? "Editing..." : "Edit!"}
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

export default Edit;
