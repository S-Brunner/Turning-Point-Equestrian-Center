import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

    const [ role, setRole ] = useState("visitor");
    const [ rendering, setRendering ] = useState(true);

    return (
        <UserContext.Provider
            value={{
                role,
                setRole,
                rendering, 
                setRendering,
            }}>
            {children}
        </UserContext.Provider>
    )
}