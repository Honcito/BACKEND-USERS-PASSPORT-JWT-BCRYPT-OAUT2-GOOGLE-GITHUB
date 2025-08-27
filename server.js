import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/auth.js'
import passport from 'passport'

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Conexión con la base de datos
connectDB();

// Middlewares
app.use(express.json()); // Permite analizar cuerpos de petición JSON
app.use(cors()); // Para peticiones desde el frontend
app.use(helmet()); // Añade headers de seguridad
app.use(morgan('dev')); // Registra las peticiones HTTP en la consola
app.use(passport.initialize()); // Iniciar Passport

// app.use((req, res, next) => {
//     console.log(`Petición entrante: ${req.path} ${req.method}`);
//     next();
// });

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`)
});
    
