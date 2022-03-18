const express = require ('express')
const pedidoRoutes = express.Router();
const { 
    createNewPedido,
    getAllPedido,
    deletePedido,
    updatePedido
} = require ('../controllers/pedidoController')

pedidoRoutes.post('/regisPedido', createNewPedido)

pedidoRoutes.delete('/deletePedido/:id', deletePedido)

pedidoRoutes.get('/allPedido', getAllPedido)

pedidoRoutes.put('/updatePedido/:id', updatePedido)



module.exports = pedidoRoutes