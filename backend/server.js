const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const colors = require("colors")
const { dot } = require("node:test/reporters")
const connectDb = require("./config/connectDB")

// config dotenv file
dotenv.config()
// dataBase Call
connectDb()


//rest object
const app = express()

// midleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// routes
// user route

app.use('/api/v1/users', require('./routes/userRoute'))
// transaction route
app.use('/api/v1/transections', require('./routes/transectionRoute'))


// port
const PORT = 8080 || process.env.PORT

// listen server
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})