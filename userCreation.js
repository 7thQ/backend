

// userCreation.js

import fs from 'fs/promises';

// Assuming the users.json is in the 'data' subdirectory of the directory where this script is located
const dataPath = new URL('data/users.json', import.meta.url).pathname;

export async function createUser(req, res) {
    try {
        const { name, email, password, address, age, phoneNumber } = req.body;

        // Read the current users data
        const data = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(data);

        // Check if the user already exists by email
        if (users.some(user => user.email === email)) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Add the new user
        const newUser = { name, email, password, address, age, phoneNumber };
        users.push(newUser);

        // Save the updated users back to the file
        await fs.writeFile(dataPath, JSON.stringify(users, null, 2), 'utf8');
        console.log('User created successfully');

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}








const ddataPath = new URL('data/events.json', import.meta.url).pathname;

export async function createEvent(req, res) {
    try {
        const { eventName, eventDate, eventLocation, specialFeatures } = req.body;

        // Read the current events data
        const data = await fs.readFile(ddataPath, 'utf8');
        const events = JSON.parse(data);

        // Optionally, check if the event already exists by name and date
        if (events.some(event => event.eventName === eventName && event.eventDate === eventDate)) {
            return res.status(409).json({ message: 'Event already exists.' });
        }

        // Add the new event
        const newEvent = { eventName, eventDate, eventLocation, specialFeatures: specialFeatures.slice(0, 5) }; // Ensure not more than 5 features
        events.push(newEvent);

        // Save the updated events back to the file
        await fs.writeFile(ddataPath, JSON.stringify(events, null, 2), 'utf8');
        
        // Log the event name and up to 3 special features to the console
        console.log(`Event created successfully: ${eventName}`);
        specialFeatures.slice(0, 3).forEach((feature, index) => {
            console.log(`Special Feature ${index + 1}: ${feature}`);
        });

        // Send a response including the total number of events
        res.status(201).json({ 
            message: 'Event created successfully.',
            totalEvents: events.length // Include the total number of events in the response
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


// if (user) {
//     console.log('Login successful');
//     res.status(200).json({ message: 'Login successful' });
// } else {
//     console.log('Login failed');
//     res.status(401).json({ message: 'Invalid email or password' });
// }

