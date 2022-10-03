const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000;
const randomUserRoute = require("./routes/v1/user.route");

app.use(cors());
app.use(express.json())

app.use("/user", randomUserRoute)

app.get('/', (req, res) => {
    res.send('SERVER IS UP AND RUNNING')
})
app.listen(port,()=>{
console.log(`SERVER IS UP AND RUNNING ${port}`)
})