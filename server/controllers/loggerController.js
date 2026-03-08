import { Log } from "../models/Log.model";

// des : Get organization activity logs
// route : Get /api/v1/logs
//access : Private

const getLogs = async (req,res)=>{
    try {

        const logs = await Log.find({ organization:req.organizationId })
            .populate('user','name')
            .sort({ createdAt : -1})
            .limit(100);
        
        res.json(logs);
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

//Internal Helper to log actions 

const logAction = async(user,organization,action,entity,entityId,details)=>{

    try {

        await Log.create({
            user,
            organization,
            action,
            entity,
            entityId,
            details
        });
        
    } catch (error) {
        console.error('logging failed!',error);
    }

}

export {getLogs,logAction};