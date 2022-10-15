import Producto from "./Product.js"
// import FileManager from "./FileManager.js"
import DbManager from "./DbManager.js"

export default class ProductsInventory{
	constructor (options, tabla){
		this.db  = new DbManager(options, tabla)
	}

	async obtenerProductos(){
		const productos = await this.db.getAll()
		return productos? productos: {error: "inventario vacio"}
	}

	async obtenerProductoPorId(id){
		const productos = await this.obtenerProductos()
		if (productos.error !== undefined) {
			return { error: "producto no encontrado" }
		}
		
		let producto = productos.find(prod=>prod.id===parseInt(id))

		return producto || { error: "producto no encontrado" }
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

			await this.db.saveObject(producto) 

			return producto
		}
		else {
			return { error: "titulo, precio e imagen no pueden estar vacias y precio debe ser un numero" }
		}
	}

	async borrarProductoPorId(id){
		const productos = await this.obtenerProductos()
		let pos = productos.findIndex((prod) => prod.id == parseInt(id))
		if (pos != -1) {
			let producto = productos[pos]
			productos.splice(pos, 1)
			await this.db.saveAll(productos)
			return producto
		} else {
			return { error: "producto no encontrado" }
		}
    }
	async actualizaProducto(id, producto){
		const productos = await this.obtenerProductos()
		const pos = productos.findIndex((prod) => prod.id == parseInt(id))

		if (pos != -1) {
			if (
				(producto.nombre !== undefined && producto.nombre.trim() !== ""  && producto.nombre !== null)
				||
				(producto.precio !== undefined && producto.precio !== ""  && producto.precio !== null && (parseFloat(producto.precio)))
				||
				(producto.foto !== undefined && producto.foto.trim() !== "" && producto.foto !== null)
			){
				let oldprod = productos[pos]

				if (producto.nombre.trim() == "") {producto.nombre = undefined}
				if (producto.precio.trim() == "") {producto.precio = undefined}
				if (producto.foto.trim() == "") {producto.precio = undefined}
				
				/*
				if (producto.descripcion.trim() == "") {producto.descripcion = undefined}
				if (producto.codigo.trim() == "") {producto.codigo = undefined}
				if (producto.stock.trim() == "") {producto.stock = undefined}
				*/

				let newproduct = new Producto(producto.nombre??oldprod.nombre, producto.precio??oldprod.precio, 
					producto.foto??oldprod.foto, producto.descripcion??oldprod.descripcion, 
					producto.codigo??oldprod.codigo, producto.stock??oldprod.stock
					)
				newproduct.id = oldprod.id
				newproduct.timeStamp = oldprod.timeStamp
				productos.splice(pos, 1, newproduct)

				await this.db.saveAll(productos)

				return newproduct
			}
			else{
				return { error: "titulo, precio e imagen no pueden estar vacias y precio debe ser un numero" }
			}
		} else {
			return { error: "producto no encontrado" }
		}
	}
}
