import { Router } from "express"


const db = require("../database")

const router = Router()

router.get("/api/listings", (req: any, res: any) => {
    const query = "SELECT * FROM listing"

    db.query(query, (err, result) => {
        if (err)
            return res.status(500).json({ message: "Error Server" }, err)

        if (result.length === 0)
            return res.status(500).json("Listing not found")

        return res.status(200).json(result)
    })

})

export default router
