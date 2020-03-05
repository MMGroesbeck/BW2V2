import React, { useState, useEffect } from "react";
import { Route, useHistory } from 'react-router-dom';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const SearchDiv = styled.div `
    width: 75%;
    margin: 10%;
    padding: 5%;
    display: flex;
    border: 1px solid red;
    flex-flow: column nowrap;
    align-items: center;
`

const SearchForm = ({values, touched, errors, status, activeUser, classList, setCurrentList}) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    useEffect (() => {
        status && setUser(user => status);
    },[status])
    return(
        <SearchDiv>
            <h2>Search For Classes</h2>
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
                <button type="submit">Search</button>
            </Form>
        </SearchDiv>
    );
};

const FormikSearchForm = withFormik({
    mapPropsToValues({name, type, date, start, duration, intensity, location, instructor, activeUser, classList, setCurrentList, toResults}) {
        return {
            name: name || "",
            type: type || "",
            date: date || "",
            start: start || "",
            duration: duration || "",
            intensity: intensity || "",
            location: location || "",
            instructor: instructor || "",
            classList: classList,
            toResults: toResults,
            setCurrentList: setCurrentList
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(0, "This shouldn't happen")
    }),
    handleSubmit(values, {setStatus, resetForm}){
        const myList = values.classList.filter((item) => 
            (item.name.toLowerCase().includes(values.name.toLowerCase())) &&
            (item.type.toLowerCase().includes(values.type.toLowerCase())) &&
            (item.date.toLowerCase().includes(values.date.toLowerCase())) &&
            (item.start.toLowerCase().includes(values.start.toLowerCase())) &&
            (item.duration.toLowerCase().includes(values.duration.toLowerCase())) &&
            (item.intensity.toLowerCase().includes(values.intensity.toLowerCase())) &&
            (item.location.toLowerCase().includes(values.location.toLowerCase())) &&
            (item.instructor.toLowerCase().includes(values.instructor.toLowerCase()))
        );
        values.setCurrentList(myList);
        values.toResults();
    }
})(SearchForm);

export default FormikSearchForm;