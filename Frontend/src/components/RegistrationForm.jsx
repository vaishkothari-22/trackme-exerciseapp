
import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Col, Row, Card, Container } from "react-bootstrap";
import { saveUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import "./Registration.css"

export function RegistrationForm() {
    const isBackgroundRed = true;
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormErrors(validate(formValues));
      const result = await saveUser(formValues);
      setFormValues({ username: "", email: "", password: "" });
      setIsSubmit(true);
      console.log(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        // navigate("/home");
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <Row className="justify-content-center mt-5" >
      <Col md={6}>
        <Card>
          <Card.Body>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
            //   <Alert variant="success">Signed in successfully</Alert>
            navigate("/home")
            ) : (
              <div>
                <h1 className="text-center mb-4">Please Login Here!!!</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label><b>Username : </b></Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder=" Enter Username"
                      value={formValues.username}
                      onChange={handleChange}
                      className="e1"
                    />
                    <Form.Text className="text-danger">{formErrors.username}</Form.Text>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formEmail" >
                    <Form.Label><b>Email : </b></Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      value={formValues.email}
                      onChange={handleChange}
                      className="e1"
                    />
                    <Form.Text className="text-danger">{formErrors.email}</Form.Text>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formPassword">
                    <Form.Label><b>Password : </b></Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formValues.password}
                      onChange={handleChange}
                      className="e1"
                    />
                    <Form.Text className="text-danger">{formErrors.password}</Form.Text>
                  </Form.Group>
                    <br></br>
                  <Button variant="primary" type="submit" block>
                    Login
                  </Button>
                </Form>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  
  );
}

