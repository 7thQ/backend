

import { createUser, createEvent } from './userCreation.js'; 
import express from 'express';
import { handleSearch } from './googleSearchApi.js';
import { conditionalExecutionBasedOnGroupOne } from './pushN.js';
import setupMiddleware from './setupMiddleware.js';
import { loginUser, getUserDetails } from './userValidation.js';
import { getCountrys, getEvents, addEvent, getParcels } from './coordinates.js'
import { getVideos } from './videos.js'
import {  uploadingMedia } from './uploadAllMedia.js'

import path from 'path';

// Import other handlers as needed

const app = express();
const port = 3000;


console.log('Applying general middleware...');
setupMiddleware(app);
console.log('General middleware applied successfully.');

// setupMiddleware(app); // This sets up CORS and other middleware

// Logging middleware for static file access under '/data'
app.use('/data', (req, res, next) => {
  const now = new Date();
  console.log(`${now.toISOString()} - ${req.method} request for ${req.url} under /data`);
  next(); // Pass control to the next handler
});

// Serve static files from the 'data' directory
app.use('/data', express.static(path.join( 'data')));


//defined routes

app.post('/create-user', createUser);
app.post('/create-events', createEvent);
app.post('/login', loginUser);
app.post('/search', handleSearch);
app.post('/pushingNeuronToEngineNetwork', conditionalExecutionBasedOnGroupOne);
app.get('/get-user', getUserDetails);
app.post('/add-event', addEvent);
app.get('/get-events', getEvents);
app.get('/get-countrys', getCountrys);
app.get('/get-Videos', getVideos);
app.post('/add-Video', uploadingMedia)
app.get('/get-parcels', getParcels);



// , postVideos
// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(port, () => {
    console.log('Server listening on port 3000');  
  });

















  