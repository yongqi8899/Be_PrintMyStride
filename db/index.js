import mongoose from "mongoose"

const dbInit = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI, {dbName: 'CustomShoeStore'})
        console.log(`Connected to MongoDB: ${conn.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbInit
