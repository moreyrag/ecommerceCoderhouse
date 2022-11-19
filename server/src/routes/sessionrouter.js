import express from "express"
import session from "express-session"
import path from 'path'
import MongoStore from 'connect-mongo'

import { webAuth } from "../lib/Common.js"
import {uri} from '../config/optionsmongodbatlas.js'

import {inventory} from "../routes/inventoryrouterfake.js" 

import cors from 'cors'

import sessionFileStore from 'session-file-store'
let FileStore = sessionFileStore(session)
const folderPath = './sessions'

const router = express.Router()

router.use(cors())

router.use(session({
    secret: process.env.SESSION_SECRET || "secreto",
    resave: false,
    saveUninitialized: false,
    /*
    store: MongoStore.create({
        mongoUrl:uri
    }),
    */
   store:new FileStore({path:folderPath}),
    cookie: {
        maxAge: 60000
    }
}))

const getSessionName = (req) => req.session?.username

/*
router.get('/', (req, res) => {
    res.redirect('/login')
})
*/
/*
router.get('/home', webAuth, (req, res) => {
    // res.json(controlador-->base de datos --> productos)
    // res.json(inventory)
    res.sendFile(path.join(process.cwd(), '/views/home.html'))
})
*/

router.get('/username', (req, res) => {
    // console.log(req)
    // console.log(`En el server ${getSessionName(req)}`)
    // console.log(req.session?.username)
    res.json({"data":req.session?.username, "result":"ok"})
})

router.get('/inventory', (req, res) => {
    // console.log("inventory")
    // console.log(inventory)
    res.json({"data":inventory, "result":"ok"})
})

router.get('/logout', (req, res) => {
    console.log("logout")
    const username = req.session?.username
    console.log(username)

    // if (username) {
        req.session.destroy(err => {
            if (!err) {
                console.log("logout ok")
                // console.log(username)
                // res.sendFile(path.join(process.cwd(), '/views/logout.html'))
                res.json({"data":"Gracias por venir", "result":"ok"})
            } else {
                console.log("logout error")

                // res.redirect('/')
                res.json({"data":err.message, "result":"error"})
            }
        })
    // } else {
        // res.redirect('/')
    // }
})

router.post('/login', (req, res) => {
    if (req.body.username) {
        req.session.username = req.body.username
        res.json({"data":req.body.username, "result":"ok"})
    } else {
        res.json({"data":"Login failed", "result":"error"})
    }

})

export default router
