import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import InputField from "../components/InputField.js";

function ForgotPassword() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .matches(/.+@.+\.edu$/, "Must be a .edu email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, formikHelpers) => {
    console.log(values);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/"); //redirect to homepage
    } catch (err) {
      return <p>{formikHelpers.ErrorMessage}</p>;
    }
  };

  return (
    <div className="signup-container">
      <h2>Forgot your password?</h2>
      <p>We’ll send you a link via email.</p>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          showPassword: true,
        }}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          setFieldValue,
          errors,
          touched,
        }) => (
          <div>
            <Form noValidate={true} className="input-fields-container">
              <div className="firstname-lastname-container">
                <div>
                  <InputField
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                  />{" "}
                  <ErrorMessage
                    name="firstname"
                    className="error"
                    component="p"
                  />{" "}
                </div>
                <div>
                  <InputField
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastname"
                    className="error"
                    component="p"
                  />
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

              <button
                type="submit"
                className="signup-button"
                onClick={handleSubmit}
              >
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
          </div>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
