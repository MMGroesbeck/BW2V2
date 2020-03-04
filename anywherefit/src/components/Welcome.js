import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkDiv = styled.div`
  padding: 2%;
  margin: 2% 5%;
`;

const Welcome = () => {
  return (
    <div>
      <h2>Welcome to Anywhere Fitness</h2>
      <h3>Please click below to get started:</h3>
      <LinkDiv>
        <Link to="/login">Log In or Register</Link>
      </LinkDiv>
    </div>
  );
};

export default Welcome;
