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

        const result = await db.collection("appointments").find({}).toArray()

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

        const { _id } = req.params

        const result = await db.collection("appointments").findOne({ _id });

        if (!result) {
            return res.status(400).json({ status: 400, message: "Couldnt get that appointment"})
        }

        res.status(200).json({ status: 200, message: "Appointment found!", data: result})

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
        
        const newAppointment = { ...req.body, status: "pending" }

        const result = await db.collection("appointments").insertOne(newAppointment)

        if (!result) {
            return res.status(400).json({ message: "Appointment failed"})
        }

        res.status(200).json({ status: 200, message: "Appointment made!", appointment: newAppointment })

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong posting an appointment"})
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

module.exports = {
    addNewAppointment,
    updateAppointment,
    getAppointments,
    getAppointment
}