require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAppointments = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint")

        const result = await db.collection("appointments").findOne({ _id : "P" });

        if (!result) {
            res.status(400).json({ status: 400, message: "Couldnt get appointments"})
        }

        res.status(200).json({ status: 200, message: "Appointments found", data: result})

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong posting an appointment"})
    }
}

const getAppointment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint");

        const { name } = req.params
        
        const usersAppointments = []

        const pending = await db.collection("appointments").findOne({ _id: "P" });

        pending.appointments.map((appointment) => {
            if(appointment.name.includes(name)){
                usersAppointments.push(appointment)
            }
        })

        const accepted = await db.collection("appointments").findOne({ _id : "A" });

        accepted.appointments.map((appointment) => {
            if(appointment.name.includes(name)){
                usersAppointments.push(appointment)
            }
        })

        res.status(200).json({ status: 200, message: "Appointment found!", data: usersAppointments})

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong posting an appointment"});
    }
}


const addNewAppointment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint")
        
        const newAppointment = { ...req.body, status: "Pending" }

        const result = await db.collection("appointments").findOneAndUpdate({ _id : "P" }, { $push : { appointments : newAppointment}})

        if (!result) {
            return res.status(400).json({ message: "Appointment failed"})
        }

        res.status(200).json({ status: 200, message: "Appointment made!", appointment: newAppointment })

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong posting an appointment"}, error)
    }
}

const updateAppointment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint");

        const { _id } = req.params

        const result = await db.collection("appointments").updateOne({ _id }, { $set: { ...req.body }})

        if (!result) {
            return res.status(400).json({ status: 400, message: "Couldn't update appointment"});        
        }
        
        res.status(200).json({ status: 200, message: "Appointment Updated", data: result})

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong updating appointment"})
    }
}

const deleteAppointment = async (req, res) => {
    const client  = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint");

        const { status } = req.params
        const { id } = req.params

        const result = await db.collection("appointments").updateOne({  _id: status }, { $pull: { appointments :{ id }}});

        if (result.modifiedCount === 0) {
            return res.status(400).json({ status: 400, message: "Couldn't delete appointment"});  
        }

        res.status(200).json({ status: 200, message: "Appointment deleted", data: result});

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong deleting appointment"})
    }
}

const getAppointmentByDate = async (req, res) => {
    const client  = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const timesTaken = []

        const db = client.db("turningPoint")

        const { date } = req.params

        const allPending = await db.collection("appointments").findOne({ _id : "P" });

        allPending.appointments.map((appointment) => {
            if(appointment.date.includes(date)){
                timesTaken.push(appointment.time)
            }
        })

        const allAccepted = await db.collection("appointments").findOne({ _id : "A" })

        allAccepted.appointments.map((appointment) => {
            if(appointment.date.includes(date)){
                timesTaken.push(appointment.time)
            }
        })

        res.status(200).json({ status: 200, message: "Appointment Found", data: timesTaken});
        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong getting appointment by date"})
    }
}

const getAllAccepted = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint")

        const result = await db.collection("appointments").findOne({ _id : "A" });

        if (!result) {
            res.status(400).json({ status: 400, message: "Couldnt get accepted appointments"})
        }

        res.status(200).json({ status: 200, message: "Appointments found", data: result})

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong getting accepted appointments"})
    }
}

const getAllDeclined = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint")

        const result = await db.collection("appointments").findOne({ _id : "D" });

        if (!result) {
            res.status(400).json({ status: 400, message: "Couldnt get declined appointments"})
        }

        res.status(200).json({ status: 200, message: "Appointments found", data: result})

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong getting declined appointments"})
    }
}

module.exports = {
    addNewAppointment,
    updateAppointment,
    getAppointments,
    getAppointment,
    deleteAppointment,
    getAppointmentByDate,
    getAllAccepted,
    getAllDeclined
}