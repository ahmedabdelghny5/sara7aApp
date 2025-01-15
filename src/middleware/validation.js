import { signUpSchema } from "../modules/users/user.validation.js";



export const validation = (schema) => {
    return async (req, res, next) => {
        let resultError = []
        for (const key of Object.keys(schema)) {
            const result = schema[key].validate(req[key], { abortEarly: false })
            if (result.error) {
                resultError.push(result.error.details)
            }
        }
        if (resultError.length) {
            return res.status(400).json({ message: "Validation error", errors: resultError })
        }
        next()
    }
}