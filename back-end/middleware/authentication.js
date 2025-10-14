export const protect=async(req,res,next)=>{
    try {
        const {userId}=req.auth()
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"not Authenticated"
            })
        }
        next()
    } catch (error) {
        return res.json({
                success:false,
                message:"an error =>"+error.message
            })
    }
}