import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

    const [ role, setRole ] = useState("visitor");

    return (
        <UserContext.Provider
            value={{
                role,
                setRole
            }}>
            {children}
        </UserContext.Provider>
    )
}