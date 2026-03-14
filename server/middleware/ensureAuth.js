export default function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) 
    {
        return next();
    }
    return res.status(401).json( {error: 'Unauthorized'} );
}

export default function ensureAdmin(req, res, next) {
    if (req.user.role === 'admin')
    {
        return next();
    }
    return res.status(403).json( {error: 'Forbidden, admin access required'} );
}