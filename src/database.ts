const mysql = require("mysql")
require("dotenv").config()

// import credentoial from .env
const pwd = process.env.DB_PASSWORD
const port = process.env.DB_PORT
const user = process.env.DB_USER
const database = process.env.DB_DATABASE
const host = process.env.DB_HOST

const db = mysql.createConnection({
    host: host,
    user: user,
    password: pwd,
    database: database,
    port: port
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db


