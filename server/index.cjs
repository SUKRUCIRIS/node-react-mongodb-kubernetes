const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/tododb");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  todos: [{ type: String }],
});

const user = mongoose.model("User", userSchema);

user
  .findOne({
    username: "admin",
    email: "sukruciris2000@gmail.com",
    password: "admin",
    todos: ["admin"],
  })
  .then((User) => {
    if (!User) {
      user.create({
        username: "admin",
        email: "sukruciris2000@gmail.com",
        password: "admin",
        todos: ["admin"],
      });
      console.log("Admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 8080;
const HOST = "0.0.0.0";

app.get("/healthcheck", (req, res) => {
  res.send({ status: "ALL GOOD" });
});

app.get("/authors", (req, res) => {
  res.send({ author: "SUKRU CIRIS" });
});

app.get("/", (req, res) => {
  res.send({ status: "main" });
});

app.listen(PORT, HOST, () => {
  console.log("Server started at http://localhost:" + PORT);
});

app.post("/signin", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  user
    .findOne({ username: username, password: password })
    .then((data) => {
      if (data) {
        res.send({ data: data, status: true, error: null });
      } else {
        res.send({ data: null, status: false, error: null });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ data: null, status: false, error: err.toString() });
    });
});

app.post("/signup", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  user
    .create({
      username: username,
      password: password,
      email: email,
      todos: [],
    })
    .then((result) => {
      console.log("New user added: " + result.toString());
      res.send({ data: result, status: true, error: null });
    })
    .catch((err) => {
      console.log(err);
      res.send({ data: null, status: false, error: err.toString() });
    });
});

app.post("/updatetodo", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let todos = req.body.todos;
  user
    .findOneAndUpdate(
      {
        username: username,
        password: password,
        email: email,
      },
      { todos: todos }
    )
    .then((result) => {
      console.log("User todo updated: " + result.toString());
      res.send({ data: result, status: true, error: null });
    })
    .catch((err) => {
      console.log(err);
      res.send({ data: null, status: false, error: err.toString() });
    });
});

app.post("/updateacc", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  user
    .findOneAndUpdate(
      {
        email: email,
      },
      {
        username: username,
        password: password,
      },
      { new: true }
    )
    .then((result) => {
      console.log("User account updated: " + result.toString());
      res.send({ data: result, status: true, error: null });
    })
    .catch((err) => {
      console.log(err);
      res.send({ data: null, status: false, error: err.toString() });
    });
});
