// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Form.css";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Name:", name);
//     console.log("Email:", email);
//     console.log("Password:", password);

//     alert("Sign In Successful!");

//     setName("");
//     setEmail("");
//     setPassword("");

//     navigate("/login");
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit} className="signIn-form">
//         <h2>Sign Up Form</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="input"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="input"
//         />
//         <button type="submit" className="button">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;






import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    const userData = { username: name, email, password }; 

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;







