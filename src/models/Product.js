import { Schema, model } from "mongoose"

export const productSchema = new Schema({
	nombre:{type: String, required: true},
	precio:{type:Number, require:true},
	foto:{type: String, required: true},
	timeStamp:{type:Date, require:true},
	descripcion:{type: String},
	codigo:{type: String},
	stock:{type:Number},
})

export const ProductModel = model("productos", productSchema)

