import jwt from 'jsonwebtoken'

export const  jwtMiddleware =  (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message:"User not Registered"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
 }
