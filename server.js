const express = require("express")
const app = express()
const port = 3000
const router = require("./routes/index")

app.use(express.json())
app.use(router)

app.listen(port, ()=>{
    console.info(`Our port runnin on port ${port}`)
})