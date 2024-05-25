
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


// export const addEvent = async (req, res) => {
//     try {
//         const {
//             userName,
//             eventName,
//             latitude,
//             longitude,
//             streetAddress,
//             city,
//             state,
//             zipCode,
//             start,
//             end,
//             features
//         } = req.body;

//         const dataPath = new URL('data/userHosted.json', import.meta.url).pathname;

//         // Read the current user-hosted events data
//         const data = await fs.readFile(dataPath, 'utf8');
//         const userHosted = JSON.parse(data);

//         // Check if the event already exists by address or coordinates
//         // if (userHosted.some(event =>
//         //     (event.location.streetAddress === streetAddress && 
//         //      event.location.city === city && 
//         //      event.location.state === state && 
//         //      event.location.zipCode === zipCode) || 
//         //     (event.Coordinate.latitude === latitude && 
//         //      event.Coordinate.longitude === longitude)
//         // )) {
//         //     console.log('Event already exists at this location');
//         //     return res.status(409).json({ message: 'Event already exists at this location.' });
//         // }

//         console.log('Received request to add event', {
//             userName,
//             eventName,
//             latitude,
//             longitude,
//             streetAddress,
//             city,
//             state,
//             zipCode,
//             start,
//             end,
//             features
//         });

//         const newEvent = {
//             userName,
//             eventName,
//             eventDates: {
//                 start: new Date(start),
//                 end: new Date(end)
//             },
//             location: {
//                 streetAddress,
//                 city,
//                 state,
//                 zipCode,
//             },
//             features,
//             Coordinate: {
//                 latitude,
//                 longitude
//             },
//             url:[]
//         };

//         userHosted.push(newEvent);

//         // Save the updated events back to the file
//         await fs.writeFile(dataPath, JSON.stringify(userHosted, null, 2), 'utf8');
//         console.log('Event added successfully');

//         res.status(201).json({ message: 'Event added successfully.' });
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Assuming the users.json is in the 'data' subdirectory of the directory where this script is located





// // Object to hold the current value for each part of the ID
// const idParts = {
//     WC: 1,
//     C: 1,
//     S: 1,
//     SC: 1,
//     CT: 1,
//     N: 1,
//     UP: 1
//   };
  
//   // Function to generate the current unique id based on the specified structure
//   const generateCurrentId = () => {
//     return `P1WC${idParts.WC}C${idParts.C}S${idParts.S}SC${idParts.SC}CT${idParts.CT}N${idParts.N}UP${idParts.UP}`;
//   };
  
//   // Function to increment the ID parts
//   const incrementIdParts = () => {
//     idParts.UP += 1;  // Increment the "UP" part
//     if (idParts.UP > 999999) {
//       idParts.UP = 1;
//       idParts.N += 1;
//     }
//     if (idParts.N > 999999) {
//       idParts.N = 1;
//       idParts.CT += 1;
//     }
//     if (idParts.CT > 999999) {
//       idParts.CT = 1;
//       idParts.SC += 1;
//     }
//     if (idParts.SC > 999999) {
//       idParts.SC = 1;
//       idParts.S += 1;
//     }
//     if (idParts.S > 999999) {
//       idParts.S = 1;
//       idParts.C += 1;
//     }
//     if (idParts.C > 999999) {
//       idParts.C = 1;
//       idParts.WC += 1;
//     }
//   };
  
//   export const addEvent = async (req, res) => {
//       try {
//           const dataPath = new URL('data/userHosted.json', import.meta.url).pathname;
//           const data = await fs.readFile(dataPath, 'utf8');
//           const userHosted = JSON.parse(data);
  
//           // Determine the maximum UP value from the existing IDs
//           const maxUP = userHosted.reduce((max, event) => {
//               const currentUP = parseInt(event.id.split('UP')[1]);
//               return currentUP > max ? currentUP : max;
//           }, 0);
//           idParts.UP = maxUP + 1; // Set the initial UP value based on the maximum found
  
//           const { userName, eventName, latitude, longitude, streetAddress, city, state, zipCode, start, end, features } = req.body;
  
//           // Generate a unique ID for the new event
//           const eventId = generateCurrentId();
//           // Increment the ID parts for the next event
//           incrementIdParts();
  
//           const newEvent = {
//               id: eventId,
//               userName,
//               eventName,
//               eventDates: { start: new Date(start), end: new Date(end) },
//               location: { streetAddress, city, state, zipCode },
//               features,
//               Coordinate: { latitude, longitude },
//               eventURLs: []
//           };
  
//           userHosted.push(newEvent);
//           await fs.writeFile(dataPath, JSON.stringify(userHosted, null, 2), 'utf8');
  
//           res.status(201).json({ message: 'Event added successfully.', id: eventId });
//       } catch (error) {
//           console.error('Server error:', error);
//           res.status(500).json({ message: 'Server error' });
//       }
//   };
  

// Object to hold the current value for each part of the ID
const idParts = {
    WC: 1,
    C: 1,
    S: 1,
    SC: 1,
    CT: 1,
    N: 1,
    UP: 1
};

// Function to generate the current unique id based on the specified structure
const generateCurrentId = () => {
    console.log('Generating current ID...');
    return `P1WC${idParts.WC}C${idParts.C}S${idParts.S}SC${idParts.SC}CT${idParts.CT}N${idParts.N}UP${idParts.UP}`;
};

// Function to increment the ID parts
const incrementIdParts = () => {
    console.log('Incrementing ID parts...');
    idParts.UP += 1;  // Increment the "UP" part
    if (idParts.UP > 999999) {
        idParts.UP = 1;
        idParts.N += 1;
    }
    if (idParts.N > 999999) {
        idParts.N = 1;
        idParts.CT += 1;
    }
    if (idParts.CT > 999999) {
        idParts.CT = 1;
        idParts.SC += 1;
    }
    if (idParts.SC > 999999) {
        idParts.SC = 1;
        idParts.S += 1;
    }
    if (idParts.S > 999999) {
        idParts.S = 1;
        idParts.C += 1;
    }
    if (idParts.C > 999999) {
        idParts.C = 1;
        idParts.WC += 1;
    }
    console.log('New ID parts after increment:', idParts);
};

// Function to handle the addition of a new event
export const addEvent = async (req, res) => {
    try {
        const dataPath = new URL('data/userHosted.json', import.meta.url).pathname;
        console.log('Reading user hosted events data...');
        const data = await fs.readFile(dataPath, 'utf8');
        const userHosted = JSON.parse(data);

        // Determine the maximum UP value from the existing IDs
        console.log('Determining maximum UP value...');
        const maxUP = userHosted.reduce((max, event) => {
            const currentUP = parseInt(event.id.split('UP')[1]);
            return currentUP > max ? currentUP : max;
        }, 0);
        idParts.UP = maxUP + 1; // Set the initial UP value based on the maximum found

        const { userName, eventName, latitude, longitude, streetAddress, city, state, zipCode, start, end, features } = req.body;

        // Generate a unique ID for the new event
        console.log('Generating event ID...');
        const eventId = generateCurrentId();
        // Increment the ID parts for the next event
        incrementIdParts();

        const newEvent = {
            id: eventId,
            userName,
            eventName,
            eventDates: { start: new Date(start), end: new Date(end) },
            location: { streetAddress, city, state, zipCode },
            features,
            Coordinate: { latitude, longitude },
            eventURLs: []
        };

        console.log('Adding new event...');
        userHosted.push(newEvent);
        await fs.writeFile(dataPath, JSON.stringify(userHosted, null, 2), 'utf8');

        res.status(201).json({ message: 'Event added successfully.', id: eventId });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
