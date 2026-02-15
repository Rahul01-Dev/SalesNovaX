import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    organization : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['owner','admin','member'],
        default:'member'
    }
},{ timestamps:true});

export const User = mongoose.model('User',UserSchema);