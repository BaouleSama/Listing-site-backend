import Router from "express"

const db = require("../database")
const router = Router()
const admin = require("firebase-admin")

router.delete("/api/listings/:id", async (req: any, res: any) => {

    try {

        const token = req.headers.authtoken
        const user = await admin.auth().verifyIdToken(token)
        const user_id = user.user_id

        const { id } = req.params
        const query = "DELETE FROM listing WHERE id = ? AND user_id =?"

        db.query(query, [id, user_id], (err, result) => {

            if (err)
                return res.status(500).json({ message: "Error Server", err })

            if (result.length === 0)
                return res.status(400).json({ Message: "Listing not found" })

            return res.status(200).json({ Message: "Listing has been deleted" })

        })

    } catch (error) {
        console.error("Error:", error);
        res.status(403).json({ message: "Unauthorized", error: error });
    }
    // const { id } = req.params
    // const query = "DELETE FROM listing WHERE id = ?"

    // db.query(query, [id], (err, result) => {

    //     if (err)
    //         return res.status(500).json({ message: "Error Server", err })

    //     if (result.length === 0)
    //         return res.status(400).json({ Message: "Listing not found" })

    //     res.status(200).json({ Message: "Listing has been deleted" })

    // })
})

export default router