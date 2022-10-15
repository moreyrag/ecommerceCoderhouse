import express from "express"
import Carritos from "../clases/Baskets.js"
import { validarAdmin } from "../clases/Common.js"

const router = express.Router()
const rutaFileCarritos = "./carritos.json"
const rutaFileProductos = "./productos.json"

const carritos = new Carritos(rutaFileProductos, rutaFileCarritos)

router.get("/", async (req, res) => {
	const listaCarritos = await carritos.obtenerCarritos()
	res.send(listaCarritos)
})

router.get("/:id", async (req, res) => {
	const carrito = await carritos.obtenerCarritoPorId(req.params.id)
	res.send(carrito)
})

router.post("/", validarAdmin, async (req, res) => {
	const carrito = await carritos.crearCarrito()
	res.send(carrito)
})

router.post("/:idCarrito/productos/:idProducto", validarAdmin, async (req, res) => {
	const respuesta = await carritos.agregarProductoEnCarrito(req.params.idProducto, req.params.idCarrito)
	res.send(respuesta)
})

router.delete("/:id", validarAdmin, async (req, res) => {
	const carrito = await carritos.borrarCarritoPorId(req.params.id)
	res.send(carrito)
})

router.put("/:id", validarAdmin, async (req, res) => {
	let newcarrito = await carritos.actualizaCarrito(req.params.id, req.body)
	res.send(newcarrito)
})

export default router
