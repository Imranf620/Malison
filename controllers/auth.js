import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import  Jwt  from "jsonwebtoken";

 

export const register = async (req, res, next) => {
    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(200).send(newUser);
    } catch (err) {
        console.error(err); // Log the error
        next(err);
    }
};



export const login = async (req, res, next) => {
    try {

     const user  = await User.findOne({username:req.body.username})
     if (!user) return next(createError(404, "User Not Found"))
     
     const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
        );
    if (!isPasswordCorrect)
     return next(createError(400, "Wrong Password or username"));

     const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);


     const {password, ...otherDetails} = user._doc;

        res.cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({...otherDetails});
    } catch (err) {
        next(err)
    }
}