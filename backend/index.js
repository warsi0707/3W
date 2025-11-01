require('dotenv').config()
const express = require('express')
const ConnectDB = require('./utils/ConnectDB')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const app = express()
const cors = require('cors')
const path = require('path')

ConnectDB()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.static(path.join(__dirname,"frontend","dist")))
app.use(express.json())
app.all("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)

app.get("{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist'))
})

const main =()=>{
    app.listen(3000)
    console.log("App listing on port 3000")
}
main()