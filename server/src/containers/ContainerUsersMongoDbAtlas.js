import mongoose from 'mongoose'
import UserModel from '../models/User.js'
import {uri} from '../config/optionsmongodbatlas.js'

export default class User {

    constructor() {
        try {
            this.url = uri
            this.mongodb = mongoose.connect
        } catch (error) {
            throw new Error("error initializing the container User:" + error.message)
        }

    }

    async newUser(data) {
        try {
            if (data!==null && data!==undefined) {
                await this.mongodb(this.url)
                const newUser = new UserModel(data)
                return await newUser.save()
            }
        } catch (error) {
            throw new Error("can not save the user:" + error.message)
        }
    }

    async listUsers() {
        try {
            await this.mongodb(this.url);
            return await UserModel.find();
        } catch (error) {
            throw new Error("error in listUsers reading the database:" + error.message)
        }
    }

    async listUsersById(id) {
        try {
            await this.mongodb(this.url)
            const user = await UserModel.findById(id)
            if (user == null) {
                throw new Error("user not found")
            } else {
                return user
            } 
        } catch (error) {
            throw new Error("error in listUsersById: " + error.message)
        }
    }
}
