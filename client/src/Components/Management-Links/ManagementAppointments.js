import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

import NavBar from "../NavBar";

const ManagementAppointments = () => {

    const [ pending, setPending ] = useState(false)
    const [ accepted, setAccepted ] = useState(false)
    const [ declined, setDeclined ] = useState(false)
    const [ updating, setUpdating ] = useState(true)

    useEffect(() => {

        fetch("/appointments")
        .then(res => res.json())
        .then(data => {
            setPending(data.data)
        })

        fetch("/appointments/accepted")
        .then(res => res.json())
        .then(data => {
            setAccepted(data.data)
        })

        fetch("/appointments/declined")
        .then(res => res.json())
        .then(data => {
            setDeclined(data.data)
            setUpdating(false)
        })

    },[updating])

    const handleDelete = (e) => {
        const values = e.target.value

        const status = values.substring(0,1)
        const id = values.substring(1)

        fetch(`/delete/appointment/${status}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        setUpdating(true)
    };


    return (
        <>
            <ImgContainer />
            <PageName>Appointment List</PageName>
            <NavBar />
            <Body>
                { updating || !pending || !accepted || !declined ? <Loading><ReactLoading type="balls" color="white" /></Loading> 
                :
                <>
                    <Sections>
                        <Section>Pending</Section>
                        <Section>Accepted</Section>
                        <Section>Declined</Section>
                    </Sections>
                    <AppointmentContainer>
                        <Status>
                            { pending.appointments.length === 0 ? <h2 style={{ textAlign: "center"}}>No Pending Appointments</h2> :
                                <>
                                    {pending && pending.appointments.map((appointment) => {
                                        return (
                                            <>
                                                <AppContainer>
                                                    <AppCard><h2>ID:</h2><p>{appointment.id}</p></AppCard>
                                                    <AppCard><h2>Name:</h2><p>{appointment.name}</p></AppCard>
                                                    <AppCard><h2>Date:</h2><p>{appointment.date}</p></AppCard>
                                                    <AppCard><h2>Time:</h2><p>{appointment.time}</p></AppCard>
                                                    <AppCard><h2>Status:</h2><p style={{ color: "rgb(225, 225, 45)" }}>{appointment.status}</p></AppCard>
                                                </AppContainer>
                                                <ButtonContainer>
                                                    <Button value={"P" + appointment.id} onClick={handleDelete}>Delete</Button>
                                                </ButtonContainer>
                                            </>
                                        )
                                    })}
                                </>
                            }
                        </Status>
                        <Status>
                            { accepted.appointments.length === 0 ? <h2 style={{ textAlign: "center"}}>No Accepted Appointments</h2> :
                                <>
                                    {accepted && accepted.appointments.map((appointment) => {
                                        return (
                                            <>
                                                <AppContainer>
                                                    <AppCard><h2>ID:</h2><p>{appointment.id}</p></AppCard>
                                                    <AppCard><h2>Name:</h2><p>{appointment.name}</p></AppCard>
                                                    <AppCard><h2>Date:</h2><p>{appointment.date}</p></AppCard>
                                                    <AppCard><h2>Time:</h2><p>{appointment.time}</p></AppCard>
                                                    <AppCard><h2>Status:</h2><p style={{ color: "rgb(63, 191, 63)" }}>{appointment.status}</p></AppCard>
                                                </AppContainer>
                                                <ButtonContainer>
                                                    <Button value={"A" + appointment.id} onClick={handleDelete}>Delete</Button>
                                                </ButtonContainer>
                                            </>
                                        )
                                    })}
                                </>
                            }
                        </Status>
                        <Status>
                            { declined.appointments.length === 0 ? <h2 style={{ textAlign: "center"}}>No Declined Appointments</h2> :
                                <>
                                    {declined && declined.appointments.map((appointment) => {
                                        return (
                                            <>
                                                <AppContainer>
                                                    <AppCard><h2>ID:</h2><p>{appointment.id}</p></AppCard>
                                                    <AppCard><h2>Name:</h2><p>{appointment.name}</p></AppCard>
                                                    <AppCard><h2>Date:</h2><p>{appointment.date}</p></AppCard>
                                                    <AppCard><h2>Time:</h2><p>{appointment.time}</p></AppCard>
                                                    <AppCard><h2>Status:</h2><p style={{ color: "rgb(220, 40, 40)" }}>{appointment.status}</p></AppCard>
                                                </AppContainer>
                                                <ButtonContainer>
                                                    <Button value={"D" + appointment.id} onClick={handleDelete}>Delete</Button>
                                                </ButtonContainer>
                                            </>
                                        )
                                    })}
                                </>
                            }
                        </Status>
                    </AppointmentContainer>
                
                </>
                }
            </Body>
        </>
    )
}

const Sections = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin-top: 25px;
`;

const Section = styled.h2`
    border-bottom: 5px solid white;
    height: fit-content;
    text-align: center;
    width: 20%;
    padding-bottom: 10px;
`;

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
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AppointmentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 25px;
`;

const AppContainer = styled.div`
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
`;

const Status = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
`;

const AppCard = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;


const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 20px;
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

    &:hover {
        background-position: right center;
        color: #fff;
        font-size: 18px;
    }
`;

export default ManagementAppointments;