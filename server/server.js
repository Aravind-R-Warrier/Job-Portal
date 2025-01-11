import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js'
import './config/instrument.js'
import * as Sentry from "@sentry/node";
import clerckWebHook from './controllers/webHooks.js'
// initialise express

const app=express()

// connect database
await connectDb()
// middlewares

app.use(cors())
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.send('Api working')
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  
app.post('/webhooks',clerckWebHook)

// port
const port=process.env.port || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(port,()=>{
    console.log(`server is running port:${port}`)
})