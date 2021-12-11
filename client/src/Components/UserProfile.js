import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import ReactLoading from "react-loading";


import NavBar from "./NavBar";

const UserProfile = () => {

    const [ appointmentDetails, setAppointmentDetails ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    const { _id } = useParams();

    useEffect(() => {
        fetch(`/appointment/${_id}`)
        .then(res => res.json())
        .then(data => {
            setAppointmentDetails(data.data)
            setLoading(false)
        })
    },[appointmentDetails, _id])

    const handleDelete = () => {
        setLoading(true)
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
                    {loading ? <Loading><ReactLoading type="balls" color="white" /></Loading>

                        :
                        <>
                            { appointmentDetails ?
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

                                :<NoAppointment>No appointments. Book one <HereLink to="/book-appointment">here</HereLink></NoAppointment>
                            }
                        </>
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
    z-index: -1;
    height: 100vh;
    padding: 50px;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;

const AppointmentHeader = styled.h2`
    margin: 10px;
`;

const AppointmentContainer = styled.div`
    color: white;
    font-size: 18px;
    width: 40%;
    background: rgba(0, 0, 0, 0.5);
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
    border: none;
    width: 130px;
    height: 50px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #cb2d3e 0%, #ef473a  51%, #cb2d3e  100%)}
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    display: block;
    margin-top: 10px;

    &:hover {
        background-position: right center;
        color: #fff;
        font-size: 18px;
    }
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px;
    padding: 5px;
`;

const P = styled.p`
    color: white;
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