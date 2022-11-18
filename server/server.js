import express from "express"
import routerCart from "./src/routes/cartsrouter.js"
import routerInventory from "./src/routes/inventoryrouter.js"
import routerMessageCenter from "./src/routes/messagecenterrouter.js"
import routerSession from "./src/routes/sessionrouter.js"
import cors from 'cors'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(express.static("../public"))
app.use("/api/productos", routerInventory)
app.use("/api/carritos", routerCart)
app.use("/api/mensajes", routerMessageCenter)
app.use("/", routerSession)
app.use(cors())

const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
	console.log(`Http server started on port ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error in server ${error}`))
