import express from "express"
import Inventario from "../clases/ProductsInventory.js"
import { validarAdmin } from "../clases/Common.js"

const router = express.Router()
const rutaFileProductos = "./productos.json"

const inventario = new Inventario(rutaFileProductos)


router.get("/", async (req, res) => {
	const productos = await inventario.obtenerProductos()
	res.send(productos)
})

router.get("/:id", async (req, res) => {
	const producto = await inventario.obtenerProductoPorId(req.params.id)
	res.send(producto)
})

router.post("/", validarAdmin, async (req, res) => {
    let resultado = await inventario.agregarProducto(req.body)
    res.send(resultado)
})

router.delete("/:id", validarAdmin, async (req, res) => {
	const producto = await inventario.borrarProductoPorId(req.params.id)
	res.send(producto)
})

router.put("/:id", validarAdmin, async (req, res) => {
        let newproduct = await inventario.actualizaProducto(req.params.id, req.body)
        res.send(newproduct)
})

export default router
