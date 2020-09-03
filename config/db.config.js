/**
 * Configuring MySQL database
 */

module.exports = {
    HOST: process.env.MONGO_URI_TEST,
    PORT: process.env.DB_USER,
    DB: process.env.MONGO_DB_NAME,
};
