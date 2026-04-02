const role = (rolesPermitidos) => {

    return (req, res, next) => {
        

        if (!req.user) {
            return res.status(401).json({ error: 'Acceso denegado: usuario no autenticado' });
        }  
        
        
        // Obtén el rol del usuario desde req.user
        const userRole = req.user.role_id;

        if (!rolesPermitidos.includes(userRole)) {
            return res.status(403).json({ error: 'Acceso denegado: rol no permitido' });
        }

        next();
    };  
}

module.exports = role;