const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header is missing or invalid');
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.jwt_secret);
        const userId = decodedToken.userId;

        // Log the extracted token and user ID for debugging
        console.log('Extracted token:', token);
        console.log('Decoded user ID:', userId);

        req.body.userId = userId;
        next();
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(403).send({
            success: false,
            message: 'User is unauthorized'
        });
    }
};
