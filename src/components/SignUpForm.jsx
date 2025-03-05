import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidEmail = (email) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i.test(email);
  const isValidPassword = (password) =>
    /^(?!.*\s)(?=.*[A-Z])(?=.*\d).{6,18}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const email = formData.email.trim().toLowerCase();
    const { password, repeatPassword } = formData;

    if (!email) newErrors.email = "Can't be empty";
    else if (!isValidEmail(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Can't be empty";
    else if (!isValidPassword(password))
      newErrors.password = "Capital letter, number, 6 characters";

    if (password !== repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("Submitting form...");

      const response = await axios.get("http://localhost:5001/users");
      const users = response.data;
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        setErrors({ email: "Email is already registered" });
        return;
      }

      // Add the new user to the database
      await axios.post("http://localhost:5001/users", {
        email,
        password,
        role: "user",
      });

      toast.success("Your account is created successfully!", {
        position: "top-center",
        autoClose: 10000,
        style: {
          background: "#161D2F",
          color: "#FFFFFF",
        },
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Error signing up:", err);
      setErrors({ general: "Error signing up. Please try again later." });
    }
  };
  return (
    <div className="signup--main--container">
      <ToastContainer />
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
        <h2 className="signup--heading--text text-[1.75rem]">Sign Up</h2>

        <div>
          <div className="relative mb-[0.5rem]">
            <input
              autoComplete="off"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`signup--input text-body-m ${
                errors.email ? "border-red" : "border-accent"
              } placeholder:pl-[1rem] placeholder:pb-[1.06rem] placeholder:body-m placeholder:opacity-50 placeholder:text-white`}
              placeholder="Email Address"
            />
            {errors.email && (
              <span
                className={`text-red text-sm whitespace-nowrap flex-shrink-0 ${
                  formData.email.length > 17
                    ? "absolute bottom-[-6px] right-[6px] text-right"
                    : "absolute top-3 right-2"
                }`}
              >
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="relative mb-[0.5rem] ">
          <input
            type="password"
            name="password"
            value={formData.password}
            maxLength={40}
            onChange={handleChange}
            className={`signup--input text-body-m ${
              errors.password ? "border-red" : "border-accent"
            } placeholder:pl-[1rem] placeholder:pb-[1.06rem] placeholder:body-m placeholder:opacity-50 placeholder:text-white`}
            placeholder="Password"
          />
          {errors.password && (
            <span
              className={`text-red text-sm whitespace-nowrap flex-shrink-0 ${
                formData.password.length > 10
                  ? "absolute bottom-[-6px] right-[6px] text-right"
                  : "absolute top-3 right-2"
              }`}
            >
              {formData.password.length === 0
                ? "Can't be empty"
                : formData.password.length < 6
                ? "Password must be at least 6 characters"
                : errors.password}
            </span>
          )}
        </div>

        <div className="relative mb-[0.5rem]">
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            maxLength={40}
            onChange={handleChange}
            className={`signup--input text-body-m${
              errors.repeatPassword ? "border-red" : "border-accent"
            } placeholder:pl-[1rem] placeholder:pb-[1.06rem] placeholder:body-m placeholder:opacity-50 placeholder:text-white`}
            placeholder="Repeat Password"
          />
          {errors.repeatPassword && (
            <span
              className={`signup--error text-[0.85rem] leading-[1.5rem] text-red-500 ${
                formData.repeatPassword.length > 13
                  ? "translate-y-[1.5rem] absolute bottom-[-4px] right-[4px]"
                  : "absolute top-2 right-2"
              }`}
            >
              {formData.repeatPassword.length === 0
                ? "Can't be empty"
                : formData.repeatPassword.length < 6
                ? "Password must be at least 6 characters"
                : errors.repeatPassword}
            </span>
          )}
        </div>

        <button type="submit" className="login--button">
          Create an account
        </button>

        <p className="text-center text-white text-[0.90rem] font-light mt-[0.5rem] mb-[0rem] font-outfit">
          Already have an account?
          <a
            href="/login"
            className="text-red hover:underline ml-[0.35rem] text-[0.85rem] font-light]"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
