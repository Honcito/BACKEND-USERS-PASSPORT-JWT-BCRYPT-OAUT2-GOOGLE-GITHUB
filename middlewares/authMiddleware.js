
export const isAdmin = (req, res, next) => {
    // req.user Objeto de usuario que Passport adjunta en la petición
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            message: 'Acceso denegado: Se requiere rol de administrador'
        })
    }
};