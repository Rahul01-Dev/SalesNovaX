import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    settings:{
        currency:{
            type:String,
            default:"INR"
        }
    },
    branding:{
        logo:{
            type:String
        },
        primaryColor:{
            type:String,
            default:'#4f46e5'
        }
    },
    subscriptionPlan:{
        type:String,
        enum:['free','pro'],
        default:'free'
    }

},{
    timestamps:true
})

export const Organization = mongoose.model('Organization',OrganizationSchema);