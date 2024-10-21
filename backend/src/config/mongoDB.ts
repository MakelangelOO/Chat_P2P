import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_DB_CONNECTION_STRING as string
        await mongoose.connect(MONGO_URL)
        console.log('conected to DB')
        
    } catch (error) {
        console.error('error trying to conect with mongoDB', error)
    }
}