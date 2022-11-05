import {uri} from '../config/optionsmongodbatlas.js'
import ContainerMongoDbAtlas from '../containers/ContainerMessagesMongoDbAtlas.js'

export default class MessagesController extends ContainerMongoDbAtlas{
	constructor (){
		super(uri)
	}

	async getMessages(){
		const messages = await this.getAll()
		return messages? messages: {error: "there aren't messages"}
	}

	async getMessageById(id){
		try {
			return await this.getById(id)
		} catch (error) {
			return { error: "message not found" }
		}
		
    }

	async addMessage(message){
		// faltan los controles de undefined, null
		message.timeStamp = new Date(Date.now())
		return await this.saveObject(message) 
	}
	
	async deleteMessageById(id){
		try {
			return await this.deleteById(id)
		} catch (error) {
			return { error: "message not found" }
		}
    }
	async updateMessage(id, message){
		try {
			if (
                message !== undefined
                && message.author !== undefined
			){
                message._id = id
				await this.updateRow(message)
				return message
			}
			else{
				return { error: "the message and products must be defined" }
			}
		} catch (error) {
			return { error: "message not found" }
		}
	}
	async getNormalizedMessages(){
		const messages = await this.getAllNormalized()
		return messages? messages: {error: "there aren't messages"}
	}
}
