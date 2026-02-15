import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import {User} from '../models/user.model.js'
import {Organization} from '../models/organization.model.js'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const generateToken = (id,organizationId,role)=>{
    return jwt.sign({id,organizationId,role},process.env.JWT_SECRET,{
        expiresIn:'5d',
    });
};

//desc : Register a new Organization and owner
//route: POST /api/v1/auth/register
//access: public

const register = async(req,res)=>{
    const {orgName,email,password,name}=req.body;

    try {
        
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: 'User Already Existes !'
            })
        }

        //1. Create Organization

        const organization = await Organization.create({
            name:orgName,
            slug:orgName.toLowerCase().replace(/ /g,'-'),
        })

        //2.Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //3.Create User (Owner )

        const user = await User.create({
            organization:organization._id,
            name,
            email,
            passwordHash: hashedPassword,
            role:'owner',
        });

        if(user){
            res
            .status(201)
            .json({
                _id:user._id,
                name:user.name,
                email:user.email,
                organization:organization._id,
                role:user.role,
                token: generateToken(user._id,organization._id,user.role),
            })
        }else{
            res
            .status(400)
            .json({
                message:"Invalid user Data !!"
            });
        }

    } catch (error) {
        res
        .status(500)
        .json({
            message:error.message
        });
    }
};


// desc : Auth user & get token
//route : POST /api/v1/auth/login
// access : Public 

const login = async (req,res)=>{

    const {email,password}=req.body;

    try {
        const user = await User.findOne({email}).populate('organization');

        if(user && (await bcrypt.compare(password,user.passwordHash))){
            res
            .status(200)
            .json({
                _id:user._id,
                name:user.name,
                email:user.email,
                organization:user.organization,
                role:user.role,
                token:generateToken(user._id,user.organization._id,user.role),
            })
        }else{
            res
            .status(401)
            .json({
                message:"Invalid Email or Password!!!"
            })
        }
    } catch (error) {

        res
        .status(401)
        .json({
            message:error.message
        })
        
    }

}

//desc  get current user
//route Get api/v1/auth/me
//access Private

const getMe = async (req,res)=>{
    const user = await User.findById(req.user.id).select('-passwordHash').populate('organization');
    res
    .status(200)
    .json(user);
};

//desc Update current user Profile
//route Put /api/v1/auth/me
//access Private

const updateMe = async (req,res)=>{
    try {

        const user = await User.findById(req.user.id);

        if(!user) return res.status(404).json({ message:"User not Found!!"});

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.avatarUrl) {
            // Basic schema doesn't have avatarUrl yet, but assuming we can add it or just ignore if strict
            // For now, let's assume we might need to add it to schema or it's flexible.
            // To be safe, let's stick to standard fields or rely on Mongoose 'strict: false' if set (it's not).
            // Let's add it to schema in next step if needed, or just focus on password reset first.
            // Actually, let's handle password reset primarily here.
        }

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(req.body.password,salt);
        }

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            organization:updatedUser.organization,
            role:updatedUser.role,
        });
        
    } catch (error) {
        res
        .status(500)
        .json({
            message:error.message
        })
    }

}

//desc Forgot Password
//route Post /api/v1/auth/forgot-password

const forgotPassword = async(req,res)=>{
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({message:'User not Found!'});

        //generate Token

        const resetToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});

        // In a real app, save hashed token to Db , simply send signed JWT.

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `SalesFlow Support <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: 'Password Reset Request',
            html: `Review reset request. <a href="${resetUrl}">Click here to reset</a>`,
        });

        res.json({message: "Email Sent !"});

        
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}

//desc Reset Password
//route Post /api/v1/auth/reset-password/:token
//access Public

const resetPassword  = async(req,res)=>{
    try {

        const {token}=req.params;
        const {password}=req.body;

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({ message : "Invalid Token"});
        }

        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(password,salt);
        await user.save();

        res.json({
            message:"Password updated Success"
        })
        
    } catch (error) {
        res.status(400).json({message:'Invalid or expired Token!'})
    }
}

export {register,login,getMe,updateMe,forgotPassword,resetPassword};
