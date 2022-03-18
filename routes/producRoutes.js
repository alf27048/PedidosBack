const express = require ('express')
const producRoutes = express.Router();
const { 
    createNewProduc,
    getAllProduc,
    deleteProduc,
    updateProduc
} = require ('../controllers/producController')

producRoutes.post('/regisProduc', createNewProduc)

producRoutes.delete('/deleteProduc/:id', deleteProduc)

producRoutes.get('/allProduc', getAllProduc)

producRoutes.put('/updateProduc/:id', updateProduc)



module.exports = producRoutes