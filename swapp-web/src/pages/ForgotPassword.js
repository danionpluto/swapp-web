import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ForgotPassword.css";
import InputField from "../components/InputField.js";

function ForgotPassword() {
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const forgotSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .matches(/.+@.+\.edu$/, "Must be a .edu email")
      .required("Email is required"),
  });

  const handleSubmit = async (values, formikHelpers) => {
    console.log(values);
    try {
      await sendPasswordResetEmail(auth, values.email);
      navigate("/"); //redirect to homepage
    } catch (err) {
      return <p>{formikHelpers.ErrorMessage}</p>;
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot your password?</h2>
      <p>We’ll send you a link via email.</p>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={forgotSchema}
      >
        <Form noValidate={true} className="input-fields-container">
          <div className="firstname-lastname-container">
            <div>
              <InputField
                id="firstName"
                name="firstName"
                placeholder="First Name"
              />{" "}
              <ErrorMessage name="firstName" className="error" component="p" />{" "}
            </div>
            <div>
              <InputField
                id="lastName"
                name="lastName"
                placeholder="Last Name"
              />
              <ErrorMessage name="lastName" className="error" component="p" />
            </div>
          </div>

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

          <button type="submit" className="forgot-button">
            Next
          </button>

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
      </Formik>
    </div>
  );
}

export default ForgotPassword;
