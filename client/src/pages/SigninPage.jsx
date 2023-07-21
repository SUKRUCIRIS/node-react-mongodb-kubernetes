import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const SigninPage = () => {
  const [formvalue, setFormvalue] = useState({
    username: "",
    password: "",
  });
  const handleInput = (e) => {
    setFormvalue((previousState) => {
      previousState[e.target.name] = e.target.value;
      return previousState;
    });
  };
  const handleform = async (event) => {
    event.preventDefault();
    let x = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formvalue.username,
        password: formvalue.password,
      }),
    });
    let y = await x.json();
    if (y.status) {
      window.localStorage.todoaccount = JSON.stringify(y.data);
      window.localStorage.loggedin = true;
      window.location.href = "/MainPage";
    } else {
      window.alert("Your sign in is failed: " + y.error);
    }
  };
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  SIGN IN
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleform}>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label className="text-center">Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        onChange={handleInput}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Sign In
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      You don't have an account?{" "}
                      <a href="/SignupPage" className="text-primary fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SigninPage;
