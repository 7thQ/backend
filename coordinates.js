
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
    console.log('Received request to add event');

    const { eventName,
        latitude,
        longitude,
        streetAddress,
        city,
        state,
        zipCode,
        start,
        end,
        features } = req.body;

        console.log('Received request to add event', { eventName,
            latitude,
            longitude,
            streetAddress,
            city,
            state,
            zipCode,
            start,
            end,
            features });

            const dataRefomat = 

            {
            
            eventName,
            
            eventDates: {
              start,
              end
            },
            location: {
              streetAddress,
              city,
              state,
              zipCode,
            },
            features: features,
            Coordinate: {
              latitude,
              longitude
            }
          }
           

            console.log('Received request to add event', dataRefomat);




}


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
            userdetails: { // Nesting user details under 'userdetails'
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
                    password}

            }
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


