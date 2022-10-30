import mongoose from 'mongoose'
import { BasketModel } from '../models/Basket.js'
import ContainerProductsMongoDbAtlas from './ContainerProductsMongoDbAtlas.js'
import {uri as uriProducts} from '../config/optionsmongodbatlas.js'


export default class ContainerMongoDbAtlas {
    constructor(uri){
        try {
            this.uri = uri
            this.mongodb = mongoose.connect
        } catch (error) {
            throw new Error("error al inicializar el contenedor:" + error.message)
        }
    }

    async saveObject(){
        try {
            return await this.insertRow()
        } catch (error) {
            throw new Error("error al guardar el objeto:" + error.message)
        }
    }

    async insertRow(){
        await this.mongodb(this.uri)
        const newBasket = new BasketModel()
        newBasket.timeStamp = new Date(Date.now())
        return await newBasket.save()
    }

    async updateRow(objetoNew){
        try {
            await this.mongodb(this.uri)
            await BasketModel.replaceOne({_id:objetoNew._id}, objetoNew)
            return objetoNew
        } catch (error) {
            throw new Error("error al actualizar el objeto:" + error.message)
        }
    }

    async getAll() {
        try {
            await this.mongodb(this.uri)
            return await BasketModel.find()
        } catch (error) {
            throw new Error("ocurrio un error en getAll al leer la base de datos:" + error.message)
        }
    }

    async getById(id){
        try {
            await this.mongodb(this.uri)
            const basket = await BasketModel.findById(id)

            if (basket == null) {
                throw new Error("carrito no encontrado")
            } else {
                return basket
            } 
        } catch (error) {
            throw new Error("error al obtener el objeto por id:" + error.message)
        }
    }

    // recibe un array de objetos
    async saveAll(objetos){
        try {
            if (objetos !== null && objetos.length > 0) {
                objetos.forEach(async (objeto) => {
                    await this.saveObject(objeto) // inserta o actualiza segun corresponda
                })   
            } else{
                if (objetos !== null && objetos.length===0) { // borrar todos los registros
                    await this.deleteAll()
                }
            }
        } catch (error) {
            throw new Error("ocurrio un error al almacenar los objetos:" + error.message)
        }
    }

    async deleteById(id){
        try {
            await this.mongodb(this.uri)

            const basket = await BasketModel.findByIdAndDelete(id)

            if (basket == null) {
                throw new Error("carrito no encontrado")
            } else {
                return basket
            } 

        } catch (error) {
            throw new Error("error al borrar objeto por id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.mongodb(this.uri)
           await BasketModel.remove()    
        } catch (error) {
            throw new Error("error al vaciar el contenedor" + error.message)
        }
    }

    async addProductInBasket(idProducto, idCarrito) {
        try {
            const carrito = await this.getById(idCarrito)
            const inventory = new ContainerProductsMongoDbAtlas(uriProducts)
            const producto = await inventory.getById(idProducto)

            carrito.productos.push(producto)

            return await this.updateRow(carrito)

        } catch (error) {
            throw new Error("error al obtener el objeto por id:" + error.message)
        }
	}
}
