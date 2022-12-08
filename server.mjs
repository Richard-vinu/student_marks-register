import dotenv  from "dotenv"
import express from "express"
import  route from './src/routes/route.js'
import DB from './src/database/db.js'
dotenv.config()

const app = express()
app.use(express.json())
const port = process.env.PORT 
DB();

app.use('/',route)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})