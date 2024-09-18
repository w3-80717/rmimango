const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }
  return null;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const checkRole = (requireAdmin, isAdmin) => {
  if (requireAdmin !== isAdmin) {
    throw new Error("Access denied");
  }
};

const authMiddleware = ({ requireAdmin = false } = {}) => {
  return (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      checkRole(requireAdmin, req.user.isAdmin);
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
      console.log(error);
    }
  };
};

module.exports = authMiddleware;
