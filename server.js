

import { createUser, createEvent } from './userCreation.js'; 
import express from 'express';
import { handleSearch } from './googleSearchApi.js';
import { conditionalExecutionBasedOnGroupOne } from './pushN.js';
import setupMiddleware from './setupMiddleware.js';
import { loginUser } from './userValidation.js';

// Import other handlers as needed

const app = express();
const port = 3000;


setupMiddleware(app); // This sets up CORS and other middleware

//defined routes
app.post('/create-user', createUser);
app.post('/create-events', createEvent);

app.post('/login', loginUser);
app.post('/search', handleSearch);
app.post('/pushingNeuronToEngineNetwork', conditionalExecutionBasedOnGroupOne);




// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(port, () => {
    console.log('Server listening on port 3000');  
  });

















  