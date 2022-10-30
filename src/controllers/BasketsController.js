import {uri} from '../config/optionsmongodbatlas.js'
import ContainerMongoDbAtlas from '../containers/ContainerBasketsMongoDbAtlas.js'

export default class BasketsController extends ContainerMongoDbAtlas{
	constructor (){
		super(uri)
	}

	async obtenerBaskets(){
		const baskets = await this.getAll()
		return baskets? baskets: {error: "no hay carritos"}
	}

	async obtenerBasketPorId(id){
		try {
			return await this.getById(id)
		} catch (error) {
			return { error: "carrito no encontrado" }
		}
		
    }

	async agregarBasket(){
		return await this.saveObject() 
	}

	async borrarBasketPorId(id){
		try {
			return await this.deleteById(id)
		} catch (error) {
			return { error: "carrito no encontrado" }
		}
    }
	async actualizaBasket(id, carrito){
		try {
			if (
                carrito !== undefined
                && carrito.productos !== undefined
			){
                carrito._id = id
				await this.updateRow(carrito)
				return carrito
			}
			else{
				return { error: "el carrito y productos deben estar definidos" }
			}
		} catch (error) {
			return { error: "producto no encontrado" }
		}
	}

    async agregarProductoEnCarrito(idProducto, idCarrito){
        try {
            return await this.addProductInBasket(idProducto, idCarrito)
        } catch (error) {
            return { error: "error al agregar el producto al carrito " }
        }
    }
}
