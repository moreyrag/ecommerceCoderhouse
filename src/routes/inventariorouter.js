import express from "express"
import Inventario from "../controllers/ProductsController.js"
import { validarAdmin } from "../lib/Common.js"

const router = express.Router()

const inventario = new Inventario()

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
