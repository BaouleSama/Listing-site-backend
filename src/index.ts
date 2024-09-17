import getAllListing from "./routes/getAllListing"
import getListingById from "./routes/getListingById"
import addViewToListing from "./routes/addViewToListing"
import getUserListing from "./routes/getUserListing"
import createNewListing from "./routes/createNewListing"
import updateListing from "./routes/updateListing"
import deleteListing from "./routes/deleteListings"



const express = require("express")
const app = express()
const port = 8000
const db = require("./database")
const cors = require("cors")
const admin = require("firebase-admin")
const key = require("./credentials.json")



app.use(express.json())
app.use(cors({
    origin: "http://localhost:4200"
}))



app.use("/", getAllListing)
app.use("/", getListingById)
app.use("/", addViewToListing)
app.use("/", getUserListing)
app.use("/", createNewListing)
app.use("/", updateListing)
app.use("/", deleteListing)

admin.initializeApp({
    credentials: admin.credential.cert(key),
    projectId: "buy-and-sell-d3351"
}
)

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})

// Gracefully shutdown the server and close the MySQL connection
const shutdown = () => {
    console.log('Shutting down gracefully...');
    // Close MySQL connection
    db.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection: ', err);
        } else {
            console.log('MySQL connection closed');
        }
        // Close the server
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
    // If db.end() hangs for some reason, forcefully exit after a timeout (optional)
    setTimeout(() => {
        console.error('Forcing shutdown after 5 seconds...');
        process.exit(1); // Exit with error code 1 (force shutdown)
    }, 5000); // Wait for 5 seconds before forcing shutdown
}

// Listen for termination signals (Ctrl+C or kill command)
process.on('SIGINT', shutdown); // For Ctrl+C in terminal
process.on('SIGTERM', shutdown); // For process termination (e.g., Docker, Kubernetes)

// Handle uncaught exceptions (optional)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    shutdown(); // Gracefully shut down after error
});