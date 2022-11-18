import express from "express"
import Carts from "../controllers/CartsController.js"
import { validateAdmin } from "../lib/Common.js"

const router = express.Router()

const carts = new Carts()

router.get("/", async (req, res) => {
	const cartsList = await carts.getCarts()
	res.send(cartsList)
})

router.get("/:id", async (req, res) => {
	const cart = await carts.getCartById(req.params.id)
	res.send(cart)
})

router.post("/", validateAdmin, async (req, res) => {
	const cart = await carts.addCart()
	res.send(cart)
})

router.post("/:idCart/products/:idProduct", validateAdmin, async (req, res) => {
	const response = await carts.addProductToCart(req.params.idProduct, req.params.idCart)
	res.send(response)
})

router.delete("/:id", validateAdmin, async (req, res) => {
	const cart = await carts.deleteCartById(req.params.id)
	res.send(cart)
})

router.put("/:id", validateAdmin, async (req, res) => {
	let newcart = await carts.updateCart(req.params.id, req.body)
	res.send(newcart)
})

export default router
