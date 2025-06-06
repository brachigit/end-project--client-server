
const managerJWT = (req, res, next) => {
    
if (req.user && req.user.roles=='Admin') {
    return next()

} 
return res.status(401).json({ message: 'Unauthorized Admin' })
}
module.exports = managerJWT

