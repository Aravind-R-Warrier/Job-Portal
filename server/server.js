import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js'
import './config/instrument.js'
import * as Sentry from "@sentry/node";
import {clerckWebhooks} from "./controllers/webHooks.js"
import companyRoutes from './Routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './Routes/jobRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
// initialise express
const app=express()
// connect database
await connectDb()
await connectCloudinary()
// middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
// routes
app.get('/',(req,res)=>{
    res.send('Api working')
})
// webhook router
app.post('/webhooks',clerckWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users/',userRoutes)

// port
const port=process.env.port || 5000
Sentry.setupExpressErrorHandler(app)

app.listen(port,()=>{
    console.log(`server is running port:${port}`)
})