import { Schema, model } from "mongoose"
import {authorSchema} from './Author.js'

export const messageSchema = new Schema({
	author:{type: authorSchema, required: true},
	text:{type:String, required:true}
})

export const MessageModel = model("messages", messageSchema)
