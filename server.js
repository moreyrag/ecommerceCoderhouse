import express from "express"
// import routerCarrito from "./rutas/carritosrouter.js"
// import routerInventario from "./rutas/inventariorouter.js"

import InventarioProductos from './clases/ProductsInventory.js'
import Producto from './clases/Product.js'
// import Contenedor from './clases/FileManager.js'

import { Server as IOServer } from "socket.io"
import { Server as HttpServer } from "http"

import {optionsMariaDb} from './optionsmariaDb.js'
import {optionsSqliteDb} from './optionssqllite3.js'
import DbManager from "./clases/DbManager.js"

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/*
const rutaFileProductos= "./productos.json"
let inventario = new InventarioProductos(rutaFileProductos)
const rutaFileMensajes= "./mensajes.json"
let cont = new Contenedor(rutaFileMensajes)
*/

const tablaProductos = "productos"
const tablaMensajes = "mensajes"

let inventario = new InventarioProductos(optionsMariaDb, tablaProductos)
let cont = new DbManager(optionsSqliteDb, tablaMensajes)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))


/*
app.use("/inventario", routerInventario)
app.use("/carritos", routerCarrito)
*/

const PORT = 8080

/*
const server = app.listen(PORT, () => {
	console.log(`Servidor http iniciado escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en servidor ${error}`))
*/

io.on("connection",  async (socket) => {
	// console.log("se conecto un usuario")

	let productos = await inventario.obtenerProductos()
	let mensajes = await cont.getAll()

	// console.log(mensajes)

	socket.emit("getproductos", productos)

	socket.on("nuevoproducto", async (data) => {
        let producto = new Producto(data.nombre, data.precio, data.foto, data.descripcion, data.codigo, data.stock)
        await inventario.agregarProducto(producto)
		productos = await inventario.obtenerProductos()
        io.sockets.emit("getproductos", productos)
	})

    socket.emit("getmensajes", mensajes)

	socket.on("nuevomensaje", async (data) => {
        data.fechaHora = new Date().toLocaleString()
		// mensajes.push(data)
		// await cont.saveObject(data)
		

        cont.saveObject(data).then(async ()=>{
			mensajes = await cont.getAll()
		    io.sockets.emit("getmensajes", mensajes)
		})
	})
})

httpServer.listen(PORT, () => console.log("servidor levantado"))


/*
casync obtenerProductos(){
		const productos = await this.db.getAll()
		return productos? productos: {error: "inventario vacio"}
	}
*/