const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log(`Success MongoDB`);
    }catch(error){
        console.log(`Failed MongoDB: ${error.message}`);
    }
}

module.exports = connectToDatabase;
