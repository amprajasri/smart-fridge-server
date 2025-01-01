const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:VUKM7cdPseS6@ep-shy-sky-a4maxx4l-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

export default pool