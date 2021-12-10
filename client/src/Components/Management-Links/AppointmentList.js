import React, { useContext, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components"

import NavBar from "../NavBar";
import { UserContext } from "../../UserContext";

const AppointmentList = () => {

    const { role } = useContext(UserContext);
    const [ allAppointments, setAllAppointments ] = useState(false)

    useEffect(() => {
        fetch("/appointments")
        .then(res => res.json())
        .then(data => setAllAppointments(data.data))
    },[])

    return(
            <>    
                { role === "Management" ?
                    <>
                        <ImgContainer />
                        <PageName>Appointment List</PageName>
                        <NavBar />
                        <Body>
                            <h2>Appointments</h2>
                            { allAppointments && allAppointments.map((appointment) => {
                                return(
                                    <>
                                        <div>{appointment.name}</div>
                                        <div>{appointment.date}</div>
                                        <div>{appointment.time}</div>
                                    </>
                                )
                            })}
                        </Body>
                    </>
    
                :
                    <div>No access</div>
                }
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
    

export default AppointmentList;