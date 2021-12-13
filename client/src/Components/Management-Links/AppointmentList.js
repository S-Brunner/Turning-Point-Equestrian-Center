import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../UserContext";
import ManagementAppointments from "./ManagementAppointments";
import InstructorAppointments from "./InstructorAppointments";
import NoAccess from "../NoAccess";

const AppointmentList = () => {

    const { role } = useContext(UserContext);

    return(
            <>    
                {role === "Instructor" ?
                    <InstructorAppointments />
                :
                    <>
                        { role === "Management" ?
                            <ManagementAppointments />
                        :
                            <NoAccess />
                        }
                    </>            
                }
            </>
        )
    }

export default AppointmentList;