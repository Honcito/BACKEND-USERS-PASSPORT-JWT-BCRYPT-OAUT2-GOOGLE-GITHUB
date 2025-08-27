import express from 'express';
import { 
    getAllUsers, 
    createUser, 
    createMultipleUsers, 
    getUserById, 
    updateUser, 
    deleteUser } from '../controllers/userController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import passport from 'passport';

const router = express.Router();

// Rutas públicas (no se necesita autenticación)
router.post("/", createUser); // El registro de usuarios es una acción pública

// Rutas autenticadas (el usuario debe estar logueado)
router.get('/:id', passport.authenticate('jwt', { session: false }), getUserById);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

// Rutas exclusivas para el administrador (el usuario debe estar logueado Y ser admin)
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, getAllUsers);
router.post('/multiple-users', passport.authenticate('jwt', { session: false }), isAdmin, createMultipleUsers);

// La ruta deleteUserId ya está protegida, pero podemos duplicarla con isAdmin
// si se quiere ser más explícito para los administradores
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteUser);

export default router;