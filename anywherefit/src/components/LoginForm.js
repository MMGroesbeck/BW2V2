import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import styled from "styled-components";
import * as Yup from "yup";

const LoginFormBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const LoginForm = ({ values, touched, errors, status }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    status && setUser(user => status);
    console.log(user);
  }, [status]);
  return (
    <div>
      <Form className="login-form">
        <LoginFormBox>
          <label htmlFor="name">
            User Name:
            <Field id="name" type="text" name="name" placeholder="User Name" />
            {touched.name && errors.name && (
              <p className="errors">{errors.name}</p>
            )}
          </label>
          <label htmlFor="password">
            Password:
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
            {touched.password && errors.password && (
              <p className="errors">{errors.password}</p>
            )}
          </label>
          <button type="submit">Submit</button>
        </LoginFormBox>
      </Form>
    </div>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, password }) {
    return {
      name: name || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Please enter a longer name.")
      .required("Please enter a name."),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters.")
      .required("Please enter a password.")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/login", values)
      .then(response => {
        setStatus(response.data);
        resetForm();
        //React 2: will save token and redirect to "/dashboard".
      })
      .catch(err => {
        console.log(err);
      });
  }
})(LoginForm);

export default FormikLoginForm;
