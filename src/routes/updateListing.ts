import Router from "express"

const db = require("../database")
const router = Router()
const admin = require("firebase-admin")

// Update listing by id and with user_id
router.post("/api/listings/:id", async (req: any, res: any) => {

    router.post("/api/listings/:id", async (req: any, res: any) => {
        try {
            // retrieve the updated data
            const input = req.body;

            // retrieve the parameter
            const { id } = req.params;

            // write the queries to find id, update listing with id and user_id and find listing 
            const query1 = "SELECT user_id FROM listing WHERE id = ?";
            const query2 = "UPDATE listing SET name= ?, description=?, price =? WHERE id=? AND user_id = ?";
            const query3 = "SELECT * FROM listing WHERE id =? AND user_id = ?";

            // Destructure input
            const { name, description, price } = input;

            // retrieve token when user signed in
            const token = req.headers.authtoken;

            // verify token is valid 
            const user = await admin.auth().verifyIdToken(token);

            // Validate that the required fields are provided
            if (!name || !description || price === undefined) {
                return res.status(400).json({ message: "Missing required fields: name, description, and/or price" });
            }

            // Convert db.query to a promise-based function
            const dbQuery = (query: string, values: any[]) => {
                return new Promise((resolve, reject) => {
                    db.query(query, values, (err: any, result: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            };

            // get user_id by using listing id
            const results: any = await dbQuery(query1, [id]);

            // verify if the listing exists
            if (results.length === 0) {
                return res.status(400).json({ message: "Listing not found" });
            }

            // Assign user_id to firebase user_id 
            const user_id = user.user_id;

            // Update the listing
            const updatedResult: any = await dbQuery(query2, [name, description, price, id, user_id]);

            // Check if update was actually made
            if (updatedResult.affectedRows === 0) {
                return res.status(400).json({ message: "Unable to update listing" });
            }

            // Retrieve the updated listing
            const finalResult: any = await dbQuery(query3, [id, user_id]);

            // If no updated listing is found (edge case), return an error
            if (finalResult.length === 0) {
                return res.status(404).json({ message: "Listing not found after update" });
            }

            // Return the updated listing as the response
            res.status(200).json(finalResult[0]);

        } catch (error) {
            console.error("Error:", error);
            res.status(403).json({ message: "Unauthorized", error: error });
        }
    });
})

export default router

// // retrieve the updated data
// const input = req.body

// // retrieve the parameter
// const { id } = req.params

// // write the queries to find id, update listing with id and user_id and find listing
// const query1 = "SELECT user_id From listing where id = ?"
// const query2 = "UPDATE listing SET name= ?, description=?, price =? WHERE id=? AND user_id =?"
// const query3 = "SELECT * FROM listing WHERE id =? AND user_id =?"

// // Destructurate input
// let { name, description, price } = input

// // Validate that the required fields are provided
// if (!name || !description || price === undefined) {
//     return res.status(400).json({ message: "Missing required fields: name, description, and/or price" });
// }

// // get user_id by using listing id
// db.query(query1, [id], (err, results) => {

//     if (err) {
//         return res.status(500).json({ message: "Error Server" }, err)
//     }
//     // verify id parametter is valid
//     if (results.length === 0) {
//         return res.status(400).json({ message: " Listing not found" })
//     }

//     // retrieve user_id from array
//     const user_id = user.user_id

//     // update the listing variable
//     db.query(query2, [name, description, price, id, user_id], (err, updatedResult) => {
//         if (err) {
//             return res.status(500).json({ message: "Error Server" }, err)
//         }

//         // check if update was actually made. it should return 1 rows if it was
//         if (updatedResult.affectedRows === 0) {
//             return res.status(400).json({ message: "Unable to update listing" });
//         }

//         // retrieve tje update listing
//         db.query(query3, [id, user_id], (err, finalResult) => {

//             if (err) {
//                 return res.status(500).json({ message: "Error Server", err })
//             }

//             // If no updated listing is found (edge case), return an error
//             if (finalResult.length === 0) {
//                 return res.status(404).json({ message: "Listing not found after update" });
//             }

//             // Return the updated listing as the response
//             res.status(200).json(finalResult[0])
//         })

//     })
// })