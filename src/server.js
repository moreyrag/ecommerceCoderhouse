import express from "express"
import routerCart from "./routes/cartsrouter.js"
import routerInventory from "./routes/inventoryrouter.js"
import routerMessageCenter from "./routes/messagecenterrouter.js"
import routerSession from "./routes/sessionrouter.js"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("../public"))
app.use("/api/productos", routerInventory)
app.use("/api/carritos", routerCart)
app.use("/api/mensajes", routerMessageCenter)
app.use("/", routerSession)

const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
	console.log(`Http server started on port ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error in server ${error}`))
