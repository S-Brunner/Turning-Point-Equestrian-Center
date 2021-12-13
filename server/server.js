const path = require('path');
const express = require('express');

require('dotenv').config();

const { 
    addNewUser,
    getUser,
    deleteUser,
    getAllUsers
} = require("./Handlers/userHandlers");

const { 
    addNewAppointment,
    acceptAppointment,
    getAppointments,
    getAppointment,
    deleteAppointmentByStatus,
    getAppointmentByDate,
    getAllAccepted,
    getAllDeclined,
    declineAppointment,
    deleteAppointment
} = require('./Handlers/appointmentHandlers');

const PORT = 8000;

const app = express();

app.use(express.json());

// Endpoints for Users ///////////////////
app.get("/users", getAllUsers)
app.get("/user/:_id", getUser)
app.post("/create-user", addNewUser)
app.delete("/user/delete/:_id", deleteUser)
//////////////////////////////////////////

// Endpoints for Appointments ////////////////////////////
app.get("/appointments", getAppointments)
app.get("/appointments/accepted", getAllAccepted)
app.get("/appointments/declined", getAllDeclined)
app.delete("/appointment/delete/:id", deleteAppointment)
app.get("/appointment/:name", getAppointment)
app.get("/appointment-by-date/:date", getAppointmentByDate)
app.post("/create/new-appointment", addNewAppointment)
app.patch("/accept/appointment/:id", acceptAppointment)
app.patch("/decline/appointment/:id", declineAppointment)
app.delete("/delete/appointment/:status/:id", deleteAppointmentByStatus)
//////////////////////////////////////////////////////////
app.get("*", (req, res) => {
    res.status(404).json({ status: 404, message: "Page does not exit" });
});

app.listen(PORT, function() {
    console.info('🌍 Listening on port ' + PORT);
});
