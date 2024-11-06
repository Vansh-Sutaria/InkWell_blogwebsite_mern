// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formErrors, setFormErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "email") setEmail(value);
//     if (name === "password") setPassword(value);
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
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", data);
//         // Save the token to localStorage or context (not shown here)
//         // navigate('/dashboard'); // Redirect to a protected route
//       } else {
//         console.error("Login failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!email) errors.email = "Email is required";
//     if (!password) errors.password = "Password is required";
//     return errors;
//   };

//   const handleRegister = () => {
//     navigate("/signup"); // Redirect to signup page
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit}>
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
//               placeholder="Please Enter Your Password here"
//               value={password}
//               onChange={handleInputChange}
//             />
//             {formErrors.password && (
//               <span className="error">{formErrors.password}</span>
//             )}
//           </div>
//           <button className="login-button" type="submit">
//             Login
//           </button>
//         </form>
//         <div className="links">
//           <a href="/">Forgot Password?</a>
//           <span
//             onClick={handleRegister}
//             style={{ cursor: "pointer", color: "orange" }}
//           >
//             Register Now
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page refresh

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Store JWT token in localStorage
                localStorage.setItem('token', data.token);

                // Redirect to dashboard after successful login
                navigate('/dashboard');
            } else {
                setError(data.message);  // Show error message
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                </form>
                <div className="links">
                    <a href="/">Forgot Password?</a>
                    <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'orange' }}>
                        Register Now
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
