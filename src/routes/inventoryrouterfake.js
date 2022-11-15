import express from "express"
import Inventory from "../controllers/ProductsControllerFake.js"

const router = express.Router()

const CANT_PRODS_FAKE = 5

export const inventory = new Inventory(CANT_PRODS_FAKE)

/*
router.get("/", async (req, res) => {
	const products = await inventory.getProducts()
	res.send(products)
})
*/

// export default router
