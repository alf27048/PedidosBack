const pedidoModels = require ('../Models/pedidoModels')

require('dotenv').config()

const createNewPedido = async (req, res) => {
    // const user = await pedidoModels.find().where({ name: req.body.name });
    // if (user[0]) return res.status(400).json({error: 'Este pedido ya existe '})

    // const password =  await bcryptjs.hash(req.body.password, 10)

    const data ={
        producto:req.body.producto,
        descripcion: req.body.descripcion,
        nombre: req.body.nombre,
        precio: req.body.precio,
        estado: req.body.estado,
        fechaInicio: req.body.fechaInicio,
        fechaEntrega: req.body.fechaEntrega
    }

    const newPedido = new pedidoModels(data)
    newPedido.save((error) => {
        if (error) {
          console.log("Oooops, ocurrió un error");
          res.send(error);
        } else {
          console.log("El nuevo pedido fué guardado exitosamente !!!");
          return res.status(200).send(newPedido);
        }
      });
} 

const getAllPedido = (req, res) =>{    
    pedidoModels.find().then(response => {
        res.send(response)
    }).catch (error => {
        console.log(error);
    })
}

const getPedidoById = async (req, res) => {
    try {
       const pedido = await pedidoModels.findById(req.params.id)
       res.send({data: pedido});
    } catch (error) {
        res.status(404).send({ error: "Pedido no encontrado"})
    }    
  };

const getPedidosPendientes = async (req, res) => {
    try {
       const pedido = await pedidoModels.findById(req.params.id)
       res.send({data: pedido});
    } catch (error) {
        res.status(404).send({ error: "Pedido no encontrado"})
    }    
  };
  const getPedidosEntregados = async (req, res) => {
    try {
       const pedido = await pedidoModels.findById(req.params.id)
       res.send({data: pedido});
    } catch (error) {
        res.status(404).send({ error: "Pedido no encontrado"})
    }    
  };




//-> borrado fisico
const deletePedido = async (req, res) => {
    try {        
        const pedido = await pedidoModels.findByIdAndRemove(req.params.id)
         res.send({ data: pedido})
    } catch(error){
        res.status(404).send( { error: "Pedido no encontrado!!"})
    }
};

//-> Modificar pedidos -> cambiar estado 
const updatePedido = async (req, res) => {
    try {
        await pedidoModels.findByIdAndUpdate(req.params.id, req.body)
        res.send({ success: "Pedido actualizado correctamente!!" })   
    } catch (error) {
        res.status(404).send({ error: 'Pedido no encontrado'})
    }
}


module.exports = {
    createNewPedido,
    getAllPedido,
    deletePedido,
    updatePedido,
    getPedidoById,
    getPedidosPendientes,
    getPedidosEntregados
}