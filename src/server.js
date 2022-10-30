import express from "express"
import routerCarrito from "./routes/carritosrouter.js"
import routerInventario from "./routes/inventariorouter.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("../public"))
app.use("/inventario", routerInventario)
app.use("/carritos", routerCarrito)

const PORT = 8080

const server = app.listen(PORT, () => {
	console.log(`Servidor http iniciado escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en servidor ${error}`))
