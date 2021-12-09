import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

import NavBar from "./NavBar";

const UserProfile = () => {

    const [ currentUser, setCurrentUser ] = useState(false);
    const [ appointmentDetails, setAppointmentDetails ] = useState(false);

    const { _id } = useParams();

    useEffect(() => {
        fetch(`/user/${_id}`)
        .then(res => res.json())
        .then(data => setCurrentUser(data.data))
    },[])

    useEffect(() => {
        fetch(`/appointment/${_id}`)
        .then(res => res.json())
        .then(data => setAppointmentDetails(data.data))
    },[appointmentDetails])

    const handleDelete = () => {
        fetch(`/delete/appointment/${_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type' : "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAppointmentDetails(false)
        })
    } 

    return (
        <>
                <ImgContainer>
                    <Image src="/images/profile.png" />
                </ImgContainer>
                <PageName>Your Profile</PageName>
                <NavBar />
                <Body>
                    <h2>Hello {currentUser.name}</h2>
                    {appointmentDetails ? 
                        <Conatiner>
                            <AppointmentHeader>Your Appointment</AppointmentHeader>
                            <AppointmentContainer>
                                    <Info><P className="feild">Name:</P><P>{appointmentDetails.name}</P></Info>
                                    <Info><P className="feild">Date: </P><P>{appointmentDetails.date}</P></Info>
                                    <Info><P className="feild">Time: </P><P>{appointmentDetails.time}</P></Info>
                                    <Info><P className="feild">Status: </P><P>"{appointmentDetails.status}"</P></Info>
                                </AppointmentContainer>
                                
                                    <Buttons onClick={handleDelete}>Delete</Buttons>
                                
                        </Conatiner>
                        : <NoAppointment>No appointments. Book one <HereLink to="/book-appointment">here</HereLink></NoAppointment>
                    }
                    
                </Body>
            </>
        )
    }
    
const ImgContainer = styled.div`
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    margin-top: -23%;
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
    background: rgba(20,49,9,1);
    z-index: -1;
    height: 100vh;
    padding: 50px;
`;

const AppointmentHeader = styled.h2`
    margin: 10px;
`;

const AppointmentContainer = styled.div`
    color: white;
    font-size: 18px;
    width: 40%;
    background: white;
    border-radius: 10px;
    padding: 20px;
`;

const Conatiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Buttons = styled.button`
    width: 130px;
    height: 50px;
    border: none;
    font-size: 18px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    background: #F4F4F4;
`;

const P = styled.p`
    color: black;
    font-size: 25px;

    &.feild{
        font-weight: bold;
    }
`;

const NoAppointment = styled.div`
    font-size: 18px;
    color: white;
`;

const HereLink = styled(NavLink)`
    color: blue;
    text-decoration: none;
`;

export default UserProfile;