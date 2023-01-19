import express from "express";
import appLogger from "./middlewares/appLogger";
import apiRouter from "./router/apiRouter";
import userRouter from "./router/userRouter";

const app:express.Application = express();
require('dotenv').config()
// console.log("\n" + process.env.HOST)
const hostname:string =  process.env.HOST ? process.env.HOST : "127.0.0.1";
const port:number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

//configure express to receive from data
app.use(appLogger);
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/", (request:express.Request, response:express.Response)=>{
    response.status(200).send(`<h3>Hiiii</h3>`);
    // response.send();
    // console.log('dd');
});


app.use('/api', apiRouter);
app.use('/user', userRouter);

app.listen(port, hostname, () => {
    console.log(`API SAMPLE START http://${hostname}:${port}`);
});