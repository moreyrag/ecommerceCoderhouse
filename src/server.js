import express from "express"
import routerCart from "./routes/cartsrouter.js"
import routerInventory from "./routes/inventoryrouter.js"

import routerInventoryFake from "./routes/inventoryrouterfake.js"
import routerMessageCenter from "./routes/messagecenterrouter.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("../public"))
app.use("/api/productos", routerInventory)
app.use("/api/carritos", routerCart)

app.use("/api/productos-test", routerInventoryFake)
app.use("/api/mensajes", routerMessageCenter)

const PORT = 8080

const server = app.listen(PORT, () => {
	console.log(`Http server started on port ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error in server ${error}`))
