import express from "express"
import session from "express-session"
import path from 'path'
import MongoStore from 'connect-mongo'

// const bodyParser = require('body-parser');


import { webAuth } from "../lib/Common.js"
import {uri} from '../config/optionsmongodbatlas.js'

import {inventory} from "../routes/inventoryrouterfake.js" 

import cors from 'cors'

import cookieParser from "cookie-parser"
import bCrypt from "bcrypt"
import mongoose from "mongoose"
import {UserModel} from "../models/User.js"
import passport from "passport"
import { Strategy } from "passport-local"

import sessionFileStore from 'session-file-store'
let FileStore = sessionFileStore(session)
const folderPath = './sessions'

const localStrategy = Strategy

const router = express.Router()

// const urlencodedParser = bodyParser.urlencoded({ extended: false });


router.use(cors())
router.use(cookieParser())

router.use(
	session({
		secret: process.env.SESSION_SECRET || "secreto",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60000, // 60 segundos
		},
	})
)

//middlewares passport
router.use(passport.initialize())
router.use(passport.session())


passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			console.log("register", username + password)
			await mongoose.connect(uri)
			
			try {
				UserModel.create(
					{
						username,
						password: createHash(password),
						email: req.body.email,
					},
					(err, userWithId) => {
						if (err) {
							console.log(err)
							return done(err, null)
						}
						return done(null, userWithId)
					}
				)
			} catch (e) {
				return done(e, null)
			}
		}
	)
)

passport.use(
	"login",
	new localStrategy(async (username, password, done) => {
		await mongoose.connect(uri)
		try {
			// await UserModel.init().then(

			UserModel.findOne({username},
				(err, username) => {
					if (err) {
						return done(err, null)
					}

					if (!username){
						console.log('User not found with username ' + username)
						return done(null, false)
					}

					if(!isValidPassword(username, password)){
						console.log('Invalid password')
						return done(null, false)
					}

					return done(null, username)
				}
			)
			// )
		} catch (e) {
			console.error(`User login error: ${e}`)
			return done(e, null)
		}
	})
)

passport.serializeUser((user, done) => {
	// console.log(user)
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	UserModel.findById(id, done)
})

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password)
}

router.get("/", (req, res) => {
	res.redirect("login")
})

router.get("/login", (req, res) => {
	res.render("login")
})

router.post(
	"/login",
	passport.authenticate("login", {
		// successRedirect: "/data",
		failureRedirect: "/loginerror"
	}), function (req, res) {
        res.render('data', { username: req.body.username, email: req.body.email});
		// res.redirect("data")
    }
)

router.get("/loginerror", (req, res) => {
	res.render("loginerror")
})

router.get("/register", (req, res) => {
	res.render("register")
})

router.get("/data", (req, res) => {
	// res.json({mensaje: 'Session started'})
	console.log("en el data")
	console.log(req.body.username)
	console.log(req.body.email)
	res.render("data")
})

router.post(
	"/register",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/loginerror",
	})
)

router.get("/logout",  function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err)
        } else {
        res.render('logout', { username: req.body.username })
    }
    })
})

export default router
