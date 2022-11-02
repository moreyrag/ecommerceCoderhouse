import express from "express"
import Inventory from "../controllers/ProductsController.js"
import { validateAdmin } from "../lib/Common.js"

const router = express.Router()

const inventory = new Inventory()

router.get("/", async (req, res) => {
	const products = await inventory.getProducts()
	res.send(products)
})

router.get("/:id", async (req, res) => {
	const product = await inventory.getProductById(req.params.id)
	res.send(product)
})

router.post("/", validateAdmin, async (req, res) => {
    let resultado = await inventory.addProduct(req.body)
    res.send(resultado)
})

router.delete("/:id", validateAdmin, async (req, res) => {
	const product = await inventory.deleteProductById(req.params.id)
	res.send(product)
})

router.put("/:id", validateAdmin, async (req, res) => {
        let newproduct = await inventory.updateProduct(req.params.id, req.body)
        res.send(newproduct)
})

export default router
