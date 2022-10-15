import knex from 'knex'
export const optionsMariaDb = knex({
	client: 'mysql',
	connection: {
		host:'127.0.0.1',
		user: 'root',
		password: '',
		database: 'inventario'
	},
	pool: {min:0, max:7}
})
