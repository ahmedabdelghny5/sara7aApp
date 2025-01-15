import cors from "cors"
import connectionDB from './DB/connectionDB.js';
import messageRouter from './modules/messages/message.controller.js';
import userRouter from './modules/users/user.controller.js';
import { globalErrorHandler } from './utils/globalErrorHandling/index.js';


const bootstrap = async (app, express) => {

    app.use(cors());
    app.use(express.json());

    app.get("/",(req,res,next)=>{
        return res.status(201).json({ msg: "Hello on sara7a app" })
    })
    app.use("/users", userRouter)
    app.use("/messages", messageRouter)
    connectionDB()
    app.use("*", (req, res, next) => {
        return next(new Error(`${req.originalUrl} is inValid URL `, { cause: 404 }))
    })

    // Error Handling middleware
    app.use(globalErrorHandler)
}

export default bootstrap