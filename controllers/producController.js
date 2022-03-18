const producModels = require ('../Models/producModels')

require('dotenv').config()

const createNewProduc = async (req, res) => {
    const user = await producModels.find().where({ name: req.body.name });
    if (user[0]) return res.status(400).json({error: 'Este producto ya existe '})

    // const password =  await bcryptjs.hash(req.body.password, 10)

    const data ={
        name:req.body.name,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    }

    const newProduc = new producModels(data)
    newProduc.save((error) => {
        if (error) {
          console.log("Oooops, ocurrió un error");
          res.send(error);
        } else {
          console.log("El nuevo producto fué guardado exitosamente !!!");
          return res.status(200).send(newProduc);
        }
      });
} 

const getAllProduc = (req, res) =>{    
    producModels.find().then(response => {
        res.send(response)
    }).catch (error => {
        console.log(error);
    })
}

//-> borrado fisico
const deleteProduc = async (req, res) => {
    try {        
        const produc = await producModels.findByIdAndRemove(req.params.id)
         res.send({ data: produc})
    } catch(error){
        res.status(404).send( { error: "Producto no encontrado!!"})
    }
};

//-> Modificar productos -> cambiar estado 
const updateProduc = async (req, res) => {
    try {
        await producModels.findByIdAndUpdate(req.params.id, req.body)
        res.send({ success: "Producto actualizado correctamente!!" })   
    } catch (error) {
        res.status(404).send({ error: 'Producto no encontrado'})
    }
}


module.exports = {
    createNewProduc,
    getAllProduc,
    deleteProduc,
    updateProduc
}
