import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

export default app