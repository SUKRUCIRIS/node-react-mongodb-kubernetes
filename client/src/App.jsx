import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";
import NavBar from "./NavBar";
import UpdateAccPage from "./pages/UpdateAccPage";

function App() {
  return (
    <Fragment>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/SigninPage" element={<SigninPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/TodoPage" element={<TodoPage />} />
          <Route path="/UpdateAccPage" element={<UpdateAccPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
