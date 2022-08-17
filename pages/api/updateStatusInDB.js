import { database } from "../../config"

export default async function handler(req, res) {
    const { id, status } = req.body
    database.query(`UPDATE Payments
    SET status = '${status}'
    WHERE correlationID = '${id}'`, (error, results) => {
        if (error) {
            res.status(400).json({
                error: error,
            })
        } else {
            res.status(200).json({
                message: 'success'
            })
        }
    })

}