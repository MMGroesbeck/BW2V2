import React from 'react';
import styled from "styled-components";

const CardDiv = styled.div `
    width: 75%;
    margin: 10%;
    padding: 5%;
    display: flex;
    border: 1px solid red;
    flex-flow: column nowrap;
    align-items: center;
`

const ClassCard = ({activeClass, withdraw, enroll, deleteClass}) => {
    return (
        <CardDiv>
            <h3>{activeClass.name}</h3>
            <p>Instructor: {activeClass.instructor}</p>
            <p>Type: {activeClass.type}</p>
            <p>Date: {activeClass.date}</p>
            <p>Time: {activeClass.start}</p>
            <p>Duration: {activeClass.duration}</p>
            <p>Intensity: {activeClass.intensity}</p>
            <p>Location: {activeClass.location}</p>
            <p>Enrolled: {activeClass.registered}/{activeClass.max}</p>
            {enroll && <button onClick={enroll(activeClass.id)}>Enroll</button>}
            {withdraw && <button onClick={withdraw(activeClass.id)}>Withdraw</button>}
            {deleteClass && <button onClick={deleteClass(activeClass.id)}>Delete Class</button>}
        </CardDiv>
    )
}

export default ClassCard;