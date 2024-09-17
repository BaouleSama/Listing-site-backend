import Router from "express"
import { v4 as uuid } from "uuid"

const db = require("../database")
const router = Router()
const admin = require("firebase-admin")


router.post("/api/listings",async (req: any, res: any) => {

    try {

        // retrive the token when user sign in
        const token = req.headers.authtoken

        // verify the user token 
        const user = await admin.auth().verifyIdToken(token)

        // retrieve user input 
        const input = req.body

        // destructurate user input and asign user.user_id to user 
        let {name, description, price, user_id = user.user_id, views=0} = input 

        // assign value to id 
        const id = uuid()

        if (!name || !description || !price)
            return res.status(400).json({ message: "All Field are required" })
    
        // retrieve sql query 
        const query = "INSERT INTO listing (id, name, description, price, user_id, views ) VALUES(?,?,?,?,?,?)"
    
        // run the query 
        db.query(
            query,
            [id, name, description, price,user_id, views],
            (err, results) => {
    
                if (err)
                     return res.status(500).json({ message: "Server error", error: err });
    
                // Return the success response with the inserted row's ID
                return res.status(201).json({
                    message: "Listing created successfully",
                    listingId: results.insertId, // This is the ID of the newly inserted row
                });
            }
    
        )
      
    } catch (error) {
            console.error("Error:", error);
            res.status(403).json({ message: "Unauthorized", error: error });
    }
  
})

export default router
  // // const {id, name, description, price, views, user_id} = req.body
    // const input = req.body
    // let { name, description, price, views = 0, } = input
    

    // const id = uuid()

    // if (!name || !description || !price)
    //     return res.status(400).json({ message: "All Field are required" })

    // const query = "INSERT INTO listing (id, name, description, price, user_id, views ) VALUES(?,?,?,?,?,?)"

    // db.query(
    //     query,
    //     [id, name, description, price, views],
    //     (err, results) => {

    //         if (err)
    //             return res.status(500).json({ message: "Server error", error: err });

    //         // Return the success response with the inserted row's ID
    //         return res.status(201).json({
    //             message: "Listing created successfully",
    //             listingId: results.insertId, // This is the ID of the newly inserted row
    //         });
    //     }

    // )







