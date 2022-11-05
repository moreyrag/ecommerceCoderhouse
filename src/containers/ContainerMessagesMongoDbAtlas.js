import mongoose from 'mongoose'
import { MessageModel } from '../models/Message.js'
import { normalizeMessages, print } from '../lib/Common.js'

export default class ContainerMongoDbAtlas {
    constructor(uri){
        try {
            this.uri = uri
            this.mongodb = mongoose.connect
        } catch (error) {
            throw new Error("error initializing the container:" + error.message)
        }
    }

    async saveObject(message){
        try {
            if (message!==null && message!==undefined){
                // ya existe el objeto? por como se hizo habria que buscar por nombre
                // let obj = await this.getById(objeto.id) 
                // if (obj == undefined) {
                    // insertar
                    return await this.insertRow(message)
               // } else{
                    // actualizar
                    // await this.updateRow(obj, objeto)
                //}         
            }
        } catch (error) {
            throw new Error("error saving the message:" + error.message)
        }
    }

    async insertRow(message){
        await this.mongodb(this.uri)
        message.author._id = message.author.email
        const newMessage = new MessageModel(message)
        return await newMessage.save()
    }

    
    async updateRow(newMessage){
        try {
            await this.mongodb(this.uri)
            await MessageModel.replaceOne({_id:newMessage._id}, newMessage)
            return newMessage
        } catch (error) {
            throw new Error("error updating the message:" + error.message)
        }
    }

    async getAll() {
        try {
            await this.mongodb(this.uri)
            return await MessageModel.find()
        } catch (error) {
            throw new Error("error in getAll reading the database:" + error.message)
        }
    }

    async getById(id){
        try {
            await this.mongodb(this.uri)
            const message = await MessageModel.findById(id)
            if (message == null) {
                throw new Error("message not found")
            } else {
                return message
            } 
        } catch (error) {
            throw new Error("error in getById of message:" + error.message)
        }
    }

    async saveAll(messages){
        try {
            if (messages !== null && messages.length > 0) {
                messages.forEach(async (message) => {
                    await this.saveObject(message) // insert or update
                })   
            } else{
                if (messages !== null && messages.length===0) { // delete all documents
                    await this.deleteAll()
                }
            }
        } catch (error) {
            throw new Error("error saving the messages:" + error.message)
        }
    }

    async deleteById(id){
        try {
            await this.mongodb(this.uri)
            const message = await MessageModel.findByIdAndDelete(id)
            if (message == null) {
                throw new Error("message not found")
            } else {
                return message
            } 
        } catch (error) {
            throw new Error("error deleting message by id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.mongodb(this.uri)
           await MessageModel.remove()    
        } catch (error) {
            throw new Error("error to empty the container" + error.message)
        }
    }

    async getAllNormalized() {
        try {
            await this.mongodb(this.uri)
            const m = await MessageModel.find()
            const mn = normalizeMessages({"messages":m})
            return mn
        } catch (error) {
            throw new Error("error in getAll reading the database:" + error.message)
        }
    }
}
