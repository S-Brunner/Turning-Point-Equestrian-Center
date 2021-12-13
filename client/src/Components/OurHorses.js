import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const OurHorses = () => {
    return (
        <>
            <ImgContainer>
                <Image src="/images/horses.png" />
            </ImgContainer>
            <PageName>Meet Our Horses</PageName>
            <NavBar />
            <Body>
                <Horses>
                    <H2>Horses</H2>
                    <HorsesPlaceHolder>Will fetch to mongo to get the horses info</HorsesPlaceHolder>
                </Horses>
            </Body>
        </>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    margin-top: -23%;
`;

const Image = styled.img`
    width: 100%;
    margin-top: -30%;
`;

const PageName = styled.h2`
    position: absolute;
    width: 100%;
    top: 65%;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 40px;
`;


const Body = styled.div`
    background: rgb(7, 49, 92);
    height: fit-content;
    z-index: -1;
`;


const Horses = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HorsesPlaceHolder = styled.div`
    width: 80%;
    height: 40vh;
    border: 2px solid #A9927D;
    color: white;
`;

const H2 = styled.h2`
    margin-top: 10px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 5px solid #A9927D;
    border-radius: 5px;
    text-align: center;
    width: 50%;
`;    
export default OurHorses;