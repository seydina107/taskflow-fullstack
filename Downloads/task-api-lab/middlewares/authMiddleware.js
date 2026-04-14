const authMiddleware = (req, res, next) => {
 req.user = {
   id: '65f123456789abcdef123456'
 };
 next();
};
module.exports = authMiddleware;