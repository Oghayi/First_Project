//Set up your Express app
import express from "express";

const app = express();//create an express app

app.use(express.json()); //middleware to parse JSON bodies it gets from the client side

//import routes
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

//routes declaration
app.use("/api/v1/posts", postRouter);

//routes declaration
app.use("/api/v1/users", userRouter);

//example route: http://localhost:4000/api/v1/users/register


export default app;