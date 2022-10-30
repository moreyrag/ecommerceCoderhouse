import mongoose from 'mongoose'
import { ProductModel } from '../models/Product.js'

export default class ContainerMongoDbAtlas {
    constructor(uri){
        try {
            this.uri = uri
            this.mongodb = mongoose.connect
        } catch (error) {
            throw new Error("error al inicializar el contenedor:" + error.message)
        }
    }

    async saveObject(objeto){
        try {
            if (objeto!==null && objeto!==undefined){
                // ya existe el objeto? por como se hizo habria que buscar por nombre
                // let obj = await this.getById(objeto.id) 
                // if (obj == undefined) {
                    // insertar
                    return await this.insertRow(objeto)
               // } else{
                    // actualizar
                    // await this.updateRow(obj, objeto)
                //}         
            }
        } catch (error) {
            throw new Error("error al guardar el objeto:" + error.message)
        }
    }

    async insertRow(objeto){
        await this.mongodb(this.uri)
        const newProduct = new ProductModel(objeto)
        return await newProduct.save()
    }

    
    async updateRow(objetoNew){
        try {
            await this.mongodb(this.uri)
            await ProductModel.replaceOne({_id:objetoNew._id}, objetoNew)
            return objetoNew
        } catch (error) {
            throw new Error("error al actualizar el objeto:" + error.message)
        }
    }

    async getAll() {
        try {
            await this.mongodb(this.uri)
            return await ProductModel.find()
        } catch (error) {
            throw new Error("ocurrio un error en getAll al leer la base de datos:" + error.message)
        }
    }

    async getById(id){
        try {
            await this.mongodb(this.uri)
            const producto = await ProductModel.findById(id)
            if (producto == null) {
                throw new Error("producto no encontrado")
            } else {
                return producto
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
            const producto = await ProductModel.findByIdAndDelete(id)
            if (producto == null) {
                throw new Error("producto no encontrado")
            } else {
                return producto
            } 
        } catch (error) {
            throw new Error("error al borrar objeto por id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.mongodb(this.uri)
           await ProductModel.remove()    
        } catch (error) {
            throw new Error("error al vaciar el contenedor" + error.message)
        }
    }
}
