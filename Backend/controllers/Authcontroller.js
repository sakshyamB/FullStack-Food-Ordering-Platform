const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require("../models/Users");

exports.PostSignup = [
    body('username')
    .notEmpty()
    .withMessage('Username is required')
    .trim()
    .isLength({ min:3, max:20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('Username must contain only alphabets and spaces'),

    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

    body('c-password')
    .notEmpty()
    .withMessage('Please confirm your password')
    .custom((value, {req})=>{
        if( value !== req.body.password){
            throw Error ('Password and confirm password did not  matched');
        }}),

    body('role')
    .notEmpty()
    .withMessage("User role should be selected")
    .isIn(['user', 'admin'])
    .withMessage("Role should be either admin or user."),

    body('terms&conditions')
    .custom ((value)=>{
        if(!value){
            throw Error ("Please accept our terms and conditions first.");
        }}),

    async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        }
        const {username, email, password, role} = req.body;
        const user = await User.findOne({email})
        if(user){
         return res.status(401).json({ error: "User with this email already exist." });    
        }
        bcrypt.hash(password, 10, (error, hashedPassword)=>{
            if(error){
                return res.status(500).json({error: "Error hashing password"});
            }
            const newUser = new User({
                username,
                email,
                role,
                password: hashedPassword
            });
            newUser.save()
            .then((user)=>{
                res.status(201).json({message: "User created successfully", user});
            })
            .catch((error)=>{
                res.status(500).json({error: "Error saving user"});
            });
        });
    }
]

exports.PostLogin = async (req, res, next) => {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json(
        { message: "Login successful",
        user:{
        username: user.username,
        email: user.email,
        usertype: user.usertype
    }}
    );
}
