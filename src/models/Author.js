import { Schema, model } from "mongoose"

export const authorSchema = new Schema({
	email:{type: String, required: true},
	name: {type:String, required:true},
	apellido:{type:String, required:true},
	edad:{type:Number},
	alias:{type:String},
	avatar:{type:String},
	_id:{type: String, required: true}
})

export const AuthorModel = model("authors", authorSchema)

