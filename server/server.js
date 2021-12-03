const path = require('path');
const express = require('express');

const PORT = 8000;

var app = express();

app.use(express.json());


app.get("*", (req, res) => {
    res.status(404).json({ status: 404, message: "Page does not exit" });
});

app.listen(PORT, function() {
    console.info('🌍 Listening on port ' + PORT);
});
