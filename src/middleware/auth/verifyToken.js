    import jwt from "jsonwebtoken";

    export const verifyToken = (req, res, next) => {
        let token = req.cookies.token || req.header('Authorization');
        if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length).trimLeft();
            }

            const decoded = jwt.verify(token, 'harshil@52');
            req.userId = decoded.userId;
            req.role = decoded.role;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
