import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import authRouter from './routes/auth.route'

dotenv.config()
const app = express()

const port = process.env.PORT || 1511

app.use('/api/v1', authRouter)

app.get('/', (req: Request, res: Response) => {
    res.send("ok herin")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})