import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const HomePage = () => {

    return (
        <>
            <ImgContainer>
                <Image src="/images/background.png" alt="homepage background"/>
            </ImgContainer>
            <PageName>Home Page</PageName>
            <NavBar />
            <Body>
                <HEADER>
                    <H2>News and Events</H2>
                </HEADER>
                <Main>
                    <Content src="/images/news.png" alt="interiror of the arena"/>
                    <P>It’s been a busy few weeks at the horse arena. Ceiling and lights are up and it’s looking amazing. Next week the heating units go in! We are ready for this building to be a blessing to our community.</P>
                </Main>
            </Body>
        </>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    max-height: 90vh;
    margin-top: -9%;
`;

const PageName = styled.h2`
    position: absolute;
    width: 100%;
    top: 65%;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 40px;

    @media (max-width : 320px ) {
        font-size: 20px;
        top: 35%;
    }
`;

const Image = styled.img`
    width: 100%;
    margin-top: -12%;
    margin-bottom: -14px;

    @media (max-width : 320px ) {
        margin-top: -45%;
        margin-bottom: 26px;
        margin-left: -50%;
        width: 150%;
    }
`;

const Body = styled.div`
    background: rgb(7, 49, 92);
    z-index: -1;
    height: fit-content;
`;

const Content = styled.img`

    @media (max-width : 320px ) {
        width: 50%;
    }
`;

const HEADER = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Main = styled.div`
    display: flex;
    margin-bottom: -10px;
    padding-bottom: 50px;
    justify-content: center;

    @media (max-width : 320px ) {
        width: 100%;
        height: fit-content;
    }
`;

const P = styled.p`
    color: #F2F4F3;
    width: 35%;
    font-size: 25px;
    margin-left: 20px;

    @media (max-width : 320px ) {
        font-size: 12px;
        top: 35%;
    }
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


export default HomePage;