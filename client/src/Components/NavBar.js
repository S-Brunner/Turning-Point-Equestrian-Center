import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return(
        <Container>
            <Link to="/about-us">About Us</Link>
            <Link to="/therapeutic-riding">Therapeutic Riding</Link>
            <Link to="/equestrian-rec-activities">Equestrian Activites</Link>
            <Link to="/volunteers">Volunteers</Link>
            <Link to="/our-horses">Our Horses</Link>
            <Link to="/partnership">Partnership</Link>
        </Container>
    )
}

const Container = styled.div`
    position: sticky;
    top: 0;
    margin-top: -20.5%;
    margin-bottom: 18%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-size: 18px;
    background: #482109;
    padding-left: 5%;
    padding-right: 5%;
    overflow: hidden;
`

const Link = styled(NavLink)`
    font-family: var(--font-main);
    color: #E9ECEB;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
`;
export default NavBar;