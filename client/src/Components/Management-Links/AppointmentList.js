import React, { useContext } from "react";

import { UserContext } from "../../UserContext";
import ManagementAppointments from "./ManagementAppointments";
import InstructorAppointments from "./InstructorAppointments";

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
                            <div>No access</div>
                        }
                    </>            
                }
            </>
        )
    }
    
            


export default AppointmentList;