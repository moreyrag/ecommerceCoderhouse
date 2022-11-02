import {uri} from '../config/optionsmongodbatlas.js'
import ContainerMongoDbAtlas from '../containers/ContainerCartsMongoDbAtlas.js'

export default class CartsController extends ContainerMongoDbAtlas{
	constructor (){
		super(uri)
	}

	async getCarts(){
		const carts = await this.getAll()
		return carts? carts: {error: "there isn't carts"}
	}

	async getCartById(id){
		try {
			return await this.getById(id)
		} catch (error) {
			return { error: "cart not found" }
		}
		
    }

	async addCart(){
		return await this.saveObject() 
	}

	async deleteCartById(id){
		try {
			return await this.deleteById(id)
		} catch (error) {
			return { error: "cart not found" }
		}
    }
	async updateCart(id, cart){
		try {
			if (
                cart !== undefined
                && cart.products !== undefined
			){
                cart._id = id
				await this.updateRow(cart)
				return cart
			}
			else{
				return { error: "the cart and products must be defined" }
			}
		} catch (error) {
			return { error: "cart not found" }
		}
	}

    async addProductToCart(idProduct, idCart){
        try {
            return await super.addProductToCart(idProduct, idCart)
        } catch (error) {
            return { error: "error trying add product to cart " }
        }
    }
}
