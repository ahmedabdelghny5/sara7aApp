
import joi from "joi";
import { generalRules } from "../../utils/generalRules/index.js";
import { enumGender } from "../../DB/models/user.model.js";

export const signUpSchema = {
    body: joi.object({
        name: joi.string().min(3).max(5).alphanum().required(),
        email: generalRules.email.required(),
        password: generalRules.password.required(),
        cPassword: joi.string().valid(joi.ref("password")).required(),
        gender: joi.string().valid(enumGender.female, enumGender.male).required(),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/).required(),
    })

}
export const updateProfileSchema = {
    body: joi.object({
        name: joi.string().min(3).max(5).alphanum(),
        gender: joi.string().valid(enumGender.female, enumGender.male),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/),
    }),
    headers: generalRules.headers.required()

}
export const updatePasswordSchema = {
    body: joi.object({
        oldPassword: generalRules.password.required(),
        newPassword: generalRules.password.required(),
        cPassword: generalRules.password.valid(joi.ref("newPassword")).required(),
    }),
    headers: generalRules.headers.required()

}
export const freezeAccountSchema = {
    headers: generalRules.headers.required()

}
export const shareProfileSchema = {
    params: joi.object({
        id: generalRules.id.required(),
    }).required(),

}