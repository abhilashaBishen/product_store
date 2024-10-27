import mongoose from "mongoose";

export  const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.on('connected',()=>{
            console.log('MOgoose Connected to DB');
        })

        mongoose.connection.on('disconnected',()=>{
            console.log("mongoose disconnected");
        })
        mongoose.connection.on('error',(err)=>{
            console.log(`mongose connection error: ${err}`)
        })
        console.log(`MongodDB connected :${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)

        process.exit(1);//process code 1 code means exit with failure, 0 means success
    }
}