
import jwt from 'jsonwebtoken';
import userModel from '../DB/models/user.model.js';
import { asyncHandler } from '../utils/globalErrorHandling/index.js';


export const roles = {
    admin: "admin",
    user: "user"
}

export const authentication = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    const [prefix, token] = authorization?.split(" ") || []

    if (!prefix || !token) {
        return next(new Error('token not found', { cause: 400 }));
    }
    let SIGNATURE = undefined
    if (prefix == "Admin") {
        SIGNATURE = process.env.SIGNATURE_TOKEN_ADMIN
    } else if (prefix == 'Bearer') {
        SIGNATURE = process.env.SIGNATURE_TOKEN_User
    } else {
        return next(new Error('Invalid token prefix', { cause: 401 }));
    }
    const decoded = jwt.verify(token, SIGNATURE)
    if (!decoded?.id) {
        return next(new Error('Invalid token payload', { cause: 401 }));
    }
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return next(new Error('User not found', { cause: 401 }));
    }

    if (user?.passwordChangedAt.getTime() / 1000 >= decoded.iat) {
        return next(new Error('token expired', { cause: 401 }));
    }
    if (user?.isDeleted) {
        return next(new Error('User is deleted', { cause: 401 }));
    }


    req.user = user
    next()
})



export const authorization = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {

        if (!accessRoles.includes(req.user.role)) {
            return next(new Error('Access denied', { cause: 403 }));
        }
        next()
    })
}
