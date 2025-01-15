import { generalRules } from "../../utils/index.js";
import joi from "joi";

export const sendMessageSchema = {
    body: joi.object({
        content: joi.string().required(),
        userId: generalRules.id.required(),

    }).required()
}

export const getMessagesSchema = {
    headers: generalRules.headers.required()
}