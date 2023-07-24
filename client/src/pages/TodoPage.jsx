import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { Fragment } from "react";

const TodoPage = () => {
  let warning;
  let todos = [];
  if (JSON.parse(localStorage.getItem("loggedin")) !== true) {
    warning = <h1 style={{ textAlign: "center" }}>You didn't sign in</h1>;
  } else {
    let account = JSON.parse(localStorage.getItem("todoaccount"));
    const deletebutton = async (e) => {
      e.preventDefault();
      account.todos.splice(e.target.name, 1);
      let x = await fetch("/updatetodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: account.username,
          password: account.password,
          email: account.email,
          todos: account.todos,
        }),
      });
      let y = await x.json();
      if (y.status) {
        window.localStorage.todoaccount = JSON.stringify(y.data);
        window.localStorage.loggedin = true;
        window.location.reload();
      } else {
        window.alert("Your todo update is failed: " + y.error);
      }
    };
    for (let i = 0; i < account.todos.length; i++) {
      todos[i] = (
        <ListGroup.Item key={i}>
          {account.todos[i]}
          <br />
          <Button
            variant="primary"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            name={i.toString()}
            onClick={deletebutton}
          >
            Delete
          </Button>
        </ListGroup.Item>
      );
    }
    if (account.todos.length === 0) {
      todos[0] = <ListGroup.Item key="0">You have nothing ToDo</ListGroup.Item>;
    }
  }
  let newtodo;
  const newtodochange = (e) => {
    newtodo = e.target.value;
  };
  const addtodo = async (e) => {
    e.preventDefault();
    let account = JSON.parse(localStorage.getItem("todoaccount"));
    account.todos.push(newtodo);
    let x = await fetch("/updatetodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: account.username,
        password: account.password,
        email: account.email,
        todos: account.todos,
      }),
    });
    let y = await x.json();
    if (y.status) {
      window.localStorage.todoaccount = JSON.stringify(y.data);
      window.localStorage.loggedin = true;
      window.location.reload();
    } else {
      window.alert("Your todo update is failed: " + y.error);
    }
  };
  let addbutton;
  if (JSON.parse(localStorage.getItem("loggedin")) === true) {
    addbutton = (
      <Form>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label className="text-center">New ToDo</Form.Label>
          <Form.Control type="text" name="text" onChange={newtodochange} />
        </Form.Group>
        <Button
          variant="primary"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={addtodo}
        >
          Add ToDo
        </Button>
      </Form>
    );
  }
  return (
    <Fragment>
      {warning}
      <Card
        style={{
          width: "18rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <ListGroup variant="flush">{todos}</ListGroup>
        {addbutton}
      </Card>
    </Fragment>
  );
};

export default TodoPage;
