import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import WeightHistory from "./components/WeightHistory";
import axios from "axios";
import styled from "styled-components";

const AppContainer = styled.div`
  background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  padding: 20px;
  text-align: center;
`;

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setSignedIn(true);
    } catch (error) {
      setError("Error while signing in. Please check your credentials.");
    }
  };

  const signUp = async (email, password) => {
    try {
      await axios.post("http://localhost:4000/sign_up", {
        email,
        password,
      });
      setError("Sign up successful! Please sign in to continue.");
    } catch (error) {
      setError("Error while signing up. Please try again.");
    }
  };

  return (
    <Router>
      <AppContainer darkMode={darkMode}>
        <h1>Weight Tracker</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark/Light Mode
        </button>
        {error && <p>{error}</p>}
        {signedIn ? (
          <WeightHistory />
        ) : (
          <Routes>
            <Route path="/" element={<SignIn signIn={signIn} />} />
            <Route path="/signup" element={<SignUp signUp={signUp} />} />
          </Routes>
        )}
      </AppContainer>
    </Router>
  );
};

export default App;
