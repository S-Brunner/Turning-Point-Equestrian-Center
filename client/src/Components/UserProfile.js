import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import ReactLoading from "react-loading";


import NavBar from "./NavBar";

const UserProfile = () => {

    const [ appointmentDetails, setAppointmentDetails ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    const { name } = useParams();

    useEffect(() => {
        fetch(`/appointment/${name}`)
        .then(res => res.json())
        .then(data => {
            setAppointmentDetails(data.data)
            setLoading(false)
        })
    },[loading, name])

    const handleDelete = (ev) => {
        const id = ev.target.value;

        fetch(`/appointment/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type' : "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setAppointmentDetails(false)
        })
        setLoading(true)
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
                            { appointmentDetails.length !== 0 ?
                                <Conatiner>
                                        <AppointmentHeader>Your Appointments:</AppointmentHeader>
                                        <AppointmentCard>
                                        {appointmentDetails && appointmentDetails.map((appointment) => {
                                            return(
                                                <InnerContainer key={appointment.id}>
                                                    <AppointmentContainer>
                                                        <Info><P className="feild">Name:</P><P>{appointment.name}</P></Info>
                                                        <Info><P className="feild">Date: </P><P>{appointment.date}</P></Info>
                                                        <Info><P className="feild">Time: </P><P>{appointment.time}</P></Info>
                                                        <Info><P className="feild">Status: </P><P className={appointment.status}>{appointment.status}</P></Info>
                                                        {appointment.instructor.length !== 0 && <Info><P className="feild">Instructor:</P><P>{appointment.instructor}</P></Info>}
                                                    </AppointmentContainer>
                                                    { appointment.status !== "Accepted" && <Buttons value={appointment.date + appointment.time} onClick={handleDelete}>Delete</Buttons>}
                                                </InnerContainer>
                                            )
                                        })}
                                        </AppointmentCard>
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
    height: fit-content;
    padding: 55px;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;

const AppointmentHeader = styled.h2`
    margin: 10px;
`;

const AppointmentCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const AppointmentContainer = styled.div`
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 20px;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 4px, rgba(0, 0, 0, 0.3) 0px 10px 17px -3px, rgba(0, 0, 0, 0.2) 0px -7px 0px inset;
`;

const Conatiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 35%;
    margin: 25px;
`;

const Buttons = styled.button`
    border: none;
    width: 125px;
    height: 55px;
    margin-top: 15px;
    border-radius: 5px;
    font-size: 18px;
    background: rgb(150, 37, 37);
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 4px, rgba(0, 0, 0, 0.3) 0px 10px 17px -3px, rgba(0, 0, 0, 0.2) 0px -4px 0px inset;
    transition: 400ms ease;

    &:hover {
        outline: 2px solid white;
        background: rgb(251, 23, 23);
        color: white;
        font-size: 20px; 
    };
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

    &.Pending{
        color: rgb(225, 225, 45);
    }

    &.Accepted{
        color: rgb(63, 191, 63);
    }

    &.Declined{
        color: rgb(220, 40, 40);
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