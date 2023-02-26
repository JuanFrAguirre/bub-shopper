import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

export default app
