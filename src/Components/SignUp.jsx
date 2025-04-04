import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const userData = { username: name, email, password };

    try {
      const response = await fetch(
        "https://ai-chat-backend-2.onrender.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Sign Up Successful!");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        setError(data.message || "Sign Up Failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.", error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signIn-form">
        <h2>Sign Up Form</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
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
          Sign Up
        </button>
        <p className="signup-textLine">Already have an account? <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>Login here</span></p>

      </form>
      
      
    </div>

    
  );
};
export default SignUp;
