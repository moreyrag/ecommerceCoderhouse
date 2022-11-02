import { Schema, model } from "mongoose"

export const productSchema = new Schema({
	name:{type: String, required: true},
	price:{type:Number, require:true},
	image:{type: String, required: true},
	timeStamp:{type:Date, require:true},
	description:{type: String},
	code:{type: String},
	stock:{type:Number},
})

export const ProductModel = model("products", productSchema)

