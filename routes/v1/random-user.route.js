const express = require("express")
const randomUserRoute = express.Router()

//CREATING A RANDOM USER API [GET A  RANDOM USER]
randomUserRoute.get('/',(req, res)=>{
res.send('picked a random user from api')
})

module.exports = randomUserRoute;