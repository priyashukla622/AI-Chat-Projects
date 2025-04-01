import React, { useState } from "react";
import "./Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login Successful!");

    setEmail("");        
    setPassword("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="logIn-form">
        <h2>LogIn Form</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
