import { UnAuthorizedError } from '../errors/index.js'



const authPermissions = (...roles) => {

return (req,res,next)=>{
 console.log(req.user)
 if (!roles.includes(req.user.role)){
  
 throw new UnAuthorizedError('Unauthorized')

 
}
next();
}}
export default authPermissions
