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

        const userFound = await db.collection("users").findOne({ _id });

        if(userFound){
            return res.status(400).json({ status: 400, message: "User Already exists", userFound});
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

module.exports = {
    addNewUser,
    getUser,
    deleteUser
}