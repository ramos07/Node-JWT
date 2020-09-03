const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// Declare instance of express app
const app = express();

// Mongoose config
const db = require("./models");
const Role = db.role;

db.mongoose
    .connect(process.env.MONGO_URI_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Successfully connected to MongoDB");
        initial();
    })
    .catch((error) => {
        console.error("Connection error", error);
        process.exit(1);
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.error("Error", err);
                }
                console.log("Added 'user' to roles collection");
            });
            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.error("Error", err);
                }
                console.log("Added 'moderator' to roles collection");
            });
            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.error("Error", err);
                }
                console.log("Added 'admin' to roles collection");
            });
        }
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
