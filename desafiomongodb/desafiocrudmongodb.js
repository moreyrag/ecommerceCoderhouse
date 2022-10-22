import {MongoClient} from 'mongodb'
import fs from 'fs'
const url = "mongodb://localhost:27017"
const dbName = "ecommerce"
const client = new MongoClient(url)
const pathResults = './resultados.txt'

const urlUsuario = "mongodb://pepe:asd456@localhost:27017/"
const clientUsuario = new MongoClient(urlUsuario)


// copy paste desde https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function main() {
    await client.connect()
    // console.log("conexion a mongodb ok")
    const db = client.db(dbName)
    const productos = db.collection('productos')
    const mensajes = db.collection('mensajes')

    // vaciar el archivo
    fs.writeFileSync(pathResults, "")

    /* Partes 1 y 2 del desafio */
    /*
        productos:
            id, nombre, precio, foto, descripcion, codigo, stock, timeStamp
    */

    let resultado = await productos.insertMany( [
        { _id: 1, nombre: "p1", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo: "", stock:10, timeStamp: new Date().toLocaleString()},
        { _id: 2, nombre: "p2", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 3, nombre: "p3", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 4, nombre: "p4", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 5, nombre: "p5", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 6, nombre: "p6", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 7, nombre: "p7", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 8, nombre: "p8", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 9, nombre: "p9", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()},
        { _id: 10, nombre: "p10", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
        descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()}
     ] )
    // console.log('Productos insertados =>', resultado)
    
    /*
        mensajes:
            email, fechaHora, message
    */
    resultado = await mensajes.insertMany( [
        {email: "correo1@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m1"},
        {email: "correo2@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m2"},
        {email: "correo3@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m3"},
        {email: "correo4@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m4"},
        {email: "correo5@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m5"},
        {email: "correo6@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m6"},
        {email: "correo7@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m7"},
        {email: "correo8@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m8"},
        {email: "correo9@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m9"},
        {email: "correo10@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m10"}
     ] )
     // console.log('Mensajes insertados =>', resultado)

    /* Parte 3 del desafio*/
     fs.appendFileSync(pathResults, "\nProductos\n")
     resultado = await productos.find( {} ).toArray()
     fs.appendFileSync(pathResults, JSON.stringify(resultado))
     fs.appendFileSync(pathResults, "\nMensajes\n")
     resultado = await mensajes.find( {} ).toArray()
     fs.appendFileSync(pathResults, JSON.stringify(resultado))


    /* Parte 4 del desafio*/
    fs.appendFileSync(pathResults, "\nCantidad productos:\n")
    resultado = await productos.estimatedDocumentCount()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))
    fs.appendFileSync(pathResults, "\nCantidad mensajes:\n")
    resultado = await mensajes.estimatedDocumentCount()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5a del desafio*/
    fs.appendFileSync(pathResults, "\nNuevo producto agregado:\n")
    resultado = await productos.insertOne({ _id: 11, nombre: "p11", precio:getRandomIntInclusive(100, 5000), foto:"https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
    descripcion: "", codigo:"", stock:"", timeStamp: new Date().toLocaleString()})
    resultado = await productos.find( {} ).toArray()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5b del desafio*/
    fs.appendFileSync(pathResults, "\nBusqueda producto por nombre p8:\n")
    resultado = await productos.find( { "nombre": "p8" } ).toArray()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5b i) del desafio*/
    fs.appendFileSync(pathResults, "\nProductos con precio < 1000:\n")
    resultado = await productos.find( {"precio":{$lt: 1000}} ).toArray()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5b ii) del desafio*/
    fs.appendFileSync(pathResults, "\nProductos con precio entre 1000 y 3000:\n")
    resultado = await productos.find( {$and:[{"precio":{$gte:1000}}, {"precio":{$lte:3000}}]} ).toArray()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5b iii) del desafio*/
    fs.appendFileSync(pathResults, "\nProductos con precio mayor a 3000:\n")
    resultado = await productos.find( {"precio":{$gt: 3000}} ).toArray()
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5b iv) del desafio*/
    fs.appendFileSync(pathResults, "\nNombre del tercer producto mas barato:\n")
    resultado = await productos.find( {} ).sort({"precio":1}).skip(2).limit(1).toArray()
    fs.appendFileSync(pathResults, JSON.stringify(resultado[0].nombre))

    /* Parte 5c del desafio*/
    fs.appendFileSync(pathResults, "\nActualizar stock a 100 para todos los productos:")
    let query = {}
    let newvalues = {$set:{stock:100}}
    resultado = await productos.updateMany(query, newvalues)
    fs.appendFileSync(pathResults, `\n${resultado.modifiedCount} productos modificados`)
    resultado = await productos.find( {} ).toArray()
    fs.appendFileSync(pathResults, "\nProductos:\n")
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5d del desafio*/
    fs.appendFileSync(pathResults, "\nActualizar stock a 0 para los productos con precios > 4000:")
    query = {precio:{$gt:4000}}
    newvalues = {$set:{stock:0}}
    resultado = await productos.updateMany(query, newvalues)
    fs.appendFileSync(pathResults, `\n${resultado.modifiedCount} productos modificados`)
    resultado = await productos.find( {} ).toArray()
    fs.appendFileSync(pathResults, "\nProductos:\n")
    fs.appendFileSync(pathResults, JSON.stringify(resultado))

    /* Parte 5e del desafio*/
    fs.appendFileSync(pathResults, "\nBorrado de productos con precio < 1000:")
    query = {precio:{$lt:1000}}
    resultado = await productos.deleteMany(query)
    fs.appendFileSync(pathResults, `\n${resultado.deletedCount} productos borrados`)
    resultado = await productos.find( {} ).toArray()
    fs.appendFileSync(pathResults, "\nProductos:\n")
    fs.appendFileSync(pathResults, JSON.stringify(resultado))
}

async function adminUsuario(){
    await client.connect()
    console.log("conectado read/write")
    const db = client.db(dbName)

    /* Parte 6 del desafio*/
    fs.appendFileSync(pathResults, "\nCreacion de usuario pepe/asd456 de solo read:")
    await db.addUser("pepe", "asd456", {roles: [ { role: "read", db: dbName} ]})
    fs.appendFileSync(pathResults, "\nUsuario solo read creado")

    // await clientUsuario.connect()
    const dbRead = await clientUsuario.db(dbName)
    console.log("conectado read")
    const mensajes = dbRead.collection('mensajes')

    try {
        resultado = await mensajes.insertOne(
            {email: "correo11@ecommerce.com", fechaHora: new Date().toLocaleString(), message:"m11"}
        )
        console.log("no hay error")    
    } catch (err) {
        console.log("error al intentar agregar un mensaje ", err)
    }
    
    /*
    https://gist.github.com/foull/0834e34ea3d9174e2c4bfe36a44a14d0
    // Authenticate using the newly added user

    adminDb.authenticate(userName, userPassword, function(err, result) {

      if (err){
        return console.log('Error: could authenticate with created user')
      }

      console.log('Ok')
      db.close()
    })
    */
}

main()
  .then(async () =>{
        await adminUsuario()
        console.log("fin del desafio")
})
  .catch(console.error)
  .finally(() => {
    client.close()
    clientUsuario.close()
})
