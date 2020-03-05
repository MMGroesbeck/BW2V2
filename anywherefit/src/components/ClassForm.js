import React, { useState, useEffect } from "react";
import { Route, useHistory } from 'react-router-dom';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const ClassDiv = styled.div `
    width: 75%;
    margin: 10%;
    padding: 5%;
    display: flex;
    border: 1px solid red;
    flex-flow: column nowrap;
    align-items: center;
`

const AddForm = ({values, touched, errors, status, activeUser, addClass, toDashboard}) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    useEffect (() => {
        status && setUser(user => status);
    },[status])
    return(
        <ClassDiv>
            <h2>Add a New Class</h2>
            <button onClick={() => history.push("/dashboard")}>Cancel</button>
            <Form className="search-form">
                <p>Search by any or all:</p>
                <label htmlFor="name">
                    Class Name:
                    <Field id="name" type="text" name="name" placeholder="Class Name"/>
                </label>
                <label htmlFor="type">
                    Class Type:
                    <Field id="type" type="text" name="type" placeholder="Class Type"/>
                </label>
                <label htmlFor="date">
                    Class Date:
                    <Field id="date" type="text" name="date" placeholder="MM/DD or MM/DD/YY"/>
                </label>
                <label htmlFor="start">
                    Class Start Time:
                    <Field id="start" type="text" name="start" placeholder="HH:MM (am/pm)"/>
                </label>
                <label htmlFor="duration">
                    Class Duration:
                    <Field id="duration" type="text" name="duration" placeholder="Duration"/>
                </label>
                <label htmlFor="intensity">
                    Class Intensity:
                    <Field id="intensity" type="text" name="intensity" placeholder="Intensity"/>
                </label>
                <label htmlFor="location">
                    Class Location:
                    <Field id="location" type="text" name="location" placeholder="location"/>
                </label>
                <button type="submit">Save</button>
            </Form>
        </ClassDiv>
    );
};

const FormikAddForm = withFormik({
    mapPropsToValues({name, type, date, start, duration, intensity, location, instructor, activeUser, classList, setCurrentList, toDashboard, addClass}) {
        return {
            name: name || "",
            type: type || "",
            date: date || "",
            start: start || "",
            duration: duration || "",
            intensity: intensity || "",
            location: location || "",
            instructor: activeUser.name,
            addClass: addClass,
            toDashboard: toDashboard
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a class name.")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        const newClass = {
            name: values.name,
            type: values.type,
            date: values.date,
            start: values.start,
            duration: values.duration,
            intensity: values.intensity,
            location: values.location,
            instructor: values.instructor
        }
        values.addClass(newClass);
        values.toDashboard();
    }
})(AddForm);

export default FormikAddForm;