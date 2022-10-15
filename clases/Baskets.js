import InventarioProductos from "./ProductsInventory.js"
import FileManager from "./FileManager.js"
export default class Baskets {
	constructor(rutaFileProductos, rutaFileCarritos) {
		this.productos = new InventarioProductos(rutaFileProductos) // crea el archivo de productos si ya no existe, con el array []
		this.fscarritos  = new FileManager(rutaFileCarritos)
	}


	/* 
	si se actualiza un producto en el inventario queda inconsistente la info con la 
	de los carritos que tengan ese producto
	*/
	async obtenerCarritos(){
		let carritos = await this.fscarritos.getAll()

		return carritos.length > 0 ? carritos : { error: "no hay carritos cargados" }
	}

	/* 
	si se actualiza un producto en el inventario queda inconsistente la info con la 
	de los carritos que tengan ese producto
	*/
	async obtenerCarritoPorId(id){
		let carrito = await this.fscarritos.getById(id)
		return carrito || { error: "carrito no encontrado" }
    }

	async crearCarrito(){
		let idProximo
		let carritos = await this.fscarritos.getAll()

		switch (carritos.length) {
			case 0:
				idProximo = 1
				break
			case 1:
				idProximo = carritos[0].id+1
				break
			default:
				idProximo = carritos.sort((a,b)=>b.id-a.id)[0].id+1
				break
		}

		const carrito = {id: idProximo, timeStamp:Date.now(), productos: []}
		await this.fscarritos.saveObject(carrito) 

		return carrito
	}

	async agregarProductoEnCarrito(idProducto, idCarrito) {
		const carrito = await this.obtenerCarritoPorId(parseInt(idCarrito))
		if (carrito.error !== undefined) {return carrito}
		const producto = await this.productos.obtenerProductoPorId(parseInt(idProducto))
		if (producto.error !== undefined) {return producto}
		carrito.productos.push(producto)

		let carritos = await this.obtenerCarritos()
		carritos.find(element => element.id === parseInt(idCarrito)).productos = carrito.productos
		await this.fscarritos.saveAll(carritos)
			
		return carrito
	}

	async borrarCarritoPorId(id){
		let carritos = await this.obtenerCarritos()
		let pos = carritos.findIndex((carr) => carr.id == parseInt(id))

		if (pos != -1) {
			let carrito = carritos[pos]

			await this.fscarritos.deleteById(carrito.id) 	

			return carrito
		} else {
			return { error: "carrito no encontrado" }
		}
    }

	async actualizaCarrito(id, carrito){
		let carritos = await this.obtenerCarritos()
		let pos = carritos.findIndex((carr) => carr.id == parseInt(id))

		if (pos != -1) {
			carritos = carritos.splice(pos, 1, carrito)

			await this.fscarritos.saveAll(carritos) 
	
			return carritos[pos]
		} else {
			return { error: "carrito no encontrado" }
		}		
	}
}
