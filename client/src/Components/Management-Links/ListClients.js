import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

import { UserContext } from "../../UserContext";
import NavBar from "../NavBar";

const ListClients = () => {

    const { role } = useContext(UserContext)

    const [ allUsers, setAllUsers ] = useState(false)
    const [ amountOfUsers, setAmountOfUsers ] = useState(0)
    const [ updating, setUpdating ] = useState(true);

    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(data => {
            setAllUsers(data.data)
            setAmountOfUsers(data.data.length)
            setUpdating(false)
        })
    },[amountOfUsers])

    const handleDelete = (e) => {
        const _id = e.target.value;
        setUpdating(true)
        
        fetch(`/user/delete/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
        })
        setAmountOfUsers( amountOfUsers - 1 );
    };

    return(
        <>    
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
                                )
                            })}
                        </ClientContainer>
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
    display: flex;
    flex-direction: column;
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`;

const ClientContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 5%;
`;

const ClientCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
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
    width: 110px;
    height: 45px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #cb2d3e 0%, #ef473a  51%, #cb2d3e  100%)}
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    display: block;
    margin-top: 10px;

    &:hover {
        background-position: right center;
        color: #fff;
        font-size: 18px;
    }
`;

export default ListClients;