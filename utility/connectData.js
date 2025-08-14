const mongoose = require("mongoose")

const connectDatabase = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)      
        console.log("db connected successfully")                  
    } catch (error) {
        console.log(error.message, "Database connection failed")
    }
}

module.exports = connectDatabase;
