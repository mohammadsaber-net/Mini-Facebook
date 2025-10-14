import { Inngest } from "inngest";
import { FaceUser } from "../model/FaceUser.js";
import sendEmail from "../configs/nodemailer.js";
import { Connection } from "../model/Connections.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

//inngest function to save user data to a data base

const syncUserCreation=inngest.createFunction(
    {id:"sync-user-from-clerk"},
    {event:"clerk/user.created"},
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
        let username=email_addresses[0].email_address.split("@")[0]
        const user=await FaceUser.findOne({username})
        if(user){
            username=username + Math.floor(Math.random() * 10000)
        }
        const userDate={
            _id:id,
            email:email_addresses[0].email_address,
            full_name:first_name + " "+last_name,
            profile_picture:image_url,
            username:username
        }
        await FaceUser.create(userDate)
    }
)



//inngest function to update user data to a data base



const syncUserUpdating=inngest.createFunction(
    {id:"update-user-from-clerk"},
    {event:"clerk/user.update"},
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
        const userDate={
            email:email_addresses[0].email_address,
            full_name:first_name + " "+last_name,
            profile_picture:image_url
        }
        await FaceUser.findByIdAndDelete(id,userDate)
    }
)
//inngest function to delete user data to a data base



const syncUserDeleting=inngest.createFunction(
    {id:"delete-user-from-clerk"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        await FaceUser.findByIdAndDelete(event.id)
    }
)



// Create an empty array where we'll export future Inngest functions
//inngest function to reminde you about new request
const sendNewConnectionReminder=inngest.createFunction(
    {id:"send-new-connection-reminder"},
    {event:"app/connection-reminder"},
    async({event,step})=>{
        const {connectionId}=event.data
        const connection =await Connection.findById(connectionId).populate("from_user_id to_user_id")
        await step.run("send-connection-request-mail" , async()=>{
            const subject="new connection request"
            const body =`<h2>${connection.to_user_id.full_name}</h2>
            <p>you have a new request from ${connection.from_user_id.full_name}</p>
            `
            await sendEmail({
            to:connection.to_user_id.email,
            subject,body
        })
        })
        const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await step.sleepUntil("wait for 24h",in24Hours)
        await step.run("send-connection-reminder",async()=>{
            const connection =await Connection.findById(connectionId).populate("from_user_id to_user_id")
            if(connection.status==="accepted"){
                return {message:"already accepted"}
            }
                const subject="new connection request"
            const body =`<h2>${connection.to_user_id.full_name}</h2>
            <p>you have a new request from ${connection.from_user_id.full_name}</p>
            `
            await sendEmail({
            to:connection.to_user_id.email,
            subject,body
        })
        return {message:"reminder sent"}

    }
)}
)
export const functions = [syncUserCreation,sendNewConnectionReminder,syncUserDeleting,syncUserUpdating];