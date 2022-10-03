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
// STORE USER DATA IN FILE SYSTEM 
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('data.json', stringifyData)
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
app.post('/user/save', (req, res) => {
    //GET EXISTING USERS 
    const existUsers = getUserData()
    
    //GET THE NEW USER FROM THE GET REQUEST
    const userData = req.body
    //CHECKING ALL THE DATA FILD 
    if (userData.Id ==""|| userData.gender == ""|| userData.name =="" || userData.contact == "" || userData.address == ""| userData.photoUrl == "") {
        return res.status(401).send({...userData,error: true, msg: 'some user data is missing'})
    }
    
    //check if the username exist already
    const findExist = existUsers.find( user => user.Id === userData.Id )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'This user is allready exist'})
    }
    //append the user data
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})
app.get('/', (req, res) => {
    res.send('SERVER IS UP AND RUNNING')
})
app.listen(port,()=>{
console.log(`SERVER IS UP AND RUNNING ${port}`)
})