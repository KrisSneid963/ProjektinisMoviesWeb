import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const LoginForm = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const allowedRoles = ["user", "admin"];

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = "Can't be empty";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    const isValidPassword = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,50}$/;
      return passwordRegex.test(password);
    };

    if (!password) {
      newErrors.password = "Can't be empty";
      isValid = false;
    } else if (!isValidPassword(password)) {
      newErrors.password = "Invalid password";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      // Fetching users with axios
      const response = await axios.get("http://localhost:5001/users");

      const users = response.data;

      // Check if the email exists
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        setErrors({ email: "This email is not registered" });
        return;
      }

      // Check if the password matches
      if (user.password !== password) {
        setErrors({ password: "Invalid password" });
        return;
      }

      // Redirect based on user role
      if (allowedRoles.includes(user.role)) {
        setRole(user.role);
        sessionStorage.setItem("currentRole", JSON.stringify(user.role));
        navigate("/home");
      } else {
        console.warn("Unrecognized role:", user.role);
      }

    } catch (err) {
      console.error("Error during login:", err);
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="signup--main--container">
      <div className="signup--icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="26.5"
          viewBox="0 0 33 27"
          className="h-[1.6rem] w-[2rem]"
        >
          <path
            d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
            fill="#FC4747"
          />
        </svg>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="signup--form--container"
      >
        <h2 className="signup--heading--text text-white text-[1.75rem]">
          Login
        </h2>

        <div className="relative block text-accent font-light text-[0.875rem] mb-[0.5rem]">
          <input
            autoComplete="off"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`signup--input text-body-m ${
              errors.email ? "border-red" : "border-accent"
            } placeholder:pl-[1rem] placeholder:pb-[1.06rem] placeholder:opacity-50 placeholder:text-white`}
            placeholder="Email Address"
          />
          {errors.email && (
            <span
              className={`login--error ${
                email.length > 17
                  ? "absolute bottom-[-5px] right-[6px] text-right"
                  : "absolute top-3 right-2"
              }`}
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="relative block text-accent font-light text-[0.875rem] mb-[0.5rem]">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              const { value } = e.target;
              if (value.length <= 60) {
                handleChange(e);
              }
            }}
            className={`signup--input text-body-m ${
              errors.password ? "border-red" : "border-accent"
            } placeholder:pl-[1rem] placeholder:pb-[1.06rem] placeholder:opacity-50 placeholder:text-white`}
            placeholder="Password"
          />
          {errors.password && (
            <span
              className={`login--error ${
                password.length > 19
                  ? "absolute bottom-[-4px] right-[8px] text-right"
                  : "absolute top-3 right-2"
              }`}
            >
              {password.length === 0
                ? "Can't be empty"
                : password.length < 6
                ? " Invalid password"
                : password.length > 40
                ? "Invalid password"
                : errors.password}
            </span>
          )}
        </div>

        <button type="submit" className="login--button">
          Login to your account
        </button>
        <p className="signup--login-text text-center text-white text-sm mt-[0.5rem] font-light">
          Don’t have an account?
          <a href="/" className="signup--link">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
