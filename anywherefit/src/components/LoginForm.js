import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginForm = ({values, touched, errors, status}) => {
    const [user, setUser] = useState({});
    useEffect (() => {
        status && setUser(user => status);
        console.log(user);
    },[status])
  return (
    <div className="login-form-box">
      <Form className="login-form">
        <label htmlFor="name">
          User Name:
          <Field id="name" type="text" name="name" placeholder="User Name" />
          {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
        </label>
        <label htmlFor="password">
          Password:
          <Field id="password" type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
        </label>
        <label htmlFor="role">
            User or Instructor?
            <Field as="select" className="role-select" name="role">
                <option role="nochoice">Choose a Role</option>
                <option role="user">User</option>
                <option role="instructor">Instructor</option>
            </Field>
            {touched.role && errors.role && (<p className="errors">{errors.role}</p>)}
        </label>
        <Label htmlFor="validation">
            {(status.role == "instructor") && (
                <p>
                    Please enter instructor validation code:
                    <Field id="validation" type="text" name="validation" placeholder="Validation Code" />
                </p>
            )}
        </Label>
        <button type="submit">Submit</button>
      </Form>
      {user.id && <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>ToS accepted? {user.tos.toString()}</li>
      </ul>}
    </div>
  );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, password, role}) {
        return {
            name: name || "",
            password: password || "",
            role: role || "nochoice",
            validation: validation || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, "Please enter a longer name.").required("Please enter a name."),
        password: Yup.string().min(4, "Password must be at least 4 characters.").required("Please enter a password."),
        role: Yup.mixed().notOneOf(["nochoice"], "Please choose a role.")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        axios.post("https://reqres.in/api/users/", values)
        .then( response => {
            setStatus(response.data);
            resetForm();
        })
    }
})(UserForm);

export default FormikUserForm;