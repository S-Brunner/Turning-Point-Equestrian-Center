const path = require('path');
const express = require('express');

require('dotenv').config();

const { addNewUser } = require("./Handlers/userHandlers")

const PORT = 8000;

const app = express();

app.use(express.json());

app.post("/create-user", addNewUser)

app.get("*", (req, res) => {
    res.status(404).json({ status: 404, message: "Page does not exit" });
});

app.listen(PORT, function() {
    console.info('🌍 Listening on port ' + PORT);
});
