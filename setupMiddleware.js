


import express from 'express';
import cors from 'cors';



console.log('made it but when? after middle where inports');
function setupMiddleware(app) {
    app.use(cors()); // Enable CORS for all routes
    console.log('made it here in setupMiddleware.js between cors and parsing json bodies');
    app.use(express.json()); // Parse JSON bodies
    console.log('made it here in setupMiddleware.js after parsing json bodies');
    // Add other middleware setup here
}
console.log('made it here should be the end of setupMiddleware.js');
export default setupMiddleware;

