import React from 'react';
import { Route, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";
import styled from "styled-components";

const LogRegDiv = styled.div `
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`

const LogReg = () => {
    return (
        <LogRegDiv>
            <h1>Anywhere Fitness Login</h1>
            <Route exact path="/login"><div><LoginForm /></div><div>First time? <Link to="login/register">Register</Link> instead.</div></Route>
            <Route exact path="/login/register"><div><RegForm /></div><div>Already registered? <Link to="/login">Log in</Link> instead.</div></Route>
        </LogRegDiv>
    );
}

export default LogReg;