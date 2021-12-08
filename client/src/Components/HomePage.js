import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const HomePage = () => {
    return (
        <>
            <ImgContainer>
                <Image src="/images/background.jfif" alt="homepage background"/>
            </ImgContainer>
            <PageName>Home Page</PageName>
            <NavBar />
            <Body>
                <HEADER>
                    <H2>News and Events</H2>
                </HEADER>
                <Main>
                    <img src="/images/news.png" alt="interiror of the arena"/>
                    <P>It’s been a busy few weeks at the horse arena. Ceiling and lights are up and it’s looking amazing. Next week the heating units go in! We are ready for this building to be a blessing to our community.</P>
                </Main>
            </Body>
        </>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    max-height: 89vh;
    overflow: hidden;
    margin-top: -23%;
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

const Image = styled.img`
    width: 100%;
    margin-top: -12%;
`;

const Body = styled.div`
    background: linear-gradient(252deg, rgba(8,91,27,1) 22%, rgba(34,18,1,1) 57%);
    z-index: -1;
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
`;

const P = styled.p`
    color: #F2F4F3;
    width: 35%;
    font-size: 25px;
    margin-left: 20px;
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