import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

import NavBar from "../NavBar";

const ManagementAppointments = () => {

    const [ allAppointments, setAllAppointments ] = useState(false)
    const [ amountOfAppointments, setAmountOfAppointments ] = useState(0)
    const [ updating, setUpdating ] = useState(true)

    useEffect(() => {
        fetch("/appointments")
        .then(res => res.json())
        .then(data => {
            setAllAppointments(data.data)
            setAmountOfAppointments(data.data.length)
            setUpdating(false)
        })
    },[updating])

    const handleAccept = (e) => {
        const _id = e.target.value;
        setUpdating(true)

        fetch(`/update/appointment/${_id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Accepted"})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUpdating(false);
        })
    }

    const handleDecline = (e) => {
        const _id = e.target.value;
        setUpdating(true)

        fetch(`/update/appointment/${_id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Declined" })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUpdating(false);
        })
    }

    return (
        <>
            <ImgContainer />
            <PageName>Appointment List</PageName>
            <NavBar />
            <Body>
                { updating && <Loading><ReactLoading type="balls" color="white" /></Loading> }
                <AppointmentContainer>
                    { allAppointments && allAppointments.map((appointment) => {
                        return(
                            <InnerContainer key={appointment._id}>
                                <AppointmentCard>
                                    <AppointmentInfo><h2>ID:</h2>{appointment._id}</AppointmentInfo>
                                    <AppointmentInfo><h2>Name:</h2>{appointment.name}</AppointmentInfo>
                                    <AppointmentInfo><h2>Date:</h2>{appointment.date}</AppointmentInfo>
                                    <AppointmentInfo><h2>Time:</h2>{appointment.time}</AppointmentInfo>
                                    <AppointmentInfo><h2>Status:</h2>{appointment.status}</AppointmentInfo>
                                </AppointmentCard>
                                <ButtonContainer>
                                    <Button value={appointment._id} onClick={handleDecline} className="D">Decline</Button>
                                    <Button value={appointment._id} onClick={handleAccept} className="A">Accept</Button>
                                </ButtonContainer>
                            </InnerContainer>
                        )
                    })}
                </AppointmentContainer>
            </Body>
        </>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    background: rgb(75, 28, 11);
    height: 90vh;
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

const Body = styled.div`
    background: rgb(7, 49, 92);
    z-index: -1;
    height: 100vh;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;

const AppointmentContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 5%;
`;

const AppointmentCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
`;

const AppointmentInfo = styled.div`
    display: flex;
    color: white;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 25%;
    margin: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
`;

const Button = styled.button`
    border: none;
    width: 110px;
    height: 45px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #cb2d3e 0%, #ef473a  51%, #cb2d3e  100%)}
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    display: block;

    &:hover {
        background-position: right center;
        color: #fff;
        font-size: 18px;
    }

    &.D{
        background-image: linear-gradient(to right, #ffb347 0%, #ffcc33  51%, #ffb347  100%)
    }

    &.A{
        background-image: linear-gradient(to right, #56ab2f 0%, #a8e063  51%, #56ab2f  100%)
    }
`;

export default ManagementAppointments;