import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import styled from "styled-components";
import axios from "axios";
import * as Yup from "yup";

const RegFormBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const RegForm = ({ values, touched, errors, status, activeUser, loginUser, addUser }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    status && setUser(user => status);
    console.log(user);
  }, [status]);
  return (
    <div className="reg-form-box">
      <Form className="reg-form">
        <RegFormBox>
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
          <label htmlFor="passwordB">
            Re-enter Password:
            <Field
              id="passwordB"
              type="password"
              name="passwordB"
              placeholder="Password"
            />
            {touched.passwordB && errors.passwordB && (
              <p className="errors">{errors.passwordB}</p>
            )}
          </label>
          <label htmlFor="role">
            User or Instructor?
            <Field as="select" className="role-select" name="role">
              <option role="nochoice">Choose a Role</option>
              <option role="user">User</option>
              <option role="instructor">Instructor</option>
            </Field>
            {touched.role && errors.role && (
              <p className="errors">{errors.role}</p>
            )}
          </label>
          <label htmlFor="validation">
            Validation code (if instructor):
            <Field
              id="validation"
              type="text"
              name="validation"
              placeholder="Validation Code"
            />
          </label>
          <button type="submit">Submit</button>
        </RegFormBox>
      </Form>
    </div>
  );
};

const FormikRegForm = withFormik({
  mapPropsToValues({ name, password, passwordB, role, activeUser, loginUser, addUser }) {
    return {
      name: name || "",
      password: password || "",
      passwordB: passwordB || "",
      role: role || "nochoice",
      loginUser: loginUser,
      addUser: addUser
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Please enter a longer name.")
      .required("Please enter a name."),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters.")
      .required("Please enter a password."),
    passwordB: Yup.string()
      .required("Please re-enter password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    role: Yup.mixed().notOneOf(["nochoice"], "Please choose a role.")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
      console.log("handleSubmit called with: ", values)
    const myUser = {name: values.name, password: values.password, instructor:(values.role==="instructor"), enrolled: []};
    console.log("myUser: ", myUser);
    values.addUser(myUser);
    values.loginUser(myUser);
  }
})(RegForm);

export default FormikRegForm;
