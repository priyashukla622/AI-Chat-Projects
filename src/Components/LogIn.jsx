import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("https://ai-chat-backend-2.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email); 
          alert("Login Successful!");
          navigate("/dashboard"); 
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="logIn-form">
        <h2>Log In Form</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <div className="password-container"> 
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input password-input"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
