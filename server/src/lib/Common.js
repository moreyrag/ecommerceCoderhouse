import util from 'util'
// import {normalize, denormalize, schema} from 'normalizr'

import pino from 'pino'

export class LogginServerEcommerce{
	static loggerError = pino("error.log")
	static loggerWarning = pino("warning.log")
	static loggerInfo = pino()

	static setLevels(){
		this.loggerError.level = "error"
		this.loggerWarning.level = "warn"
		this.loggerInfo.level = "info"
	}

	static logError(err){
		this.loggerError.error(err)
		this.loggerInfo.error(err)
	}

	static logInfo(info){
		this.loggerInfo.info(info)
	}

	static logWarn(info){
		this.loggerWarning.warn(info)
		this.loggerInfo.warn(info)
	}
}

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
 * Authentication
 *************************/
/*
 export function auth(req, res, next) {
	if (req.session?.user ==='pepe' && req.session?.admin) {
		next()
	} else {
		res.status(401).send("error de autorizacion")
	}
}
*/

export function webAuth(req, res, next) {
    if (req.session?.username) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function apiAuth(req, res, next) {
    if (req.session?.username) {
        next()
    } else {
        res.status(401).json({ error: 'not authorized' })
    }
}


/**************************
 * Utiles de normalizacion
 *************************/
/*
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
 */