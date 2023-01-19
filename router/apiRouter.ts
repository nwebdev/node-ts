import express from "express";
import appLogger from "../middlewares/appLogger";

const apiRouter:express.Router = express.Router();

apiRouter.get('/', (request:express.Request, response:express.Response) => {
    response.status(200).send(` <h3>Welcome to API ROuter</h3>`);
})

apiRouter.get('/test', (req:express.Request, res:express.Response)=>{
    res.status(200).send(`<h1>/TEST ROUTE Path</h1>`);
});
export default apiRouter;