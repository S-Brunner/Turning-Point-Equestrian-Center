import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoLogoFacebook } from "react-icons/io"
import { BsInstagram } from "react-icons/bs"
import { GiHorseshoe } from "react-icons/gi"
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../UserContext";


const Header = () => {

    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const { setRole, setRendering } = useContext(UserContext)

    isAuthenticated && window.localStorage.setItem("_id", user.email);

        useEffect(() => {
            if(isAuthenticated){
                fetch("/create-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id: user.email, name: user.name, role: "client"})
                })
                .then((res) => res.json())
                .then((data) => {
                    setRole(data.role)
                    setRendering(false)
                })
            }
        },[user, isAuthenticated, setRendering, setRole])

    return(
        <>
            <BlackOut />
            <Head>
                <LinkContainer>
                        <H1 to="/">Turning Point Equestrian Center</H1>
                        <UserLogIn>
                        {isAuthenticated ? 
                            <Container>
                                <Hello style={{ paddingTop: "20px"}}>Hello, {user.name}!</Hello>
                                <UserLogo to={`/profile/${user.name}`}><FaUser /></UserLogo>
                                <Signin onClick={() => logout()}>LogOut</Signin>
                            </Container>
                        : <Signin onClick={() => loginWithRedirect()}>SignIn</Signin>
                        }
                        </UserLogIn>
                    </LinkContainer>
                <div>
                    <ImgContainer to="/"><Img src="/images/logo.png"/></ImgContainer>
                    <LinkWrapper>
                        <A target="_blank" href="https://www.facebook.com/ParksideRanch"><IoLogoFacebook /></A>
                        <A className="insta" target="_blank" href="https://www.instagram.com/parksideranch/"><BsInstagram /></A>
                        <A className="main" target="_blank" href="https://parksideranch.com/"><GiHorseshoe /></A>
                    </LinkWrapper>
                </div>
            </Head>
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BlackOut = styled.div`
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 82vh;
        margin-top: -1.75%;
        position: absolute;

        @media (max-width: 320px) {
            height: 67%;
            margin-top: -34%;
        }
`;
const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 320px) {
        display: flex;
    }
`;

const LinkWrapper = styled.div`
    position: absolute;
    top: 42%;
    left: 43.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    width: 12vw;

    @media (max-width: 320px) { 
        display: flex;
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
    }
`;

const A = styled.a`
    margin-left: 20px;
    font-size: 60px;
    color: rgb(61, 108, 209);
    display: flex;
    
    @media (max-width: 320px) {
        font-size: 35px;
        margin: 10px;
        margin-left: 50px;
    }

    &.insta {
        font-size: 40px;
        margin-top: 7px;
        height: 50px;
        width: 50px;
        padding-left: 5.75px;
        padding-top: 5px;
        border-radius: 20px;
        background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
        color: white;

        @media (max-width: 320px) {
            font-size: 30px;
            padding: 0px;
            width: 30px;
            height: 28px;
            border-radius: 9px;
        }
    }
    &.main{
        font-size: 54px;
        color: #A9927D;

        @media (max-width: 320px) {
            font-size: 35px;
            margin-right: 40px;
        }
    }
`;

const UserLogo = styled(NavLink)`
    color: rgb(56, 155, 255);
    font-size: 30px;
    margin-left: 20px;
    cursor: pointer;
    
    @media (max-width: 320px) {
        font-size: 20px;
    }
`;

const UserLogIn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin-left: -28%;
    margin-top: -20px;
    
    @media (max-width: 320px) {
        padding: 10px;
        width: 100%;
        height: fit-content;
        margin: 0;

    }
`;

const Signin = styled.button`
    border: none;
    cursor: pointer;
    color: #000;
    font-family: var(--font-main);
    font-size: 20px;
    margin-left: 20px;
    background: #A9927D;
    border-radius: 20px;
    height: 40px;
    width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 320px) {
        font-size: 10px;
        height: 30px;
        width: 45px;
        margin-left: 2%;
    }
`;

const LinkContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding-left: 50px;
    padding-right: 50px;

    @media (max-width: 320px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        justify-content: space-between;
    }
`;

const Hello = styled.p`
    
    @media (max-width: 320px) {
        font-size: 13px;
        margin-bottom: 10px;
    }
`;

const ImgContainer = styled(NavLink)`
    text-decoration: none;
`;

const Img = styled.img`
    width: 15%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    @media (max-width: 320px) {
        display: none;
    }
`;

const H1 = styled(NavLink)`
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 2px;
    font-family: var(--font-main);
    color: #E9ECEB;
    text-decoration: none;

    @media (max-width: 320px) {
        font-size: 20px;
        text-align: center;
        width: 100%;
        padding: 4px;
    }
`;

export default Header;