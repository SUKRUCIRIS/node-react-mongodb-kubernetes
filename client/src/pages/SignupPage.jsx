import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const SignupPage = () => {
  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [isSame, setSame] = useState(true);
  const handleInput = (e) => {
    setFormvalue((previousState) => {
      previousState[e.target.name] = e.target.value;
      return previousState;
    });
    if (e.target.name === "repeat") {
      if (formvalue.repeat !== formvalue.password) {
        setSame(() => {
          return false;
        });
      } else {
        setSame(() => {
          return true;
        });
      }
    }
  };

  const handleform = async (event) => {
    event.preventDefault();
    if (formvalue.repeat !== formvalue.password) {
      window.alert("Your password confirmation is failed.");
      return;
    }
    let x = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formvalue.username,
        email: formvalue.email,
        password: formvalue.password,
      }),
    });
    let y = await x.json();
    console.log(y);
    if (y.status) {
      window.location.href = "/SigninPage";
    } else {
      window.alert("Your account creation is failed: " + y.error);
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
                  SIGN UP
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

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
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
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="repeat"
                        onChange={handleInput}
                        style={{
                          backgroundColor: ` ${isSame ? "White" : "Red"}`,
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <a href="/SigninPage" className="text-primary fw-bold">
                        Sign In
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

export default SignupPage;
