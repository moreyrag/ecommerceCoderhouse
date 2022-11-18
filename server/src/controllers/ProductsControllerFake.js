import ContainerProductsFake from '../containers/ContainerProductsFake.js'

export default class ProductsControllerFake extends ContainerProductsFake{
	constructor (cantidad){
		super(cantidad)
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
}
