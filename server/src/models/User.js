import { Schema, model } from "mongoose" 

export const userSchema = new Schema({
	username: {type: String, required: true,  unique: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
});

export const UserModel = model("users", userSchema);
