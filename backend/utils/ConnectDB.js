const mongoose = require('mongoose')
const { MONGO_URL } = require('../config/Config')

const ConnectDB =async()=>{
    try{
        await mongoose.connect(MONGO_URL).then(()=>{
            console.log("Database connected")
        }).catch((err)=>{
            console.log("Database connection failed")
        })
    }catch(error){
        console.error(error)
    }
}

module.exports = ConnectDB;