import express from "express"
import cors from 'cors'
import {fork} from 'child_process' 

const router = express.Router()

router.use(cors())
router.use(express.json())

router.get('/', (req, res) => {
    try {
        const forked = fork('./src/lib/RandomNumbers.js')
        let cantidad = req.query.cant??100000000
        // console.log(cantidad)
        forked.send(cantidad)
        forked.on('message', (m)=>{
            // console.log(m)
            res.status(200).send({numbers:m})
        })
        /*
        forked.on('message', (numbers)=>{
            res.status(200).send({numbers})
        })*/
        
        // res.status(200).json({status:"ok"})
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Random numbers error ' + e.message})
    }
})

export default router

