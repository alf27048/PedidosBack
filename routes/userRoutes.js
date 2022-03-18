const express = require('express');
const userRoutes = express.Router();
const { mensajeDeBienvenida, 
    createNewUser, getAllUsers, 
    updateUser, 
    deleteUser,
    loginUser
     } = require('../controllers/userController');
const { verifyToken } = require("../validate/validations");     

userRoutes.get('/', mensajeDeBienvenida)

userRoutes.post('/registro', createNewUser)

//userRoutes.get('/allUsers', getAllUsers)

userRoutes.get("/allUser", verifyToken, getAllUsers);

userRoutes.put('/updateUser/:id', updateUser)

userRoutes.delete('/deleteUser/:id', deleteUser)

userRoutes.post('/loggin', loginUser);

module.exports = userRoutes