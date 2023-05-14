import "dotenv/config"
import env from './util/validateEnv'
import mongoose from "mongoose"
import express from 'express';
import app from "./app"



const port = env.PORT;




mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => { console.log('Server running on port no:' + port); })
})
    .catch(console.error)
