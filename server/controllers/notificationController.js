import { Notification } from "../models/Notification.model";
import { User } from "../models/user.model";

//des :  Get user notification
//route: get /api/v1/notifications
//access : Private

const getNotifications = async(req,res)=>{

    try {
        
        const notifications = await Notification.find({
            organization:req.organizationId
        })
        .sort({ createdAt: -1 })
        .limit(20);


        res.json(notifications)
    } catch (error) {
        res
        .status(400)
        .json({
            message: error.message
        })
    }

}

// des : Mark notification as read
//route: PUT /api/v1/notification/:id/read
//access : private

const markRead = async (req,res)=>{

    try {

        const notification = await Notification.findById(req.params.id);

        if(!notification || notification.organization.toString() !== req.organizationId){
            return res.status(404).json({message: 'Notification not Found!'});
        }

        notification.isRead=true;
        await notification.save();

        res.json(notification);
        
    } catch (error) {
        res
        .status(400)
        .json({
            message:error.message
        });
    }

}

//Internal Helper to create Notification

const createNotification = async(organizationId,message,type='info',link=null)=>{

    try {

        await Notification.create({
            organization:organizationId,
            message,
            type,
            link
        });
        
    } catch (error) {
        console.error('Notification creation failed : ',error);
    }

}

export {getNotifications,markRead,createNotification};