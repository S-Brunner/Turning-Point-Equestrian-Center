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
    },[name, appointmentDetails])

    const handleDelete = (ev) => {
        const id = ev.target.value;
        console.log(id);
        setLoading(true)
        fetch(`/delete/appointment/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type' : "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
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
                            { appointmentDetails.length !== 0 ?
                                <Conatiner>
                                        <AppointmentHeader>Your Appointments:</AppointmentHeader>
                                        <AppointmentCard>
                                        {appointmentDetails && appointmentDetails.map((appointment) => {
                                            return(
                                                <InnerContainer>
                                                    <AppointmentContainer>
                                                        <Info><P className="feild">Name:</P><P>{appointment.name}</P></Info>
                                                        <Info><P className="feild">Date: </P><P>{appointment.date}</P></Info>
                                                        <Info><P className="feild">Time: </P><P>{appointment.time}</P></Info>
                                                        <Info><P className="feild">Status: </P><P className={appointment.status}>{appointment.status}</P></Info>
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

const AppointmentCard = styled.div`
    display: flex;
    width: 100%;
`;

const AppointmentContainer = styled.div`
    color: white;
    font-size: 18px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 20px;
`;

const Conatiner = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 25px;
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
    margin-bottom: 25px;

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