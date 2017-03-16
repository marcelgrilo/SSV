// ssv-server.js


// Base Setup
//

// packages:
import bodyParser from 'body-parser';
import express from 'express';

// internal:
import ssvRouter from './SSVRouter';

// define the app to use express
const app = express();

// config the app to use bodyParser(), to get the data from POST for ex.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// all of our routes will be prefixed with /api/ssv
app.use('/api/ssv', router);


// set the default port.
var port = process.env.PORT || 8080;

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
