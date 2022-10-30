import {uri} from '../config/optionsmongodbatlas.js'
import ContainerMongoDbAtlas from '../containers/ContainerProductsMongoDbAtlas.js'

export default class ProductsController extends ContainerMongoDbAtlas{
	constructor (){
		super(uri)
	}

	async obtenerProductos(){
		const productos = await this.getAll()
		return productos? productos: {error: "inventario vacio"}
	}

	async obtenerProductoPorId(id){
		try {
			return await this.getById(id)
		} catch (error) {
			return { error: "producto no encontrado" }
		}
		
    }

	async agregarProducto(producto){
		// descripcion, codigo y stock pueden venir en null/vacios/undefined
		if (
				producto.nombre !== undefined 
				&& producto.nombre.trim() !== "" 
				&& producto.nombre !== null
				&& producto.precio !== undefined 
				&& producto.precio !== "" 
				&& producto.precio !== null
				&& (parseFloat(producto.precio)) 
				&& producto.foto !== undefined 
				&& producto.foto.trim() !== "" 
				&& producto.foto !== null
			){

			
			producto.timeStamp = new Date(Date.now())

			if (!producto.stock){
				producto.stock=0
			}

			return await this.saveObject(producto) 
		}
		else {
			return { error: "titulo, precio e imagen no pueden estar vacias y precio debe ser un numero" }
		}
	}

	async borrarProductoPorId(id){
		try {
			return await this.deleteById(id)
		} catch (error) {
			return { error: "producto no encontrado" }
		}
    }
	async actualizaProducto(id, producto){
		try {
			if (
				(producto.nombre !== undefined && producto.nombre.trim() !== ""  && producto.nombre !== null)
				||
				(producto.precio !== undefined && producto.precio !== ""  && producto.precio !== null && (parseFloat(producto.precio)))
				||
				(producto.foto !== undefined && producto.foto.trim() !== "" && producto.foto !== null)
			){
				let oldprod = await this.getById(id)

				if (producto.nombre.trim() == "") {producto.nombre = undefined}
				if (producto.precio.trim() == "") {producto.precio = undefined}
				if (producto.foto.trim() == "") {producto.foto = undefined}

				let newproduct = {
						"nombre": producto.nombre??oldprod.nombre, 
						"precio": producto.precio??oldprod.precio,
						"foto": producto.foto??oldprod.foto, 
						"descripcion": producto.descripcion??oldprod.descripcion,
						"codigo": producto.codigo??oldprod.codigo, 
						"stock": producto.stock??oldprod.stock
				}
				newproduct._id = oldprod._id
				newproduct.timeStamp = oldprod.timeStamp

				await this.updateRow(newproduct)
				return newproduct

			}
			else{
				return { error: "titulo, precio e imagen no pueden estar vacias y precio debe ser un numero" }
			}
		} catch (error) {
			return { error: "producto no encontrado" }
		}
	}
}
