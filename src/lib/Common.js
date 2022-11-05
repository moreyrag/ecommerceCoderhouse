import util from 'util'
import {normalize, denormalize, schema} from 'normalizr'

export function validateAdmin(req, res, next) {
	if (req.query.admin) {
		next()
	} else {
		res.send({error:-1, description:`route ${req.protocol}://${req.get('host')}${req.originalUrl} method ${req.method} not authorized`, })
	}
}

export function print(objeto){
	console.log(util.inspect(objeto, false, 12, true))
}


/**************************
 * Utiles de normalizacion
 *************************/

 const authorSchemaNmlz = new schema.Entity('authors', {}, { idAttribute: 'email' })
 const messageSchemaNmlz = new schema.Entity('message', {
	 author: authorSchemaNmlz
 })
 const messagesSchemaNmlz = {id:"messages", messages:[messageSchemaNmlz]}
 
 export function normalizeMessages(messages) {
	const mn = normalize(messages, messagesSchemaNmlz)
	// print(mn)
	return mn
 }