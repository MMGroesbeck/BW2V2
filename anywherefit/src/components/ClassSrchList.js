import React from 'react';
import { useHistory } from 'react-router-dom';
import ClassCard from './ClassCard';
import styled from "styled-components";

const ResultsDiv = styled.div `
    width: 75%;
    margin: 10%;
    padding: 5%;
    display: flex;
    border: 1px solid red;
    flex-flow: column nowrap;
    align-items: center;
    `

const ClassSrchList = ({activeUser, classList}) => {
    const history = useHistory();
    return(
        <ResultsDiv>
            <h2>Search Results:</h2>
            <button onClick={() => history.push("/dashboard")}>Cancel</button>
        </ResultsDiv>
    )
}

export default ClassSrchList;