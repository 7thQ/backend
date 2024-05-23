
import fs from 'fs/promises'; // Use fs/promises for async/await
import { URL } from 'url';



// export const getcoordinates = async (req, res) => {
//     const eventQuery = req.query.events; // This could be used to specify if the request is for coordinates
//     console.log('Received Query:', eventQuery);

//     // Path to the coordinates data file
//     const dataPath = new URL('data/coordinates.json', import.meta.url).pathname;

//     try {
//         // Read and parse the coordinates data file asynchronously
//         const data = await fs.readFile(dataPath, 'utf8');
//         const coordinates = JSON.parse(data);

//         // Check if the query parameter matches the expected one
//         if (eventQuery === 'all') {
//             console.log('Sending all coordinates');
//             res.status(200).json({message: 'Server',coordinates: coordinates});
//         } else {
//             // If the query parameter is not what was expected
//             console.log('Invalid query parameter');
//             res.status(400).json({ message: 'Invalid query parameter' });
//         }
//     } catch (err) {
//         console.error('Error accessing coordinates data:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

export const getEvents = async (req, res) => {
    const eventQuery = req.query.userEvents; // This could be used to specify if the request is for coordinates
    console.log('Received Query:', eventQuery);

    // Path to the coordinates data file
    const dataPath = new URL('data/userHosted.json', import.meta.url).pathname;

    try {
        // Read and parse the coordinates data file asynchronously
        const data = await fs.readFile(dataPath, 'utf8');
        const userHosted = JSON.parse(data);

        // Check if the query parameter matches the expected one
        if (eventQuery === 'all') {
            console.log('Sending all events');
            res.status(200).json({message: 'Server',userHosted: userHosted});
        } else {
            // If the query parameter is not what was expected
            console.log('Invalid query parameter');
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (err) {
        console.error('Error accessing coordinates data:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCountrys = async (req, res) => {
    const countryQuery = req.query.displayCountrys; // This could be used to specify if the request is for coordinates
    console.log('Received Query:', countryQuery);

    // Path to the coordinates data file
    const dataPath = new URL('data/countries.json', import.meta.url).pathname;

    try {
        // Read and parse the coordinates data file asynchronously
        const data = await fs.readFile(dataPath, 'utf8');
        const countries = JSON.parse(data);

        // Check if the query parameter matches the expected one
        if (countryQuery === 'all') {
            console.log('Sending all countys');
            res.status(200).json({message: 'Server',countries: countries});
        } else {
            // If the query parameter is not what was expected
            console.log('Invalid query parameter');
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (err) {
        console.error('Error accessing coordinates data:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const addEvent = async (req, res) => {
    try {
        const {
            userName,
            eventName,
            latitude,
            longitude,
            streetAddress,
            city,
            state,
            zipCode,
            start,
            end,
            features
        } = req.body;

        const dataPath = new URL('data/userHosted.json', import.meta.url).pathname;

        // Read the current user-hosted events data
        const data = await fs.readFile(dataPath, 'utf8');
        const userHosted = JSON.parse(data);

        // Check if the event already exists by address or coordinates
        // if (userHosted.some(event =>
        //     (event.location.streetAddress === streetAddress && 
        //      event.location.city === city && 
        //      event.location.state === state && 
        //      event.location.zipCode === zipCode) || 
        //     (event.Coordinate.latitude === latitude && 
        //      event.Coordinate.longitude === longitude)
        // )) {
        //     console.log('Event already exists at this location');
        //     return res.status(409).json({ message: 'Event already exists at this location.' });
        // }

        console.log('Received request to add event', {
            userName,
            eventName,
            latitude,
            longitude,
            streetAddress,
            city,
            state,
            zipCode,
            start,
            end,
            features
        });

        const newEvent = {
            userName,
            eventName,
            eventDates: {
                start: new Date(start),
                end: new Date(end)
            },
            location: {
                streetAddress,
                city,
                state,
                zipCode,
            },
            features,
            Coordinate: {
                latitude,
                longitude
            },
            url:[]
        };

        userHosted.push(newEvent);

        // Save the updated events back to the file
        await fs.writeFile(dataPath, JSON.stringify(userHosted, null, 2), 'utf8');
        console.log('Event added successfully');

        res.status(201).json({ message: 'Event added successfully.' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Assuming the users.json is in the 'data' subdirectory of the directory where this script is located

