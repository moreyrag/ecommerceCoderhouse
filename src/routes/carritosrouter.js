import express from "express"
import Carritos from "../controllers/BasketsController.js"
import { validarAdmin } from "../lib/Common.js"

const router = express.Router()

const carritos = new Carritos()

router.get("/", async (req, res) => {
	const listaCarritos = await carritos.obtenerBaskets()
	res.send(listaCarritos)
})

router.get("/:id", async (req, res) => {
	const carrito = await carritos.obtenerBasketPorId(req.params.id)
	res.send(carrito)
})

router.post("/", validarAdmin, async (req, res) => {
	const carrito = await carritos.agregarBasket()
	res.send(carrito)
})

router.post("/:idCarrito/productos/:idProducto", validarAdmin, async (req, res) => {
	const respuesta = await carritos.agregarProductoEnCarrito(req.params.idProducto, req.params.idCarrito)
	res.send(respuesta)
})

router.delete("/:id", validarAdmin, async (req, res) => {
	const carrito = await carritos.borrarBasketPorId(req.params.id)
	res.send(carrito)
})

router.put("/:id", validarAdmin, async (req, res) => {
	let newcarrito = await carritos.actualizaBasket(req.params.id, req.body)
	res.send(newcarrito)
})

export default router
