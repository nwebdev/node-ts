import express from "express";
import appLogger from "../middlewares/appLogger";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const userRouter: express.Router = express.Router();

userRouter.get('/', (request: express.Request, response: express.Response) => {
    response.status(200).send(` <h3>Welcome to API USER ROuter</h3>`);
})

userRouter.get('/test', (req: express.Request, res: express.Response) => {
    res.status(200).send(`<h1>/TEST ROUTE USER Path</h1>`);
});

// userRouter.post('/login',(req:express.Request, res:express.Response) => {
//     let formData = req.body;
//     res.status(200).json({
//         msg : "form data is rece",
//         formData: formData
//     });

// });

/**REQUIRED  */

userRouter.post('/register', [
    body('name').not().isEmpty().withMessage('Username is Required'),
    body('email').isEmail().withMessage('Add Valid Email'),
    body('password').isLength({ min: 5 }).withMessage('Min 5 char required for password')
], async (request: express.Request, response: express.Response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    let { name, email, password } = request.body;

    try {
        // throw new Error('sorry');
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        response.status(200).json({
            user: { name, email, password },
            hashed_password: hashedPassword
            // formData: formData
        });
    } catch (error) {
        response.status(400).json({
            success: false,
            message: `${error}`
        });
    }

});

userRouter.post('/login', (request: express.Request, response: express.Response) => {
    let { email, password } = request.body;
    let pass: string = "$2a$10$9iGsqVlxTNfxozIXaoewrel2m6EmeCUjNMOkaMwUBqUrGgj1.jeRu";
    let isValid = bcrypt.compareSync(password, pass);

    console.log(isValid);
    response.json({
        "is": isValid
    })
});

export default userRouter;