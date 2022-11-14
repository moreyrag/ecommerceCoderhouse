import express from "express"
import Messages from "../controllers/MessagesController.js"
import { validateAdmin } from "../lib/Common.js"

const router = express.Router()

const messages = new Messages()

// console.log(messages)

router.get("/", async (req, res) => {
	const m = await messages.getMessages()
	res.send(m)
})

router.get("/:id", async (req, res) => {
	if (req.params.id == "normalizados"){
		const m = await messages.getNormalizedMessages()
		res.send(m)
	}
	else{
		const message = await messages.getMessageById(req.params.id)
		res.send(message)
	}
})

router.post("/", validateAdmin, async (req, res) => {
	let resultado = await messages.addMessage(req.body)
	res.send(resultado)
})

router.delete("/:id", validateAdmin, async (req, res) => {
	const message = await messages.deleteMessageById(req.params.id)
	res.send(message)
})

router.put("/:id", validateAdmin, async (req, res) => {
	let newmessage = await messages.updateMessage(req.params.id, req.body)
	res.send(newmessage)
})

export default router
