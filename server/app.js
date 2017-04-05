import express from 'express';
import bodyParser from 'body-parser';




const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.json());

app.set('port', port);


export default app;
