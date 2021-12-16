import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const Partnership = () => {
    return (
    <>
            <ImgContainer>
                <Image src="/images/partnership.png" />
            </ImgContainer>
            <PageName>Partnership Page</PageName>
            <NavBar />
            <Body>
                <Form>
                    <H2>Sponsor A Client</H2>
                    <PlaceHolderForm>Form to fill out</PlaceHolderForm>
                </Form>
                <DonateLink>
                    <H2>Donate</H2>
                    <P>Donate link through CanadaHelps</P>
                </DonateLink>
            </Body>
        </>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    margin-top: -24%;
    margin-bottom: -1px;
`;

const Image = styled.img`
    width: 100%;
    margin-top: 3%;
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


const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PlaceHolderForm = styled.div`
    width: 80%;
    height: 40vh;
    border: 2px solid #A9927D;
    color: white;
`;

const DonateLink = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const P = styled.p`
    width: 80%;
    height: 40vh;
    border: 2px solid #A9927D;
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

export default Partnership;