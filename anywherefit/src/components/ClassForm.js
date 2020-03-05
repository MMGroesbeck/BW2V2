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
                    {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
                </label>
                <label htmlFor="type">
                    Class Type:
                    <Field id="type" type="text" name="type" placeholder="Class Type"/>
                    {touched.type && errors.type && (<p className="errors">{errors.type}</p>)}
                </label>
                <label htmlFor="date">
                    Class Date:
                    <Field id="date" type="text" name="date" placeholder="MM/DD or MM/DD/YY"/>
                    {touched.date && errors.date && (<p className="errors">{errors.date}</p>)}
                </label>
                <label htmlFor="start">
                    Class Start Time:
                    <Field id="start" type="text" name="start" placeholder="HH:MM (am/pm)"/>
                    {touched.start && errors.start && (<p className="errors">{errors.start}</p>)}
                </label>
                <label htmlFor="duration">
                    Class Duration:
                    <Field id="duration" type="text" name="duration" placeholder="Duration"/>
                    {touched.duration && errors.duration && (<p className="errors">{errors.duration}</p>)}
                </label>
                <label htmlFor="intensity">
                    Class Intensity:
                    <Field id="intensity" type="text" name="intensity" placeholder="Intensity"/>
                    {touched.intensity && errors.intensity && (<p className="errors">{errors.intensity}</p>)}
                </label>
                <label htmlFor="location">
                    Class Location:
                    <Field id="location" type="text" name="location" placeholder="location"/>
                    {touched.location && errors.location && (<p className="errors">{errors.location}</p>)}
                </label>
                <label htmlFor="max">
                    Maximum Enrollment:
                    <Field id="max" type="text" name="max" placeholder="Maximum"/>
                    {touched.max && errors.max && (<p className="errors">{errors.max}</p>)}
                </label>
                <button type="submit">Save</button>
            </Form>
        </ClassDiv>
    );
};

const FormikAddForm = withFormik({
    mapPropsToValues({name, type, date, start, duration, intensity, location, max, instructor, activeUser, classList, setCurrentList, toDashboard, addClass}) {
        return {
            name: name || "",
            type: type || "",
            date: date || "",
            start: start || "",
            duration: duration || "",
            intensity: intensity || "",
            location: location || "",
            max: max || 0,
            instructor: activeUser.name,
            addClass: addClass,
            toDashboard: toDashboard
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a class name."),
        type: Yup.string().required("Please enter a descriptive class type"),
        date: Yup.string().required("Please enter date in MM/DD or MM/DD/YY format."),
        start: Yup.string().required("Please enter start time. e.g. '11:00 am'."),
        duration: Yup.string().required("Please enter duration, e.g. '45min'."),
        intensity: Yup.string().required("Please rate the expected intensity of your class."),
        location: Yup.string().required("Please enter the location of your class."),
        max: Yup.number().moreThan(0, "Please enter the maximum capacity of the class.")
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
            instructor: values.instructor,
            max: values.max,
            registered: 0
        }
        values.addClass(newClass);
        values.toDashboard();
    }
})(AddForm);

export default FormikAddForm;