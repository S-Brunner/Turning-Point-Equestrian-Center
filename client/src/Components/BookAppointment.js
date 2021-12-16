import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import NavBar from "./NavBar";
import TimeAnimation from "./TimesAnimation";

////////////////////////////////////////
//     Book Appointment Page          // 
////////////////////////////////////////

const BookAppointment = () => {
    
    let history = useHistory();
    const { user } = useAuth0();
    
    const today = new Date().toString().substring(8,10);
    const fullDate = new Date().toString().substring(0, 15)

    // Stores what day the user chooses from the calendar.
    const [ selectedDate, setSelectedDate ] = useState(fullDate);

    // This stores the times that are already taken from either pending or accepted.
    const [ selectedTimes, setSelectedTimes ] = useState(false);

    // For page re-rendering
    const [ loading, setLoading ] = useState(false);

    // All the possible times that can be booked
    const times = ["10:00 am","11:00 am","12:00 pm","1:00 pm","2:00 pm","3:00 pm","4:00 pm"];

    // This will hold the times that are inside of the selectedTimes array.
    const bookedTimes= [];

    // These 2 are holding the information that ends up being selected by the user to be posted into Mongo
    const [ userDate, setUserDate ] = useState(false);
    const [ userTime, setUserTime ] = useState(false);

    // Once a day is selected from the calendar this will run
    const handleDaySelected = (day) => {

        // Cuts down the information to what we need.
        let charedDay = day.toString().substring(0, 15);
        setSelectedDate(charedDay);

    };

    // When the day is changed it re-fetches for all the appointments insdie of pending or accepted
    useEffect(() => {

        setLoading(true)
        setUserTime(false)
        fetch(`/appointment-by-date/${selectedDate}`)
        .then(res => res.json())
        .then(data => {
            setSelectedTimes(data.data);
            setLoading(false);
        });

    },[selectedDate]);

    // This will map through the selected times array and if that time is selected it will be put inside of the bookedTimes array.
    if(selectedTimes){
        selectedTimes?.map((selectedTime) => {
            return bookedTimes.push(selectedTime);
        });
    };

    
    const handleSelection = (ev) => {

        let dateSelected = ev.target.value.substring(0, 15);
        let timeSelected = ev.target.value.substring(19);

        setUserDate(dateSelected)
        setUserTime(timeSelected)
    }
        
    // Once the user has chosen a date and a time available and submits it posts to Mongo
    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch("/create/new-appointment", {
            method: "POST",
            body: JSON.stringify({
                id: userDate + userTime,
                name: user.name,
                date: userDate,
                time: userTime,
                instructor: "",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message);
            history.push(`/profile/${user.name}`);
        });
    };

    const styleDate = `
        .DayPicker-Day--highlighted {
            background-color: orange;
            color: black;
        }
        .DayPicker {
            font-size: 2em;
        }
        .DayPicker-Month {
            color: white;
        }
        .DayPicker-Day--disabled {
            color: black;
        }
      `;

    const modifiers = {
        highlighted: new Date(selectedDate)
    }

    return(
        <>
            <ImgContainer>
                <Image src="/images/booking.png" />
            </ImgContainer>
            <PageName >Book an Appointment</PageName>
            <NavBar />
            <Form onSubmit={handleSubmit}>
                <DatePicker>
                    <style>{styleDate}</style>
                    <DayPicker 
                        fromMonth={new Date()}
                        selectedDays={selectedDate}
                        onDayClick={handleDaySelected}
                        disabledDays={{before: new Date()}}
                        modifiers={modifiers}            
                    />
                </DatePicker>
                { selectedDate ? 
                    <>
                        {selectedDate.substring(8,10) < today ? <h2 style={{ border: "3px solid red", position: "absolute", left: "55%", borderRadius: "10px", padding: "20px"}}>Invalid Date</h2>:
        
                            <TimeContainer onChange={handleSelection}>
                                {loading && <h2>Loading</h2>}
                                {times.map((time, index) => {
                                    const delay = index * 100;
                                    
                                    if(bookedTimes.includes(time)){
                                        return(
                                            <TimeAnimation key={time} loading={loading} delay={delay}>
                                                <Time className="disabled" value={`${selectedDate} at ${time}`}>
                                                    {selectedDate} at {time}
                                                    <Input hidden className="disabled" type="radio" name="time" disabled />
                                                </Time>
                                            </TimeAnimation>
                                        ) 
                                    }
                                    return (
                                        <TimeAnimation key={time} loading={loading} delay={delay} >
                                            <Time htmlFor={time} value={`${selectedDate} at ${time}`} className={ time === userTime && "chosen"}>
                                                <div>{selectedDate} at {time}</div>
                                                <Input value={`${selectedDate} at ${time}`} id={time} type="radio" hidden name="time" required ></Input>
                                            </Time>
                                        </TimeAnimation>
                                    )
                                })}
                            </TimeContainer>
                        }
                    </>
                    :
                    <H1>No Date Selected</H1>
                }
                <ButtonAndErrMsg>
                    {userTime && 
                        <Button type="submit" className="btn-grad">
                            Book
                        </Button>
                    }
                </ButtonAndErrMsg>
            </Form>
    </>
    )
}

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    padding-top: 5%;
    padding-bottom: 10%;
    background: rgb(7, 49, 92);
    z-index: -1;
    height: fit-content;
    padding: 50px;
    padding-left: 10%;
    padding-right: 10%;
`;

const TimeContainer = styled.ul`
    margin-left: -20%;
`;

const Time = styled.label`
    color: white;
    display: flex;
    justify-content: center;
    padding: 50px;
    margin-bottom: 20px;
    margin-left: -150px;
    cursor: pointer;
    border-radius: 10px;
    background: linear-gradient(45deg, rgba(0,73,129,1) 0%, rgba(0,100,170,1) 50%, rgba(0,73,129,1) 100%);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 4px, rgba(0, 0, 0, 0.3) 0px 10px 17px -3px, rgba(0, 0, 0, 0.2) 0px -7px 0px inset;
    

    &:hover,
    &.chosen{
        animation: borderFill 0.5s forwards;
        transform: translateY(-0.35em);
    }

    @keyframes borderFill {
        from {
            box-shadow: 0px #19E8FF;
        }
        to {
            box-shadow: 0px 12px 17px -1px #B7EDFF;
        }
    }

    &.disabled{
        color: black;
        background: grey;
        &:hover{
            transform: translateY(0);
            animation: none;
            cursor: not-allowed;
        }
    }
`;

const DatePicker = styled.div`
    height: fit-content;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
`;

const Input = styled.input`
    cursor: pointer;

        &.disabled{
            cursor: not-allowed;
        }
`;

const H1 = styled.h1`
    margin-left: -30%;
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

const ImgContainer = styled.div`
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    margin-top: -25%;
    margin-bottom: 5px;
`;

const Image = styled.img`
    width: 100%;
    margin-top: 2%;
`;

const ButtonAndErrMsg = styled.div`
    margin-left: -30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
`;

const Button = styled.button`
    width: 200px;
    height: 75px;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 10px;
    background: rgba(2,85,0,1);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 4px, rgba(0, 0, 0, 0.3) 0px 10px 17px -3px, rgba(0, 0, 0, 0.2) 0px -7px 0px inset;
    transition: 400ms ease;

    &:hover{
        color: white;
        background: rgba(0,129,15,1);
        font-size: 20px;
        outline:  2px solid white;
    }
`;

export default BookAppointment;