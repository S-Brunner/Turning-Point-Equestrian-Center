import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import NavBar from "./NavBar";

const BookAppointment = () => {
    
    let history = useHistory();
    const { user } = useAuth0();

    const [ selectedDate, setSelectedDate ] = useState(false)
    const [ selectedTimes, setSelectedTimes ] = useState(false) 
    const [ loading, setLoading ] = useState(true)

    const times = ["10:00 am","11:00 am","12:00 pm","1:00 pm","2:00 pm","3:00 pm","4:00 pm"]
    const bookedTimes= []

    const [ date, setDate ] = useState(false);
    const [ time, setTime ] = useState(false);

    const handleDaySelected = (day) => {
        let charedDay = day.toString().substring(0, 15);
        setSelectedDate(charedDay);
        setLoading(true)
    } 

    useEffect(() => {
        selectedDate && 
        fetch(`/appointment-by-date/${selectedDate}`)
        .then(res => res.json())
        .then(data => {
            setSelectedTimes(data.data)
            setLoading(false)
        });
    },[selectedDate])



    if(selectedTimes){
        selectedTimes?.map((selectedTime) => {
            return bookedTimes.push(selectedTime);
        })
    }
        
    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch("/create/new-appointment", {
            method: "POST",
            body: JSON.stringify({
                id: date + time,
                name: user.name,
                date,
                time,
                instructor: "",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            history.push(`/profile/${user.name}`)
        })
    }

    const handleSelection = (e) => {
        let dateSelected = e.target.value.substring(0, 15);
        let timeSelected = e.target.value.substring(19);

        setDate(dateSelected)
        setTime(timeSelected)
    }

    const styleDate = `.DayPicker-Day--highlighted {
        background-color: orange;
        color: black;
      }`;

    const modifiers = {
        highlighted: new Date(selectedDate)
    }

    const today = new Date().toString().substring(8,10);

    return(
        <>
            <ImgContainer>
                <Image src="/images/booking.png" />
            </ImgContainer>
            <PageName>Book an Appointment</PageName>
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
                        {selectedDate.substring(8,10) < today ? <h2>Invalid Date</h2>:
        
                            <TimeContainer onChange={handleSelection}>
                            {loading && <h2>Loading</h2>}
                            {times.map((time) => {
                                if(bookedTimes.includes(time) || loading ){
                                    return(
                                        <Time  key={time} className="disabled" value={`${selectedDate} at ${time}`} >
                                            {selectedDate} at {time}
                                            <Input className="disabled" type="radio" name="time" disabled />
                                        </Time>
                                    ) 
                                }
                                return (
                                    <Time key={time} htmlFor={time} value={`${selectedDate} at ${time}`}>
                                        {selectedDate} at {time}
                                        <Input value={`${selectedDate} at ${time}`} id={time} type="radio" name="time" required ></Input>
                                    </Time>
                                    )
                                })}
                            </TimeContainer>
                        }
                    </>
                    :
                    <H1>No Date Selected</H1>
                }
                <ButtonAndErrMsg>
                    <Button type="submit" className="btn-grad">Book</Button>
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
    list-style: none;
    display: flex;
    justify-content: center;
    color: black;
    padding: 50px;
    margin-bottom: 20px;
    margin-left: -150px;
    background: white;
    border-radius: 10px;

        &.disabled{
            color: white;
            background: grey;
            &:hover{
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
    height: 50px;
    cursor: pointer;
    font-size: 18px;
    
    &.btn-grad {background-image: linear-gradient(to right, #603813 0%, #b29f94  51%, #603813  100%)}
        &.btn-grad {
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #000;
            border-radius: 10px;
            border: none;
            display: block;
        }

        &.btn-grad:hover {
            background-position: right center;
            color: #fff;
            text-decoration: none;
        }
`;

export default BookAppointment;