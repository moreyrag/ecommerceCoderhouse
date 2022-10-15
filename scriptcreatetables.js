import {optionsMariaDb} from './optionsmariaDb.js'
import {optionsSqliteDb} from './optionssqllite3.js'
const tablaProductos = "productos"
const tablaMensajes = "mensajes"

import  knex from 'knex'

const knexMariaDb = optionsMariaDb
const knexSqliteDb = optionsSqliteDb

knexMariaDb.schema.dropTableIfExists(tablaProductos).then(()=>{
    knexMariaDb.schema.createTable(tablaProductos, (table) => {
        table.increments('id')
        table.string('nombre')
    
        table.float('precio')
    
        table.string('foto')
        table.string('descripcion')
        table.string('codigo')
    
        table.integer('stock')
        table.datetime('timeStamp')
      })
    .then(() => {console.log("tabla productos creada")})
    .catch((err) => {
        console.log(err)
        throw err
    })
    .finally(()=>{
        knexMariaDb.destroy()
    })
})

knexSqliteDb.schema.dropTableIfExists(tablaMensajes).then(()=>{
    knexSqliteDb.schema.createTable(tablaMensajes, (table) => {
        table.string('email')
        table.datetime('fechaHora')
        table.string('message')
      })
    .then(() => {console.log("tabla mensajes creada")})
    .catch((err) => {
        console.log(err)
        throw err
    })
    .finally(()=>{
        knexSqliteDb.destroy()
    })
})

