import knex from 'knex'

export const optionsSqliteDb = knex({
	client: 'sqlite3',
    connection: {filename: './db/mensajes'},
    useNullAsDefault: true
})
