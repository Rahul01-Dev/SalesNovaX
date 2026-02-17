import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema({
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required:true,
        index:true
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        trim:true,
        lowercase:true
    },
    phone:{
        type:String
    },
    status:{
        type:String,
        enum:['new','contacted','qualified','proposal','won','lost'],
        default:'new'
    },
    source:{
        type:String
    },
    notes:{
        type:String
    },
    aiScore:{
        type:Number,
        min:0,
        max:100
    },
    aiAnalysis:{
        type:String
    },
    value:{
        type:String
    },
    emails:[{
        subject:String,
        body:String,
        sentAt:{
            type:Date,
            default:Date.now
        },
        messageId:String
    }]

},{timestamps:true});

export const Lead = mongoose.model('Lead',LeadSchema);