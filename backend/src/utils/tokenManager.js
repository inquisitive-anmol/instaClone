const jwt = require("jsonwebtoken");

class TokenManager {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        });
    }

    static generateRefrheshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN  || '7d',
        });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    static verifyRefreshToken(token) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }

    static sendToken(user, msg, res) {
        const payload = {
            id: user._id,
          };
        
          const token = TokenManager.generateToken(payload);
        
          const tokenExpiryDays = process.env.TOKEN_EXPIRY_DAYS || 1; // Default to 1 day if not set
          const tokenExpiryMs = tokenExpiryDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: tokenExpiryMs,
          });
        
          res.status(200).json({
            success: true,
            message: msg,
            user,
          });
    }
}

module.exports = TokenManager;