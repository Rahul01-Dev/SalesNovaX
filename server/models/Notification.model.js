import mongoose from "mongoose";


const notificationSchema = mongoose.Schema({
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    type:{
        type:String,
        enum:['info','sucess','warning','error'],
        default:'info'
    },
    message:{
        type:String,
        required:true
    },
    link:{
        type:String,//Internal route like /invoice/id
        required:false
    },
    isRead:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const Notification=mongoose.model('Notification',notificationSchema);