import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkauth } from "./store/authSlice/authSlice";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkauth());
  }, [dispatch]);
  console.log(isAuthenticated);
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Home />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
