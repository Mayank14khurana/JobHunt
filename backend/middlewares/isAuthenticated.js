const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.login; 
        console.log("Token is:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not Authenticated"
            });
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode, "Decoded token"); 

        req.id = decode.id; 
        next();
    } catch (err) {
        console.error("Token verification error:", err.message); 
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = isAuthenticated;
