import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LogIn.css";
import "./SignUp.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputField from "../components/InputField.js";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, formikHelpers) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("signed in");
      navigate("/"); //redirects to homepage
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Hey there, it’s great to see you again!</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
          showPassword: true,
        }}
        onSubmit={handleLogin}
        validationSchema={loginSchema}
      >
        {({ values, handleSubmit, setFieldValue, errors, touched }) => (
          <div>
            <Form noValidate={true} className="input-fields-container">
              <div>
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  placeholder=".edu Email"
                  iconName="mail"
                />
                <ErrorMessage name="email" className="error" component="p" />
              </div>

              <div>
                <InputField
                  type={values.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  iconName="lock"
                  trailing={[
                    <button
                      type="button"
                      id="toggle-password"
                      onClick={() =>
                        setFieldValue("showPassword", !values.showPassword)
                      }
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>,
                  ]}
                />
                <ErrorMessage name="password" className="error" component="p" />
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
              <Link
                style={{
                  fontWeight: "bolder",
                  fontSize: "large",
                  margin: "1rem",
                  color: "black",
                }}
                to="/ForgotPassword"
              >
                Forgot your password
              </Link>
              <p id="terms">
                By continuing, you agree to the{" "}
                <a href="https://maketheswapp.wixsite.com/swapp/privacy">
                  Terms of Use
                </a>{" "}
                and the{" "}
                <a href="https://maketheswapp.wixsite.com/swapp/privacy">
                  Privacy Policy
                </a>
                .
              </p>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
