const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require('./config/db.config.js');
const corsMiddleware = require("./middlewares/cors.middleware.js")

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/v1/users", require("./routes/users.route.js"));
app.use("/api/v1/auth", require("./routes/auth.route.js"));
app.use("/api/v1/products", require("./routes/products.route.js"));
app.use("/api/v1/orders", require("./routes/orders.route.js"));

const errorHandler = require("./middlewares/errorHandler.middleware.js")
app.use(errorHandler)
const port = process.env.PORT

const init = async () => {
    await dbConnect;
    app.listen(port, () => {
        console.log("server listening on port " + port);
    });
}
init();
