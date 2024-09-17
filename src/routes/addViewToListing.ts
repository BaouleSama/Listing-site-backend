import { Router } from "express"
const db = require("../database")

const router = Router()

// Update views count
router.post("/api/listings/:id/add-view", (req: any, res: any) => {

    // get the id parameter, and the queries
    // We will need tow queries
    const { id } = req.params
    const queryUpdate = "UPDATE listing SET views=views+1 Where id =?"
    const query = "SELECT * FROM listing WHERE id =?"

    // update the listing by using his id 
    db.query(queryUpdate, [id], (err, results) => {
        if (err)
            return res.status(500).json({ message: "Server error", error: err })

        // mmake sure the id use is correct. IF it is,  affectedRow should return 1
        if (results.affectedRows === 0)
            return res.status(404).json({ message: "Listing not found" })

        // now query to find to return the updated listing 
        db.query(query, [id], (err, updatedResults) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching updated data", error: err });
            }

            // return the result
            return res.status(200).json({
                message: "Views updated successfully",
                updatedListing: updatedResults[0]  // The updated listing data
            });
        })
    })




})

export default router;