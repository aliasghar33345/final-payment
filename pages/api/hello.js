// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Pool } from "pg"

// import { database } from "../../config"

let database = new Pool({
  // user: 'admin',
  // password: 'admin',
  // host: '165.22.48.91',
  // database: 'hello_world',
  // port: 8069

  user: 'doadmin', // user
  password: 'AVNS_byEqrTJZHuU5IKiedzW', // password
  host: 'db-postgresql-sfo3-79839-do-user-11358779-0.b.db.ondigitalocean.com', // host
  database: 'defaultdb', // database name
  port: 25060, // port
  ssl: { rejectUnauthorized: false },
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

export default async function handler(req, res) {
  await database.connect()
  database.query('SELECT * from Payments', (error, results) => {
    try {
      console.log(error)
      console.log(results)
      res.status(200).json(results.rows)

    } catch (err) {

      res.status(400).json(error)
    }
  })
  // res.status(200).json({ name: 'John Doe' })
}
