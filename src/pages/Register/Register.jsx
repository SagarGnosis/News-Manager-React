import { useState } from "react";
import "./register.css";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    role: "Editor",
  });
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateEmail(inputs.email)) {
      setErr("Invalid email format");
      return;
    }
    if (!validatePassword(inputs.password)) {
      setErr("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/auth/register`, inputs, { withCredentials: true });
      setSuccess(true);
    } catch (err) {
      alert(err.response.data);
    }
    setInputs({
      username: "",
      email: "",
      password: "",
      name: "",
      role: "Editor",
    });
    setErr(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Delhi University News.</h1>
          <p>
          MY DU News App is likely a mobile application designed to provide students, faculty, and the general public with the latest news, updates, and information related to the University of Delhi.
          </p>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
              <span onClick={toggleShowPassword} className="eye-icon">
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
            />
            <select name="role" onChange={handleChange} value={inputs.role}>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
            {err && <div className="error">{err}</div>}
            <button onClick={handleClick}>Register</button>
            {success && <div className="success-popup">Registration successful!</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

