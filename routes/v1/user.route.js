const express = require("express")
const getDataFromFileSystem = require("../../utiles/getDataFromFileSystem")
const saveDataToFileSystem = require("../../utiles/saveDataToFileSystem")
const randomUserRoute = express.Router()
// GET ALL USER API
/**
 * @api {GET} /user/all
 * @apiDescription GET All USERS
 * @apiParam {number{1-}} {s=1} GET LIMITED USERS YOU WANT 
 * @apiSuccess {Object[]} YOU WILL GET ALL THE USERS YOU WANT 
 */
randomUserRoute.get('/all', (req, res) => {
    const {s} = req.query
    const allUsers = getDataFromFileSystem()
    const result = allUsers.slice(0,s)
    res.json(result)
 })
 /**
 * @api {GET} /user/all?s=1
 * @apiDescription GET All USERS
 * @apiParam {number{1-}} {s=1} GET LIMITED USERS YOU WANT 
 * @apiSuccess {Object[]} YOU WILL GET ALL THE USERS YOU WANT 
 */
 // GET A RANDOM USER API
randomUserRoute.get('/random', (req, res) => {
    const allUsers = getDataFromFileSystem()
    const randomUser =Math.floor(Math.random()*allUsers.length)
    res.json(allUsers[randomUser])
})
 /**
 * @api {POST} /user/save
 * @apiDescription POST a user means you can create a user and store it into database
 * @apiSuccess  YOU CAN CREATE A USER AND STORE IT INTO DATABASE 
 */
randomUserRoute.post('/save', (req, res) => {
    //GET EXISTING USERS 
    const existUsers = getDataFromFileSystem()
    
    //GET THE NEW USER FROM THE GET REQUEST
    const userData = req.body
    //Validate Json File. 
    if (userData.Id ==""|| userData.gender == ""|| userData.name =="" || userData.contact == "" || userData.address == ""| userData.photoUrl == "") {
        return res.status(401).send({error: true, msg: 'some user data is missing', ...userData})
    }
    
    //check if the username exist already
    const findExist = existUsers.find( user => user.Id === userData.Id )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'This user is allready exist'})
    }
    //randomUserRouteend the user data
    existUsers.push(userData)
    //save the new user data
    saveDataToFileSystem(existUsers)
    res.send({success: true, msg: 'User data added successfully'})
})
 /**
 * @api {PATCH} /user/update/:Id
 * @apiDescription PATCH MEANS YOU CAN UPDATE USER DATA 
 * @apiSuccess YOU CAN UPDATE USER DATA VIA USERID WHICH IS ALREADY HAVE  IN DATABASE 
 */
// UPDATE DATA BY USER ID 
randomUserRoute.patch("/update/:Id",(req,res)=>{
    // get the id from params 
    const userId = req.params.Id
    console.log(userId)
    //get the existing user data
    const existUsers = getDataFromFileSystem()
    const userData = req.body
    // finding user from file Json 
    const findUser = existUsers.find(user => user.Id == userId )
    // User not found 
    if (!findUser) {
        return res.status(409).send({error: true, msg: 'There is no user found with is id'})
    }
    const updateUserData = {...findUser, ...userData}
    // Filter Data without this user
    const updateUsers = existUsers.filter( user => user.Id !== +userId )
    console.log(updateUsers)
    // push the updated data
    updateUsers.push(updateUserData)
    // finally save it
     saveDataToFileSystem(updateUsers)
     res.send({success: true, msg: 'User data updated successfully', ...updateUserData})
})
 /**
 * @api {PATCH} /user/bulk-update
 * @apiDescription  YOU CAN UPDATE MULTIPLE USER DATA AT A TIME FOR EXAMPLE YOU WANT TO INCREASE SALARY OF YOUR MEMBERS THEN YOU CAN UPDATE SALARY OF ALL MEMBER AT A TIME 
 * @apiSuccess YOU CAN UPDATE MULTIPLE USER DATA AT A TIME
 */
// BULK--- UPDATE ALL USER  AT A TIME 
randomUserRoute.patch("/bulk-update",(req,res)=>{
    //get the existing user data
    const existUsers = getDataFromFileSystem()
    // Updated user infromation from user 
    const updatedData = req.body

    const updatedUserArray = []
    existUsers.map(user => {
        updatingUser = {...user,...updatedData}
        updatedUserArray.push(updatingUser)
    })
    // console.log(updatedUserArray)
    // finally save it
    saveDataToFileSystem(updatedUserArray)
    res.send({success: true, msg: 'All user data  updated successfully', ...updatedUserArray})
})
/**
 * @api {DELETE} /user/all?s=1
 * @apiDescription YOU CAN DELETE USER FROM DATABASE VIA ID  
 * @apiSuccess YOU WILL DELETE  THE USERS YOU WANT 
 */
// DELETE USER BY ID 
randomUserRoute.delete('/delete/:Id', (req, res) => {
    const userId = req.params.Id
    const allUsers = getDataFromFileSystem()
    // const findUser  =allUsers.find(user => user.Id === +userId)
    const updatedUserArray = allUsers.filter(user => user.Id !== +userId)
    // finally save it
    saveDataToFileSystem(updatedUserArray)
    res.send({success: true, msg: 'Deleted The User ', ...updatedUserArray})
})

module.exports = randomUserRoute;