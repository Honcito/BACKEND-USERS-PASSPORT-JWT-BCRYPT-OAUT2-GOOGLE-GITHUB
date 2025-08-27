import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';
import '../config/passport-jwt.js';
import { validateAuth } from '../middlewares/validationMiddleware.js';


const router = express.Router();

router.post('/register', validateAuth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                message: 'El usuario ya existe'
            });
        }
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'});
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

router.post('/login', validateAuth, async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
            message: 'Credenciales no válidas'
        });
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        message: 'Acceso autorizado',
        user: req.user
    })
});

router.post('/logout', (req, res) => {
    res.status(200).json({
        message: 'Sesión cerrada correctamente'
    })
})

export default router;