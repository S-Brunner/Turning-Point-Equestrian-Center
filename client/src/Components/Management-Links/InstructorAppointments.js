import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "../NavBar";

////////////////////////////////////////////////////////////
// IMPORTANT: Instructors view at the Appointments Tab    //
////////////////////////////////////////////////////////////

const ManagementAppointments = () => {

    const { user } = useAuth0();

    // Variable for the instructor to be passed when they Accept or decline an appointment.
    const instructor = user.name;

    // These 3 store the appointments depending on their status.
    const [ pending, setPending ] = useState(false);
    const [ accepted, setAccepted ] = useState(false);
    const [ declined, setDeclined ] = useState(false);

    // Used for page re-rendering.
    const [ updating, setUpdating ] = useState(true);

    // Fetches for the 3 types of statuses and stores them in the right useState
    useEffect(() => {

        // For pending appointments.
        fetch("/appointments")
        .then(res => res.json())
        .then(data => setPending(data.data));

        // For accepted appointments
        fetch("/appointments/accepted")
        .then(res => res.json())
        .then(data => setAccepted(data.data));

        // For declined appointments
        fetch("/appointments/declined")
        .then(res => res.json())
        .then(data => {
            setDeclined(data.data)
            setUpdating(false)
        });

    },[updating]);

    // Function to deleting an appointment
    const handleDelete = (e) => {
        
        // Variable that sotres the id of that appointment
        const values = e.target.value;

        // Splits values into status and id for the proper fetching
        const status = values.substring(0,1);
        const id = values.substring(1);

        fetch(`/delete/appointment/${status}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));

        setUpdating(true);
    
    };

    // Function to handle when the instructor wants to accept an appointment
    const handleAccept = (e) => {

        const id = e.target.value;

        fetch(`/accept/appointment/${id}`, {
            method : "PATCH",
            body : JSON.stringify({ instructor }),
            headers: {
                "Content-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then(data => console.log(data));
        
        setUpdating(true);
    
    };

    // Function to handle when the instructor wants to decline an appointment
    const handleDecline = (e) => {

        const id = e.target.value;
        
        fetch(`/decline/appointment/${id}`, {
            method : "PATCH",
            body : JSON.stringify({ instructor }),
            headers: {
                "Content-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then(data => console.log(data));
        
        setUpdating(true);
    
    };

    return (
        <>
            <ImgContainer />
            <PageName>Appointment List</PageName>
            <NavBar />
            <Body>
                {/* Makes sure that the there is no data being fetched or no data set yet */}
                { updating || !pending || !accepted || !declined ? <Loading><ReactLoading type="balls" color="white" /></Loading> :
                    <>
                        <Sections>
                            <Section>Pending</Section>
                            <Section>Accepted</Section>
                            <Section>Declined</Section>
                        </Sections>
                        <AppointmentContainer>
                            <Status> {/* Mapping throught the Pending appointments*/}
                                { pending.appointments.length === 0 ? <h2 style={{ textAlign: "center"}}>No Pending Appointments</h2> :
                                    <>
                                        {pending && pending.appointments.map((appointment) => {
                                            return (
                                                <>
                                                    <AppContainer key={appointment.id}>
                                                        <AppCard><h2>ID:</h2><p>{appointment.id}</p></AppCard>
                                                        <AppCard><h2>Name:</h2><p>{appointment.name}</p></AppCard>
                                                        <AppCard><h2>Date:</h2><p>{appointment.date}</p></AppCard>
                                                        <AppCard><h2>Time:</h2><p>{appointment.time}</p></AppCard>
                                                        <AppCard><h2>Status:</h2><p style={{ color: "rgb(225, 225, 45)" }}>{appointment.status}</p></AppCard>
                                                    </AppContainer>
                                                    <ButtonContainer key={appointment.id}>
                                                        <Button className="Accept" value={appointment.id} onClick={handleAccept}>Accept</Button>
                                                        <Button value={appointment.id} onClick={handleDecline}>Decline</Button>
                                                    </ButtonContainer>
                                                </>
                                            );
                                        })}
                                    </>
                                }
                            </Status>
                            <Status> {/* Mapping throught the Accepted appointments*/}
                                { accepted.appointments.length === 0 ? <h2 style={{ textAlign: "center"}}>No Accepted Appointments</h2> :
                                    <>
                                        {accepted && accepted.appointments.map((appointment) => {
                                            return (
                                                <>
                                                    <AppContainer key={appointment.id} style={{ marginBottom: "20px"}}>
                                                        <AppCard><h2>ID:</h2><p>{appointment.id}</p></AppCard>
                                                        <AppCard><h2>Name:</h2><p>{appointment.name}</p></AppCard>
                                                        <AppCard><h2>Date:</h2><p>{appointment.date}</p></AppCard>
                                                        <AppCard><h2>Time:</h2><p>{appointment.time}</p></AppCard>
                                                        <AppCard><h2>Status:</h2><p style={{ color: "rgb(63, 191, 63)" }}>{appointment.status}</p></AppCard>
                                                        <AppCard><h2>Instructor:</h2><p>{appointment.instructor}</p></AppCard>
                                                    </AppContainer>
                                                </>
                                            );
                                        })}
                                    </>
                                }
                            </Status>
                            <Status> {/* Mapping throught the Declined appointments*/}
                                { declined.appointments.length === 0 ? <h2 style={{ textAlign: "center"}}>No Declined Appointments</h2> :
                                    <>
                                        {declined && declined.appointments.map((appointment) => {
                                            return (
                                                <>
                                                    <AppContainer key={appointment.id}>
                                                        <AppCard><h2>ID:</h2><p>{appointment.id}</p></AppCard>
                                                        <AppCard><h2>Name:</h2><p>{appointment.name}</p></AppCard>
                                                        <AppCard><h2>Date:</h2><p>{appointment.date}</p></AppCard>
                                                        <AppCard><h2>Time:</h2><p>{appointment.time}</p></AppCard>
                                                        <AppCard><h2>Status:</h2><p style={{ color: "rgb(220, 40, 40)" }}>{appointment.status}</p></AppCard>
                                                        <AppCard><h2>Instructor:</h2><p>{appointment.instructor}</p></AppCard>
                                                    </AppContainer>
                                                    <ButtonContainer key={appointment.id}>
                                                        <Button value={"D" + appointment.id} onClick={handleDelete}>Delete</Button>
                                                    </ButtonContainer>
                                                </>
                                            );
                                        })}
                                    </>
                                }
                            </Status>
                        </AppointmentContainer>
                    </>
                }
            </Body>
        </>
    );
};

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
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`;

const AppointmentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 25px;
`;

const AppContainer = styled.div`
    background: rgba(0, 0, 0, 0.5);
    width: 110%;
    padding: 20px;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 4px, rgba(0, 0, 0, 0.3) 0px 10px 17px -3px, rgba(0, 0, 0, 0.2) 0px -7px 0px inset;
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
    width: 110%;
    margin-top: 15px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    width: 125px;
    height: 55px;
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

    &.Accept{
        background: rgb(0, 158, 0);

        &:hover {
        outline: 2px solid white;
        background: rgb(0, 234, 0);
        font-size: 20px;
    };

    };
`;

export default ManagementAppointments;