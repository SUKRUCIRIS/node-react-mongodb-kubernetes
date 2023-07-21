import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const UpdateAccPage = () => {
  const [formvalue, setFormvalue] = useState({
    username: JSON.parse(localStorage.getItem("todoaccount")).username,
    password: JSON.parse(localStorage.getItem("todoaccount")).password,
    email: JSON.parse(localStorage.getItem("todoaccount")).email,
  });
  const handleInput = (e) => {
    setFormvalue((previousState) => {
      previousState[e.target.name] = e.target.value;
      return previousState;
    });
  };
  const handleform = async (event) => {
    event.preventDefault();
    let x = await fetch("/updateacc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formvalue.username,
        password: formvalue.password,
        email: formvalue.email,
      }),
    });
    let y = await x.json();
    if (y.status) {
      window.localStorage.todoaccount = JSON.stringify(y.data);
      window.localStorage.loggedin = true;
      window.location.reload();
    } else {
      window.alert("Your account update is failed: " + y.error);
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
                  UPDATE ACCOUNT INFORMATION
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleform}>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label className="text-center">Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        defaultValue={
                          JSON.parse(localStorage.getItem("todoaccount"))
                            .username
                        }
                        onChange={handleInput}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Password"
                        name="password"
                        defaultValue={
                          JSON.parse(localStorage.getItem("todoaccount"))
                            .password
                        }
                        onChange={handleInput}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label className="text-center">Email</Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          JSON.parse(localStorage.getItem("todoaccount")).email
                        }
                        name="email"
                        readonly
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Update
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateAccPage;
