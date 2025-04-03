import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = { email, password };
  try {
      const response = await fetch("https://ai-chat-backend-2.onrender.com/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email || "");  
          
          // 🔥 Custom event dispatch karo
          window.dispatchEvent(new Event("emailUpdated"));

          alert("Login Successful!");
          navigate("/dashboard"); 
      } else {
          alert(data.message || "Login Failed");
      }
  } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong. Please check the console.");
  }
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
