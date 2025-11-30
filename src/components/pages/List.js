// src/components/Pages/ListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 페이지 이동을 위해 필수!
import { Table, Button, Container, Spinner } from 'react-bootstrap';

export const API_URL = "https://6911d70152a60f10c81f7bf3.mockapi.io/students"; // 본인의 API 주소

const List = () => {
  // 1. 상태 관리 (데이터 목록, 로딩 상태)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. 데이터 불러오기 (Mount 시 1회 실행)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data); // 가져온 데이터 저장
        setLoading(false);
      } catch (error) {
        console.error("Failure Loading Data:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 3. 삭제 로직 (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Really delete the data?")) {
      try {
        // API에서 삭제
        await axios.delete(`${API_URL}/${id}`);
        // 화면 목록에서 즉시 제거 (새로고침 방지)
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error("Failure Delete Data:", error);
        alert("An error occurred during deletion.");
      }
    }
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
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        {/* 추가 페이지(/create)로 이동하는 버튼 */}
        <Link to="/create">
          <Button variant="success">Plus New Member</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Job</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* 이름을 클릭하면 상세 페이지(/detail/ID)로 이동 */}
              <td>
                <Link to={`/detail/${user.id}`} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                  {user.name}
                </Link>
              </td>
              <td>{user.phone || 'N/A'}</td>
              <td>{user.country || 'N/A'}</td>
              <td>{user.job || 'N/A'}</td>
              <td>
                {/* 수정 버튼: 클릭 시 수정 페이지(/update/ID)로 이동 */}
                <Link to={`/update/${user.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    Edit
                  </Button>
                </Link>
                
                {/* 삭제 버튼: 페이지 이동 없이 바로 로직 실행 */}
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;