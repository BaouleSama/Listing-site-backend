import { Router } from "express"
const db = require("../database")

const router = Router()

// find listing by id 
router.get("/api/listings/:id/", async (req: any, res: any,) => {
    // retrieve id from params
    const { id } = req.params

    // query needed to find element with the same id as the params
    const query = "SELECT * FROM listing WHERE id =?"

    // peform the query with the id. 
    // result is an array contains a row with the id and listings 
    db.query(query, [id], (err, result) => {
        if (err)
            return res.status(500).json({ message: "Server error", error: err })

        // if the id does not match, an empty array will be return 
        if (result.length === 0)
            return res.status(404).json({ message: "Listing is not found" })


        // send the first element of the array result
        return res.status(200).json(result[0])

    })
})


export default router