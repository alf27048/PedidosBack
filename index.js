const express = require('express')
const app = express()
require('dotenv').config()
require('./config/database')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const producRoutes = require('./routes/producRoutes')
const pedidoRoutes = require('./routes/pedidoRoutes')


app.use(express.json())

app.use(cors());

app.use('/users', userRoutes)
app.use('/produc', producRoutes)
app.use('/pedido', pedidoRoutes)


	app.listen(process.env.port, () => {
    		console.log(`Servidor corriendo en puerto ${process.env.port}`);
	})

    app.get('/', (req, res) => {
		console.log(`Servidor corriendo en puerto ${process.env.port}...`)
	})

    