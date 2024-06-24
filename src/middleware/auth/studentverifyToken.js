import jwt from "jsonwebtoken";

export const studentverifyToken = (req, res, next) => {
    let token = req.cookies.token || req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    try {
        if (token.startsWith('Bearer ')) { // Properly extract the token from Bearer
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, 'harshil@52');
        req.studentId = decoded.studentId; // Ensure you attach the correct claims as per token creation
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
