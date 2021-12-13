import React, { useContext } from "react";

import { UserContext } from "../../UserContext";
import ManagementAppointments from "./ManagementAppointments";
import InstructorAppointments from "./InstructorAppointments";
import NoAccess from "../NoAccess";

// This whole thing just checks to see if the user is a part of the management or instructor role.
// if not it displays a no access page. Yes the managament and instructors see different things depending on their role.
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
    );
};

export default AppointmentList;