const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// Declare instance of express app
const app = express();

// MySQL/Sequelize config
const db = require("./models");
const Role = db.role;

/**
 * While in DEVELOPMENT every time you start up the server
 * it will drop the existing tables and create the new ones.
 * If to be used in PRODUCTION remove the {force: true} parameter
 * from the sync() function. Beforehand create the tables manually.
 */
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync DB");
    dbInitial();
});

function dbInitial() {
    Role.create({
        id: 1,
        name: "user",
    });
    Role.create({
        id: 2,
        name: "moderator",
    });
    Role.create({
        id: 3,
        name: "admin",
    });
}

/**
 * Middlware
 */
//  Cors
var corsOptions = {
    origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Helmet
app.use(helmet());

/**
 * Routes
 */
// API Home Endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Hit home endpoint",
    });
});
// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8081;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
