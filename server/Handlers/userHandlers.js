require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addNewUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("turningPoint");

        const _id = req.body._id

        const foundClient = await db.collection("users").findOne({ _id });

        if(foundClient){
            return res.status(200).json({ status: 200, message: `Welcome back ${req.body.name}`, role: "Client" });
        }

        const foundManagement = await db.collection("management").findOne({ _id });

        if(foundManagement){
            return res.status(200).json({ status: 200, message: `Welcome back ${req.body.name}`, role: "Management" });
        }

        const result = await db.collection("users").insertOne(req.body)

        res.status(200).json({ status: 200, message: "Succsess", result});

        client.close()
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Somthing went wrong", error})
    }
}

const getUser = async (req, res) => {
        const client = new MongoClient(MONGO_URI, options)
    
        try {
            await client.connect();
    
            const db = client.db("turningPoint");

            const { _id } = req.params;
    
            const result = await db.collection("users").findOne({ _id });

            if(!result){
                return res.status(400).json({ status: 400, message: "No user found"}); 
            }

            res.status(200).json({ status: 200, message: "User found :)", data: result });

            client.close();
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: 400, message: "Someothing went wrong getting the user :/"});
        }
    }

const deleteUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint");

        const { _id } = req.params;

        const result = await db.collection("users").deleteOne({ _id })

        if(!result){
            return res.status(400).json({ status: 400, message: "No user found"}); 
        }

        res.status(200).json({ status: 200, message: "User Deleted", data: result })

        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Someothing went wrong getting the user :/"});
    }
}

const getAllUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("turningPoint");

        const result = await db.collection("users").find({}).toArray();

        if(!result){
            return res.status(400).json({ status: 400, message: "All users not found"}); 
        }

        res.status(200).json({ status: 200, message: "All users found", data: result})
        
        client.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Someothing went wrong getting all users :/"});
    }
}


module.exports = {
    addNewUser,
    getUser,
    deleteUser,
    getAllUsers
}