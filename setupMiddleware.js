


import express from 'express';
import cors from 'cors';



console.log('made it but when? after cors setup');
function setupMiddleware(app) {
    console.log('Setting up CORS middleware...');
    app.use(cors()); // Enable CORS for all routes
    console.log('CORS middleware set up successfully.');

    console.log('Setting up JSON body parsing middleware...');
    app.use(express.json()); // Parse JSON bodies
    console.log('JSON body parsing middleware set up successfully.');

}

console.log('made it here should be the end of setupMiddleware.js');
export default setupMiddleware;

