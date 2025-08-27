import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            console.error('Error: La variable de entorno MONGO_URI no está definida.');
            process.exit(1);
        }

        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Conexión a MongoDB establecida: ${conn.connection.host}`);

    } catch (error) {
        console.error({ 
            message: 'Error while trying to connect to MongoDB',
            error: error.message
        });
        process.exit(1);
    }
};

export default connectDB;

