import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../../UserContext";
import NavBar from "../NavBar";

const ListClients = () => {

    const { role } = useContext(UserContext)
    const [ allUsers, setAllUsers ] = useState(false)

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(data => setAllUsers(data.data))
    },[])

    allUsers && console.log(allUsers);
    return(
        <>    
            { role === "Management" ?
                <>
                    <ImgContainer />
                    <PageName>Client List</PageName>
                    <NavBar />
                    <Body>
                        <h2>Clients: </h2>
                        {allUsers && allUsers.map((user) => {
                            return(
                                <div>{user.name}</div>
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

export default ListClients;