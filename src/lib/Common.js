export function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next()
	} else {
		res.send({error:-1, descripcion:`ruta ${req.protocol}://${req.get('host')}${req.originalUrl} metodo ${req.method} no autorizada`, })
	}
}
