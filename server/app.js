import express from "express";

const app = express();
const port = process.env.PORT || 8080;



app.set('port', port);


export default app;
