// src/components/Pages/Detail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Alert, Button, Card } from 'react-bootstrap';
import { API_URL } from './List';

const Detail = () => {
  // 1. URL 파라미터에서 ID 받기
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // 3. 상세 정보 불러오기 (Mount 시 1회 실행)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load user detail:", error);
        setError("Failed to retrieve user information.");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // 4. 목록 페이지로 돌아가기
  const handleBack = () => {
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

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={handleBack}>
          Return
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Details</h2>
        <Button variant="secondary" size="sm" onClick={handleBack}>
          Return
        </Button>
      </div>

      {user && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-4">{user.name}</Card.Title>

            <div className="mb-3">
              <h6 className="text-muted">Name</h6>
              <p className="fs-5">{user.name}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted">PhoneNum</h6>
              <p className="fs-5">{user.phone || 'No information'}</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted">Country</h6>
              <p className="fs-5">{user.country || 'No information'}</p>
            </div>

            <div className="mb-4">
              <h6 className="text-muted">Job</h6>
              <p className="fs-5">{user.job || 'No information'}</p>
            </div>

            <div className="d-flex gap-2">
              <Button 
                variant="warning" 
                onClick={() => navigate(`/update/${user.id}`)}
              >
                Edit
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleBack}
              >
                Return
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Detail;
