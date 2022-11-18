import {normalize, denormalize, schema} from 'normalizr'
import { print } from '../lib/Common.js'

const authorSchemaNmlz = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchemaNmlz = new schema.Entity('message', {
    author: authorSchemaNmlz
})
const messagesSchemaNmlz = {messages:[messageSchemaNmlz]}

const myData ={
    messages:[
    {
        id:1,
        author: {
            email:'correo1@hotmail.com',
            name: 'nombre1',
            apellido: 'apellido1',
            edad: 10,
            alias: 'alias1',
            avatar: 'http://avatar1.jpg'
        },
        text: 'texto 1'
    }, 
    {
        id:2,
        author: {
            email:'correo2@hotmail.com',
            name: 'nombre2',
            apellido: 'apellido2',
            edad: 20,
            alias: 'alias2',
            avatar: 'http://avatar2.jpg'
        },
        text: 'texto 2'
    }, 
    {
        id:3,
        author: {
            email:'correo3@hotmail.com',
            name: 'nombre3',
            apellido: 'apellido3',
            edad: 30,
            alias: 'alias3',
            avatar: 'http://avatar3.jpg'
        },
        text: 'texto 3'
    },
    {
        id:4,
        author: {
            email:'correo2@hotmail.com',
            name: 'nombre2',
            apellido: 'apellido2',
            edad: 20,
            alias: 'alias2',
            avatar: 'http://avatar2.jpg'
        },
        text: 'texto 4'
    }
]
}


print(normalize(myData, messagesSchemaNmlz))


/*
email:{type: String, required: true},
	name: {type:String, required:true},
	apellido:{type:String, required:true},
	edad:{type:Number},
	alias:{type:String},
	avatar:{type:String}

    author:{type: authorSchema, required: true},
	text:{type:String, required:true}
    */
