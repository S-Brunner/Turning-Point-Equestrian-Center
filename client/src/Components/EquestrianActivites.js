import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const EquestrianActivites = () => {
    return (
        <>
            <ImgContainer>
                <Image src="/images/riding.png" />
            </ImgContainer>
            <PageName>Equestrian Activites Page</PageName>
            <NavBar />
            <Body>
                <Lessons>
                    <H2>Lessons</H2>
                    <LessPlaceHolder>Place holder for Lessons</LessPlaceHolder>
                </Lessons>
                <TrailRides>
                    <H2>Trail Rides</H2>
                    <TrailPlaceHolder>Place holder for Trail Rides</TrailPlaceHolder>
                </TrailRides>
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
    margin-top: -50%;
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


const Lessons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LessPlaceHolder = styled.div`
    width: 80%;
    height: 40vh;
    border: 2px solid #A9927D;
    color: white;
`;

const TrailRides = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TrailPlaceHolder = styled.div`
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


export default EquestrianActivites;