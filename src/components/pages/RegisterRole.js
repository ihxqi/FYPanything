import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Roles.css'; // Make sure to create this CSS file

const Roles = () => {
    return (
        <Container fluid className="roles-container">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h1 className="logo">COLLAFILTER</h1>
                    <div className="roles-options">
                        <Button variant="outline-primary" className="role-btn">
                            👩‍💼 Register as Partner
                        </Button>
                        <Button variant="outline-secondary" className="role-btn">
                            👤 Register as User
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Roles;