import React, { useState } from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar";

export const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate phone number
    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Invalid phone number";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the form
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div>
      < Navbar />
    <Container>
      <Row className="mb-5 mt-3">
        <Col lg="15">
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <h1 className="display-7 mb-7">About Us Details</h1>
          We are doing an innovation recommendation system 
          based on collaborative filtering about E-commerce.
          Say goodbye to generic product suggestion and hello
          to personalized shopping experience tailored just 
          for you and you blogshops.
        </Col>
        <Col lg="7" className="d-flex align-items-center">
          <form className="contact__form w-100" onSubmit={handleSubmit}>
            <Row>
             <h4> <p>Having Trouble? <br/> Contact Us Below!</p></h4>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="number"
                  name="number"
                  placeholder="Phone Number"
                  type="text"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
                {errors.number && <div className="text-danger">{errors.number}</div>}
              </Col>
              <Col>
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </Col>
            </Row>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Tell Us More"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
            {errors.message && <div className="text-danger">{errors.message}</div>}
            <br />
            <Row>
              <Col lg="12" className="form-group">
                <button className="btn ac_btn" type="submit">
                  Submit
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};
