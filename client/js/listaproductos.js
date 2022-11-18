const socket = io.connect()

socket.on("getproductos", (data) => {
	render(data)
})

socket.on("getmensajes", (data) => {
	renderMensaje(data)
})

function render(data) {
	if (data.error==undefined) {
		const html = data
			.map((producto) => {
				let str = `<tr class="table-light">
							<td>${producto.id}</td>
							<td>${producto.nombre}</td>
							<td>${producto.precio}</td>
							<td><img width=50 src='${producto.foto}' alt="imgProducto"></td>
							</tr>`
				return str
    		}).join("\n")
		document.getElementById("idTbody").innerHTML = html
	}
}

function agregarProducto() {
	const producto = {
		nombre: document.getElementById("nombre").value,
		precio: document.getElementById("precio").value,
        foto: document.getElementById("foto").value,
		descripcion: document.getElementById("descripcion").value,
		codigo: document.getElementById("codigo").value,
		stock: document.getElementById("stock").value
	}

	socket.emit("nuevoproducto", producto)
}

function renderMensaje(data) {
	if (data.error==undefined) {
		const html = data
			.map((elemento) => {
				console.log(elemento)
				return `<div>
					<span><strong style='color:blue'>${elemento.email}</strong></span>
					<span style='color:brown'> ${elemento.fechaHora}</span>
					<span style='font-style:italic;color:green'> ${elemento.message}</span></div>
			`
			})
			.join(" ")
		document.getElementById("mensajes").innerHTML = html
	}
}

function agregarMensaje() {
	const mensaje = {
		email: document.getElementById("email").value,
		message: document.getElementById("message").value
	}

	socket.emit("nuevomensaje", mensaje)
}
