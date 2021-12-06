import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
    return (
        <Wrapper>
            <NavContainer>
                <Link to="/about-us">About Us</Link>
                <Link to="/therapeutic-riding">Therapeutic Riding</Link>
                <Link to="/equestrian-rec-activities">Equestrian Activites</Link>
                <Link to="/volunteers">Volunteers</Link>
                <Link to="/our-horses">Our Horses</Link>
                <Link to="/partnership">Partnership</Link>
            </NavContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    width: 100%;
    height: 50px;
    font-size: 18px;
    background: #482109;
    padding-left: 5%;
    padding-right: 5%;
`;

const Link = styled(NavLink)`
    font-family: var(--font-main);
    color: #E9ECEB;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
`;

export default NavBar;