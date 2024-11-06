// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// function SignUpPage() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [formErrors, setFormErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "username") setUsername(value);
//     if (name === "email") setEmail(value);
//     if (name === "password") setPassword(value);
//     if (name === "confirmPassword") setConfirmPassword(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormErrors({});

//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("User registered successfully:", data);
//         navigate("/login"); // Redirect to login page
//       } else {
//         console.error("Registration failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!username) errors.username = "Username is required";
//     if (!email) errors.email = "Email is required";
//     if (!password) errors.password = "Password is required";
//     if (password !== confirmPassword)
//       errors.confirmPassword = "Passwords do not match";
//     return errors;
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-box">
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter Your Username here"
//               value={username}
//               onChange={handleInputChange}
//             />
//             {formErrors.username && (
//               <span className="error">{formErrors.username}</span>
//             )}
//           </div>
//           <div className="input-box">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Your Email here"
//               value={email}
//               onChange={handleInputChange}
//             />
//             {formErrors.email && (
//               <span className="error">{formErrors.email}</span>
//             )}
//           </div>
//           <div className="input-box">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter Your Password here"
//               value={password}
//               onChange={handleInputChange}
//             />
//             {formErrors.password && (
//               <span className="error">{formErrors.password}</span>
//             )}
//           </div>
//           <div className="input-box">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Your Password here"
//               value={confirmPassword}
//               onChange={handleInputChange}
//             />
//             {formErrors.confirmPassword && (
//               <span className="error">{formErrors.confirmPassword}</span>
//             )}
//           </div>
//           <button className="signup-button" type="submit">
//             Sign Up
//           </button>
//         </form>
//         <div className="links">
//           <a href="/login">Already have an account? Log in</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setBackendError(""); // Reset backend error

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        navigate("/login"); // Redirect to login page
      } else {
        setBackendError(data.message || "Registration failed. Try again.");
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setBackendError("An error occurred. Please try again later.");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        {backendError && <div className="error">{backendError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={handleInputChange}
            />
            {formErrors.username && (
              <span className="error">{formErrors.username}</span>
            )}
          </div>
          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
          </div>
          <div className="input-box">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            {formErrors.confirmPassword && (
              <span className="error">{formErrors.confirmPassword}</span>
            )}
          </div>
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="links">
          <a href="/login">Already have an account? Log in</a>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
