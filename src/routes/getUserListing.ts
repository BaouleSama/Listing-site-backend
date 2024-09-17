import { Router } from "express"

const db = require("../database")
const admin = require("firebase-admin")

const router = Router()


router.get("/api/user/:userId/listing", async (req: any, res: any) => {

    try {

        // retrivr user token 
        const token = req.headers.authtoken
        //Verify that a token was provided 
        if (!token)
            return res.status(401).json({ message: "No token provided" });

        // Check if the token is valid 
        const user = await admin.auth().verifyIdToken(token)
        // retrieve userId from url 
        const { userId } = req.params

        // check if token provided equal to user_id 
        if (user.uid !== userId) {
            return res.status(403).json({ message: "User can only access their own listing" });
        }

        // retrieve the query 
        const query = "SELECT * FROM listing WHERE user_id =?"

        //  submit the query with the paramater 
        db.query(query, [userId], (err, results) => {
            if (err)
                return res.status(500).json({ message: "Error", err })

            if (results.length === 0)
                return res.status(404).json({ message: "Listing not found" })

            res.status(201).json(results)
        })

    }
    // Catch error 
    catch (error) {
        console.error("Error:", error);
        res.status(403).json({ message: "Unauthorized", error: error });
    }

})

export default router

// const token = req.headers.authtoken
// const user = admin.auth().verifyIdToken(token)
// const { userId } = req.params

// if(user.user_id !== userId)
//     throw admin.unauthorized("user can only access their ow listing")
// const query = "SELECT * FROM listing WHERE user_id =?"

// db.query(query, [userId], (err, results) => {
//     if (err)
//         return res.status(500).json({ message: "Error", err })

//     if (results.length === 0)
//         return res.status(404).json({ message: "Listing not found" })

//     res.status(201).json(results)
// })