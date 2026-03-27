const mongoose = require("mongoose");

const dbConnect = mongoose.connect(process.env.MONGO_URI)
    .then((conn) => console.log("Database connected: " + conn.connection.host))
    .catch((err) => {
        console.log("Error connecting to database: ", err.message)
    })

module.exports = dbConnect;