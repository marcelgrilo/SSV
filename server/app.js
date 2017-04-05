import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/users';


const app = express();
const port = process.env.PORT || 8080;

app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());

app.set('port', port);


usersRouter(app);

export default app;
