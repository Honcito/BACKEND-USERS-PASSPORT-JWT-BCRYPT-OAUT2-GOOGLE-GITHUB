import { body } from 'express-validator';

export const validateAuth = [
    body('email').isEmail().withMessage('El correo electrónico no es válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];