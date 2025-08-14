const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({    
    email: {type: String, required: true, trim: true },
    password: {type: String, trim: true },  
    role: {type: String, enum: ['user', 'admin'], default: 'user'}      
},{timestamps: true, })


const User = mongoose.model("Users", userSchema);

module.exports = User
