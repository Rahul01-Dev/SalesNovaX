import mongoose from 'mongoose';

const logSchema = mongoose.Schema({
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false // allow system actions or public actions without specific user
    },
    action:{
        type:String, // e.g.  'cretae invoice ','Delete invoice'
        required:true
    },
    entity:{
        type:String,
        required:false
    },
    entityId:{
        type:String, 
        required:false
    },
    details:{
        type:String, //Descriptions of what happend
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const Log = mongoose.model('Log',logSchema);