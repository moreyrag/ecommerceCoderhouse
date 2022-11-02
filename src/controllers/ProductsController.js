import {uri} from '../config/optionsmongodbatlas.js'
import ContainerMongoDbAtlas from '../containers/ContainerProductsMongoDbAtlas.js'

export default class ProductsController extends ContainerMongoDbAtlas{
	constructor (){
		super(uri)
	}

	async getProducts(){
		const products = await this.getAll()
		return products? products: {error: "inventory is empty"}
	}

	async getProductById(id){
		try {
			return await this.getById(id)
		} catch (error) {
			return { error: "product not found" }
		}
		
    }

	async addProduct(product){
		// description, code and stock can be null/empty/undefined
		if (
			product.name !== undefined 
				&& product.name.trim() !== "" 
				&& product.name !== null
				&& product.price !== undefined 
				&& product.price !== "" 
				&& product.price !== null
				&& (parseFloat(product.price)) 
				&& product.image !== undefined 
				&& product.image.trim() !== "" 
				&& product.image !== null
			){

			
				product.timeStamp = new Date(Date.now())

			if (!product.stock){
				product.stock=0
			}

			return await this.saveObject(product) 
		}
		else {
			return { error: "title, price and image can't be empty, and price must be a number" }
		}
	}

	async deleteProductById(id){
		try {
			return await this.deleteById(id)
		} catch (error) {
			return { error: "product not found" }
		}
    }
	async updateProduct(id, product){
		try {
			if (
				(product.name !== undefined && product.name.trim() !== ""  && product.name !== null)
				||
				(product.price !== undefined && product.price !== ""  && product.price !== null && (parseFloat(product.price)))
				||
				(product.image !== undefined && product.image.trim() !== "" && product.image !== null)
			){
				let oldprod = await this.getById(id)

				if (product.name.trim() == "") {product.name = undefined}
				if (product.price.trim() == "") {product.price = undefined}
				if (product.image.trim() == "") {product.image = undefined}

				let newproduct = {
						"name": product.name??oldprod.name, 
						"price": product.price??oldprod.price,
						"image": product.image??oldprod.image, 
						"description": product.description??oldprod.description,
						"code": product.code??oldprod.code, 
						"stock": product.stock??oldprod.stock
				}
				newproduct._id = oldprod._id
				newproduct.timeStamp = oldprod.timeStamp

				await this.updateRow(newproduct)
				return newproduct

			}
			else{
				return { error: "title, price and image can't be empty and price must be a number" }
			}
		} catch (error) {
			return { error: "product not found" }
		}
	}
}
