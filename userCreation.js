

import fs from 'fs/promises';
import { URL } from 'url';

// Assuming the users.json is in the 'data' subdirectory of the directory where this script is located


export async function createUser(req, res) {
    try {
        const {
            firstName,
            lastName,
            userName,
            password,
            email,
            streetAddress,
            unit,
            city,
            state,
            zip,
            dateOfBirth,
            phoneNumber
        } = req.body;
        

        const dataPath = new URL('data/users.json', import.meta.url).pathname;

        // Read the current users data
        const data = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(data);

        // Check if the user already exists by email
        if (users.some(user => user.userdetails.email === email)) {
            console.log('User already exists');
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Add the new user with nested userDetails
        const newUser = {
             // Nesting user details under 'userdetails'
                firstName,
                lastName,
                email,
                streetAddress,
                unit,
                city,
                state,
                zip,
                dateOfBirth: new Date(dateOfBirth), // Assuming the date comes as a string
                phoneNumber,
                Logins: { // Nesting login details under 'Logins'
                    userName,
                    password
                },
                userURLs:[]
                    

            
        };
        users.push(newUser);

        // Save the updated users back to the file
        await fs.writeFile(dataPath, JSON.stringify(users, null, 2), 'utf8');
        console.log('User created successfully');

        res.status(201).json({ message: 'User created successfully.'});
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};







export async function createEvent(req, res) {
    try {
        const { eventName, eventDate, eventLocation, specialFeatures } = req.body;
        console.log('Event creation request received:');

        const dataPath = new URL('data/events.json', import.meta.url).pathname;

        // Read the current events data
        const data = await fs.readFile(dataPath, 'utf8');
        const events = JSON.parse(data);

        // Optionally, check if the event already exists by name and date
        if (events.some(event => event.eventName === eventName && event.eventDate === eventDate)) {
            return res.status(409).json({ message: 'Event already exists.' });
        }

        // Add the new event
        const newEvent = { eventName, eventDate, eventLocation, specialFeatures: specialFeatures.slice(0, 5) }; // Ensure not more than 5 features
        events.push(newEvent);

        // Save the updated events back to the file
        await fs.writeFile(dataPath, JSON.stringify(events, null, 2), 'utf8');
        
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


