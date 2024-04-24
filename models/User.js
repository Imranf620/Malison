import mongoose from 'mongoose';
import validate from 'mongoose-validator';
const { Schema } = mongoose;

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Please enter a valid email address',
    }),
];

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"Username already in use"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: emailValidator // Applying email validator
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.model("User", UserSchema);
