import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div `
    background-color: black;
    color: white;
    width: 100%;
    position: sticky;
    border-bottom: 2px solid red;
`;

const Header = () => {
    return (
        <HeaderDiv>
            Anywhere Fitness
        </HeaderDiv>
    )
}

export default Header;