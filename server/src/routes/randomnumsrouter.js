import express from "express"
import cors from 'cors'
import {fork} from 'child_process' 

import { LogginServerEcommerce } from "../lib/Common.js"

const router = express.Router()

router.use(cors())
router.use(express.json())

router.get('/', (req, res) => {
    try {
        const forked = fork('./src/lib/RandomNumbers.js')
        let cantidad = req.query.cant??100000000
        forked.send(cantidad)
        forked.on('message', (m)=>{
            if (m=="error") {
                LogginServerEcommerce.logError('cantidad debe ser numerica')
                res.status(500).json({ status: 'error', message: 'cantidad debe ser numerica'})
            } else{
                res.status(200).send({numbers:m})
            }
        })
    } catch (e) {
        LogginServerEcommerce.logError('Random numbers error ' + e.message)
        res.status(500).json({ status: 'error', message: 'Random numbers error ' + e.message})
    }
})

export default router

