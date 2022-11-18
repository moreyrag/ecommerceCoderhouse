import mongoose from 'mongoose'
import { CartModel } from '../models/Cart.js'
import ContainerProductsMongoDbAtlas from './ContainerProductsMongoDbAtlas.js'
import {uri as uriProducts} from '../config/optionsmongodbatlas.js'


export default class ContainerMongoDbAtlas {
    constructor(uri){
        try {
            this.uri = uri
            this.mongodb = mongoose.connect
        } catch (error) {
            throw new Error("error initializing the container:" + error.message)
        }
    }

    async saveObject(){
        try {
            return await this.insertRow()
        } catch (error) {
            throw new Error("error creating the cart:" + error.message)
        }
    }

    async insertRow(){
        await this.mongodb(this.uri)
        const newCart = new CartModel()
        newCart.timeStamp = new Date(Date.now())
        return await newCart.save()
    }

    async updateRow(objetoNew){
        try {
            await this.mongodb(this.uri)
            await CartModel.replaceOne({_id:objetoNew._id}, objetoNew)
            return objetoNew
        } catch (error) {
            throw new Error("error updating the cart:" + error.message)
        }
    }

    async getAll() {
        try {
            await this.mongodb(this.uri)
            return await CartModel.find()
        } catch (error) {
            throw new Error("error in getAll reading the database:" + error.message)
        }
    }

    async getById(id){
        try {
            await this.mongodb(this.uri)
            const cart = await CartModel.findById(id)

            if (cart == null) {
                throw new Error("cart not found")
            } else {
                return cart
            } 
        } catch (error) {
            throw new Error("error in getById of carts:" + error.message)
        }
    }

    // recibe un array de objetos
    async saveAll(carts){
        try {
            if (carts !== null && carts.length > 0) {
                carts.forEach(async (cart) => {
                    await this.saveObject(cart) // insert or update
                })   
            } else{
                if (carts !== null && carts.length===0) { // delete all documents
                    await this.deleteAll()
                }
            }
        } catch (error) {
            throw new Error("error saving the carts:" + error.message)
        }
    }

    async deleteById(id){
        try {
            await this.mongodb(this.uri)

            const cart = await CartModel.findByIdAndDelete(id)

            if (cart == null) {
                throw new Error("cart not found")
            } else {
                return cart
            } 

        } catch (error) {
            throw new Error("error deleting cart by id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.mongodb(this.uri)
           await CartModel.remove()    
        } catch (error) {
            throw new Error("error to empty the container" + error.message)
        }
    }

    async addProductToCart(idProduct, idCart) {
        try {
            const cart = await this.getById(idCart)
            const inventory = new ContainerProductsMongoDbAtlas(uriProducts)
            const product = await inventory.getById(idProduct)

            cart.products.push(product)

            return await this.updateRow(cart)

        } catch (error) {
            throw new Error("error al obtener el objeto por id:" + error.message)
        }
	}
}
