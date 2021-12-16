import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const NoAccess = () => {
    return (
        <>
            <ImgContainer />
            <NavBar />
            <Body>
                <p>You Don't Access Here</p>
            </Body>
        </>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    background: rgb(75, 28, 11);
    height: 90vh;
    margin-top: -23%;
`;

const Body = styled.div`
    background: rgb(7, 49, 92);
    z-index: -1;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`;

export default NoAccess;