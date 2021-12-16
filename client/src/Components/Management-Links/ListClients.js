import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

import { UserContext } from "../../UserContext";
import NavBar from "../NavBar";
import NoAccess from "../NoAccess";

const ListClients = () => {

    const { role } = useContext(UserContext);

    // For storing all users
    const [ allUsers, setAllUsers ] = useState(false);

    // For page re-rendering
    const [ updating, setUpdating ] = useState(true);

    useEffect(() => {

        // Fetches for all users and stores it insde of allUsers
        fetch("/users")
        .then(res => res.json())
        .then(data => {
            setAllUsers(data.data)
            setUpdating(false)
        });

    },[updating]);

    // When management or instructors decided to want to delete a user
    const handleDelete = (e) => {

        const _id = e.target.value;
        
        fetch(`/user/delete/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));

        setUpdating(true);
    
    };

    return(
        <>  {/* Checks to make sure that the user has one of the 2 roles allowed */}
            { role === "Management" || role === "Instructor" ?
                <>
                    <ImgContainer />
                    <PageName>Client List</PageName>
                    <NavBar />
                    <Body>
                    { updating && <Loading><ReactLoading type="balls" color="white" /></Loading> }
                        <ClientContainer>
                            {allUsers && allUsers.map((user) => {
                                return(
                                    <InnerContainer key={user._id}>
                                        <ClientCard>
                                            <ClientInfo><h2>ID:</h2>{user._id}</ClientInfo>
                                            <ClientInfo><h2>Name:</h2>{user.name}</ClientInfo>
                                            <ClientInfo><h2>Role:</h2>{user.role}</ClientInfo>
                                        </ClientCard>
                                        <DeleteButton value={user._id} onClick={handleDelete}>Delete</DeleteButton>
                                    </InnerContainer>
                                );
                            })}
                        </ClientContainer>
                    </Body>
                </>
            :
                <NoAccess />
            }
        </>
    );
};

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
    padding: 50px;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;

const ClientContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const ClientCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 4px, rgba(0, 0, 0, 0.3) 0px 10px 17px -3px, rgba(0, 0, 0, 0.2) 0px -7px 0px inset;
`;

const ClientInfo = styled.div`
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

const DeleteButton = styled.button`
    border: none;
    margin-top: 10px;
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
`;

export default ListClients;