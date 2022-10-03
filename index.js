const express = require('express')
const app = express()
const cors = require("cors")
const fs = require("fs")
const port = process.env.PORT || 5000;
const randomUserRoute = require("./routes/v1/user.route");

app.use(cors());
app.use(express());
app.use(express.json())

//GET USER DATA FROM FILE SYSTEM
const getUserData = () => {
    const jsonData = fs.readFileSync('data.json')
    return JSON.parse(jsonData)    
}
// GET ALL USER API
app.get('/user/all', (req, res) => {
        const {s} = req.query
        const allUsers = getUserData()
        const result = allUsers.slice(0,s)
        res.json(result)
     })
// GET A RANDOM USER API
app.get('/user/random', (req, res) => {
    const allUsers = getUserData()
    const randomUser =Math.floor(Math.random()*allUsers.length)
    res.json(allUsers[randomUser])
})
app.use('/api/v1/user',randomUserRoute)
app.get('/', (req, res) => {
    res.send('SERVER IS UP AND RUNNING')
})
app.listen(port,()=>{
console.log(`SERVER IS UP AND RUNNING ${port}`)
})