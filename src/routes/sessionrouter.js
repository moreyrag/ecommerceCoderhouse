import express from "express"
import session from "express-session"
import path from 'path'
import MongoStore from 'connect-mongo'

import { webAuth } from "../lib/Common.js"
import {uri} from '../config/optionsmongodbatlas.js'

const router = express.Router()

router.use(session({
    secret: process.env.SESSION_SECRET || "secreto",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:uri
    }),
    cookie: {
        maxAge: 60000
    }
}))

const getSessionName = (req) => req.session?.username

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/home', webAuth, (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/home.html'))
})

router.get('/username', webAuth, (req, res) => {
    res.json(getSessionName(req))
})

router.get('/logout', (req, res) => {
    const username = req.session?.username
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.sendFile(path.join(process.cwd(), '/views/logout.html'))
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

router.get('/login', (req, res) => {
    const username = req.session?.username
    if (username) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

router.post('/login', (req, res) => {
    req.session.username = req.body.username
    res.redirect('/home')
})

export default router
