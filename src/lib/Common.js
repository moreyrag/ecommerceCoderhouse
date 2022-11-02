export function validateAdmin(req, res, next) {
	if (req.query.admin) {
		next()
	} else {
		res.send({error:-1, description:`route ${req.protocol}://${req.get('host')}${req.originalUrl} method ${req.method} not authorized`, })
	}
}
