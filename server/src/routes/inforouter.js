import express from "express"
import cors from 'cors'

const router = express.Router()

router.use(cors())
router.use(express.json())

router.get('/', (req, res) => {
    try {
      res.status(200).json({
        args:JSON.stringify(process.argv),
        osd: process.platform,
        nodeversion: process.version,
        memory: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
        folderProject: process.cwd()
      })
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Info error' })
    }
})

export default router
