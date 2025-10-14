import mongoose from "mongoose";
const connectDb=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("database connection has established")
        })
        await mongoose.connect(`${process.env.MONGOOSE}/miniFacebook`)
    } catch (error) {
        console.log(error.message)
    }
} 
export default connectDb
