

import { EventEmitter } from "events"
import { sendEmail } from "../../service/sendEmails.js"
import { generateToken } from "../token/generateToken.js"
export const eventEmitter = new EventEmitter()


eventEmitter.on("sendEmail", async (data) => {
    const { email } = data;
    // generate confirmation token and send email link
    const token = await generateToken({
        payload: { email, },
        SIGNATURE: process.env.SIGNATURE_CONFIRMATION,
        option: { expiresIn: "3m" }
    })
    const link = `http://localhost:3000/users/confirmEmail/${token}`
    await sendEmail(email, "Confirm Email", `<a href='${link}'>Confirm Me</a>`)
})