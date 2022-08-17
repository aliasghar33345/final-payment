import { Pool } from "pg";


export let database = new Pool({
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
