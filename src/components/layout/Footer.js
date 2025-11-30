// src/components/layout/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <Container>
        <Row className="py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-title">📚 About</h5>
            <p className="footer-text">
              User Management System
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-title">🔗 Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/#">Create User</a></li>
              <li><a href="/#">User List</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="footer-title">📧 Contact</h5>
            <p className="footer-text">
              Email: info@studentmgmt.com<br />
              Phone: +82-4106-1925
            </p>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="py-3">
          <Col className="text-center">
            <p className="footer-bottom">
              © {currentYear} Student Management System. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
