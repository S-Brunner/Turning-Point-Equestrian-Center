import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import ReactLoading from "react-loading";
import { UserContext } from "../UserContext";
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {

    const { isAuthenticated } = useAuth0();
    const { role, rendering } = useContext(UserContext);

    return (
        <>
            { isAuthenticated ?
                <>
                    { rendering ? 
                        <Loading><ReactLoading type="balls" color="white" /></Loading>
                        :
                        <>
                            { role === "Management" || role === "Instructor" ?
                                <Wrapper>
                                <NavContainer style={{ justifyContent: "center" }}>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{ marginRight: "40px"}}>
                                            All Tabs
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu variant="dark">
                                                <Dropdown.Item><Link  to="/about-us">About</Link></Dropdown.Item>
                                                <Dropdown.Item><Link to="/therapeutic-riding">Riding</Link></Dropdown.Item>
                                                <Dropdown.Item><Link to="/equestrian-rec-activities">Activites</Link> </Dropdown.Item>
                                                <Dropdown.Item><Link to="/volunteers">Volunteer</Link></Dropdown.Item>
                                                <Dropdown.Item><Link to="/our-horses">Horses</Link></Dropdown.Item>
                                                <Dropdown.Item><Link to="/partnership">Partnership</Link></Dropdown.Item>
                                                <Dropdown.Item><Link to="/book-appointment">Book Appointment</Link></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Link to="/list/clients" style={{ marginRight: "40px"}}>Clients</Link>
                                        <Link to="/list/appointments">Appointments</Link>
                                    </NavContainer>
                                </Wrapper>
                        
                                :
                                <Wrapper>
                                    <NavContainer>
                                        <Link to="/about-us">About</Link>
                                        <Link to="/therapeutic-riding">Riding</Link>
                                        <Link to="/equestrian-rec-activities">Activites</Link>
                                        <Link to="/volunteers">Volunteer</Link>
                                        <Link to="/our-horses">Horses</Link>
                                        <Link to="/partnership">Partnership</Link>
                                        <Link to="/book-appointment">Book Appointment</Link>
                                    </NavContainer>
                                </Wrapper>
                            }
                        </>
                    }
                </>
                :
                <Wrapper>
                    <NavContainer>
                        <Link to="/about-us">About</Link>
                        <Link to="/therapeutic-riding">Riding</Link>
                        <Link to="/equestrian-rec-activities">Activites</Link>
                        <Link to="/volunteers">Volunteer</Link>
                        <Link to="/our-horses">Horses</Link>
                        <Link to="/partnership">Partnership</Link>
                    </NavContainer>
                </Wrapper>
        }
        </>
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
    margin-top: -15px;
    font-size: 18px;
    background: rgb(93, 34, 13);
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

const Loading = styled.div`
    display: flex;
    justify-content: center;
    background: rgb(93, 34, 13);  
    margin-top: 7px;
`;

export default NavBar;