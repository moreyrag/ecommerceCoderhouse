import { Schema, model } from 'mongoose'
import {productSchema} from './Product.js'

const basketSchema = new Schema({
	productos:{type: [productSchema], required: true},
	timeStamp:{type:Date, required:true}
})

export const BasketModel = model("baskets", basketSchema)
