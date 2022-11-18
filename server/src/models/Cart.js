import { Schema, model } from 'mongoose'
import {productSchema} from './Product.js'

const cartSchema = new Schema({
	products:{type: [productSchema], required: true},
	timeStamp:{type:Date, required:true}
})

export const CartModel = model("carts", cartSchema)
