export default class Product{
	constructor (nombre, precio, foto, descripcion, codigo, stock){
		this.nombre = nombre
		this.precio = parseFloat(precio)
		this.foto = foto
		this.descripcion = descripcion
		this.codigo = codigo
		this.stock = stock
	}
}
