import mongoose from 'mongoose'
import { ProductModel } from '../models/Product.js'

export default class ContainerMongoDbAtlas {
    constructor(uri){
        try {
            this.uri = uri
            this.mongodb = mongoose.connect
        } catch (error) {
            throw new Error("error initializing the container:" + error.message)
        }
    }

    async saveObject(product){
        try {
            if (product!==null && product!==undefined){
                // ya existe el objeto? por como se hizo habria que buscar por nombre
                // let obj = await this.getById(objeto.id) 
                // if (obj == undefined) {
                    // insertar
                    return await this.insertRow(product)
               // } else{
                    // actualizar
                    // await this.updateRow(obj, objeto)
                //}         
            }
        } catch (error) {
            throw new Error("error saving the product:" + error.message)
        }
    }

    async insertRow(product){
        await this.mongodb(this.uri)
        const newProduct = new ProductModel(product)
        return await newProduct.save()
    }

    
    async updateRow(newProduct){
        try {
            await this.mongodb(this.uri)
            await ProductModel.replaceOne({_id:objetoNew._id}, newProduct)
            return objetoNew
        } catch (error) {
            throw new Error("error updating the product:" + error.message)
        }
    }

    async getAll() {
        try {
            await this.mongodb(this.uri)
            return await ProductModel.find()
        } catch (error) {
            throw new Error("error in getAll reading the database:" + error.message)
        }
    }

    async getById(id){
        try {
            await this.mongodb(this.uri)
            const product = await ProductModel.findById(id)
            if (product == null) {
                throw new Error("product not found")
            } else {
                return product
            } 
        } catch (error) {
            throw new Error("error in getById of product:" + error.message)
        }
    }

    async saveAll(products){
        try {
            if (products !== null && products.length > 0) {
                products.forEach(async (product) => {
                    await this.saveObject(product) // insert or update
                })   
            } else{
                if (products !== null && products.length===0) { // delete all documents
                    await this.deleteAll()
                }
            }
        } catch (error) {
            throw new Error("error saving the products:" + error.message)
        }
    }

    async deleteById(id){
        try {
            await this.mongodb(this.uri)
            const product = await ProductModel.findByIdAndDelete(id)
            if (product == null) {
                throw new Error("product not found")
            } else {
                return product
            } 
        } catch (error) {
            throw new Error("error deleting product by id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.mongodb(this.uri)
           await ProductModel.remove()    
        } catch (error) {
            throw new Error("error to empty the containerr" + error.message)
        }
    }
}
