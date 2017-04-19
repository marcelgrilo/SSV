// imports
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/users';
import productsRouter from './routes/products';
import clientsRouter from './routes/clients';
import addressesRouter from './routes/addresses';
import authRouter from './routes/auth';
import authorization from './auth';

// consts
const app = express();

app.config = config;
app.datasource = datasource(app);

const port = process.env.PORT || 8080;
app.set('port', port);

app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

// routes
usersRouter(app);
productsRouter(app);
clientsRouter(app);
addressesRouter(app);
authRouter(app);

// end
export default app;
