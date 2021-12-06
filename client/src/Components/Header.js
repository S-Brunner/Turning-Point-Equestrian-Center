import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoLogoFacebook } from "react-icons/io"
import { BsInstagram } from "react-icons/bs"
import { GiHorseshoe } from "react-icons/gi"

const Header = () => {
    return(
        <>
            <Head>
                <BlackOut />
                <LinkContainer>
                    <H1 to="/">Turning Point Equestrian Center</H1>
                    <LinkWrapper>
                        <A target="_blank" href="https://www.facebook.com/ParksideRanch"><IoLogoFacebook /></A>
                        <A className="insta" target="_blank" href="https://www.instagram.com/parksideranch/"><BsInstagram /></A>
                        <A className="main" target="_blank" href="https://parksideranch.com/"><GiHorseshoe /></A>
                    </LinkWrapper>
                </LinkContainer>
                <ImgContainer to="/"><Img src="/images/logo.png"/></ImgContainer>
            </Head>
        </>
    )
}

const BlackOut = styled.div`
        background: rgba(0, 0, 0, 0.49);
        width: 100%;
        height: 130vh;
        position: absolute;
`;
const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 20px;
    margin-top: 30px;
    padding-bottom: 20px;
`;

const LinkWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    width: 12vw;
`;

const A = styled.a`
    font-size: 60px;
    color: rgb(61, 108, 209);

    &.insta {
        font-size: 40px;
        margin-top: -14px;
        padding: 5px;
        height: 50px;
        width: 50px;
        padding-left: 6px;
        padding-bottom: 0px;
        border-radius: 20px;
        background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
        color: white;
    }
    &.main{
        font-size: 54px;
        color: #A9927D;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    justify-content: space-between;
    width: 92vw;
`;

const ImgContainer = styled(NavLink)`
    text-decoration: none;
`;

const Img = styled.img`
    width: 15%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
`;

const H1 = styled(NavLink)`
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 2px;
    font-family: var(--font-main);
    color: #E9ECEB;
    text-decoration: none;
`;

export default Header;