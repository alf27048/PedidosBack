const userModels = require('../Models/userModels')
const bcryptjs = require ('bcryptjs')
// const jwt = require('jsonwebtoken')
require('dotenv').config()
const { generateAccessToken } = require("../validate/validations");

const mensajeDeBienvenida = (req, res) => {
    res.send('Rapasando Node')
}

const getAllUsers = (req, res) =>{    
    userModels.find().then(response => {
        res.send(response)
    }).catch (error => {
        console.log(error);
    })
}
const getUserById = async (req, res) => {
  try {
     const user = await userModels.findById(req.params.id)
     res.send({data: user});
  } catch (error) {
      res.status(404).send({ error: "Usuario no encontrado"})
  }    
};
const createNewUser = async (req, res) => {
    const user = await userModels.find().where({ email: req.body.email });
    if (user[0]) return res.status(400).json({error: 'El email ya existe'})

    const password =  await bcryptjs.hash(req.body.password, 10)

    const data ={
        name:req.body.name,
        lastName: req.body.lastName,
        password: password,
        email: req.body.email
    }

    const newUser = new userModels(data)
    newUser.save((error) => {
        if (error) {
          console.log("Oooops, ocurrió un error");
          res.send(error);
        } else {
          console.log("Nuevo usuario guardado exitosamente !!!");
          return res.status(200).send(newUser);
        }
      });
}



const updateUser = async (req, res) => {
    try {
        const user = await userModels.findByIdAndUpdate(req.params.id, req.body)
        res.send({ success: "Usuario actualizado correctamente!!" })   
    } catch (error) {
        res.status(404).send({ error: 'Usuario no encontrado'})
    }
}
//-> borrado fisico
const deleteUser = async (req, res) => {
    try {        
        const user = await userModels.findByIdAndRemove(req.params.id)
         res.send({ data: user})
    } catch(error){
        res.status(404).send( { error: "Usuario no encontrado!!"})
    }
};

// const loginUser = async (req, res) => {
//     const user = await userModels.find().where({email: req.body.email})
//     const hashPassword = user[0].password; 
//     const password = req.body.password
//     const compare = await bcryptjs.compare(password, hashPassword )
//     if(compare){
//         res.json({status: 'ok'})
//     } else {
//         res.json({ status: 'El email o contraseña son incorrectos'})
//     }
// }

const loginUser = async (req, res) => {
    const user = await userModels.find().where({ email: req.body.email });
    if (user[0]) {
      const hashPassword = user[0].password;
  
      const password = req.body.password;
      const compare = await bcryptjs.compare(password, hashPassword);
  
      if (compare) {
        const userData = {
          name: user[0].name,
          lastName: user[0].lastName,
          email: user[0].email,
        };
        const accessToken = await generateAccessToken(userData);
        res.json({ status: "OK", token: accessToken });
      } else {
        res.json({ status: "El email o contraseña son incorrectos" });  
      }
    } else {
      res.json({ status: "El email o contraseña son incorrectos" });
    }
}




// const loginUser = async (req, res) => {  
    
//     const user = await userModels.find().where({ email: req.body.email });
//   if (user[0]) {
//     const hashPassword = user[0].password;

//     const password = req.body.password;
//     const compare = await bcryptjs.compare(password, hashPassword);

//     if (compare) {
//       const userData = {
//         name: user[0].name,
//         lastName: user[0].lastName,
//         email: user[0].email,
//       };
//       const accessToken = await generateAccessToken(userData);
//       res.json({ status: "OK", token: accessToken });
//     } else {
//       res.json({ status: "El email o contraseña son incorrectos" });  
//     }
//   } else {
//     res.json({ status: "El email o contraseña son incorrectos" });
//   }
// }


    // const accessToken = await generateAccessToken()
    // res.send({token: accessToken}); 
    // const user = await userModels.find().where({email: req.body.email})
    // const hashPassword = user[0].password;
    // const password = req.body.password

    // const compare = await bcryptjs.compare(password, hashPassword )
    // if(compare){
    //     res.json({status: 'ok'})
    // } else {
    //     res.json({ status: 'El email o contraseña son incorrectos'})
    // }
//}



module.exports = {
    mensajeDeBienvenida,
    createNewUser, 
    getAllUsers,
    updateUser,
    deleteUser, 
    loginUser,
    getUserById
   
    
}