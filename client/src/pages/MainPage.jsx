import { Fragment } from "react";

export const MainPage = () => {
  let welcome;
  if (JSON.parse(localStorage.getItem("loggedin")) === true) {
    let account = JSON.parse(localStorage.getItem("todoaccount"));
    welcome = (
      <h1 style={{ textAlign: "center" }}>Welcome {account.username}</h1>
    );
  } else {
    welcome = <h1 style={{ textAlign: "center" }}>You didn't sign in</h1>;
  }
  return (
    <Fragment>
      {welcome}
      <h2 style={{ textAlign: "center" }}>Welcome to ToDoApp</h2>
    </Fragment>
  );
};

export default MainPage;
