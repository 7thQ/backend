
import fs from 'fs/promises'; // Use fs/promises for async/await
import { URL } from 'url';




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



// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const parseLayerQuery = (layer) => {
//     if (Array.isArray(layer)) {
//         return {
//             firstLayer: layer[0],
//             secondLayer: layer.length > 1 ? layer[1] : null,
//             thirdLayer: layer.length > 2 ? layer[2] : null
//         };
//     } else if (typeof layer === 'string' && layer.startsWith('[') && layer.endsWith(']')) {
//         try {
//             const parsedLayer = JSON.parse(layer);
//             if (Array.isArray(parsedLayer)) {
//                 return {
//                     firstLayer: parsedLayer[0],
//                     secondLayer: parsedLayer.length > 1 ? parsedLayer[1] : null,
//                     thirdLayer: parsedLayer.length > 2 ? parsedLayer[2] : null
//                 };
//             }
//         } catch (error) {
//             console.error('Error parsing layer:', error);
//         }
//     }
//     return { firstLayer: layer, secondLayer: null, thirdLayer: null };
// };

// const sanitizeLayer = (layer) => {
//     return layer ? layer.replace(/ /g, '_') : null;
// };

// const constructFilePath = (firstLayer, secondLayer, thirdLayer) => {
//     if (firstLayer === 'all' && !secondLayer && !thirdLayer) {
//         return new URL('data/MapsIDKeysValue/publicMapV2/continent.json', import.meta.url);
//     } else if (secondLayer && !thirdLayer) {
//         const sanitizedSecondLayer = sanitizeLayer(secondLayer);
//         return new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/countries.json`, import.meta.url);
//     } else if (secondLayer && thirdLayer) {
//         const sanitizedSecondLayer = sanitizeLayer(secondLayer);
//         const sanitizedThirdLayer = sanitizeLayer(thirdLayer);
//         return new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/${sanitizedThirdLayer}/States.json`, import.meta.url);
//     }
//     throw new Error('Invalid query parameters');
// };

// export const getParcels = async (req, res) => {
//     const { firstLayer, secondLayer, thirdLayer } = parseLayerQuery(req.query.getParcel);

//     console.log('Received Query:', firstLayer);
//     console.log('Second element of Query:', secondLayer);
//     console.log('Third element of Query:', thirdLayer);

//     try {
//         const basePath = constructFilePath(firstLayer, secondLayer, thirdLayer);
//         const data = await fs.readFile(basePath, 'utf8');
//         const parcels = JSON.parse(data);

//         if (firstLayer === 'all' && !secondLayer && !thirdLayer) {
//             console.log('Sending all continents');
//             res.status(200).json({ message: 'Server', parcels: parcels });
//         } else if (secondLayer && !thirdLayer) {
//             console.log(`Sending parcels for layer: ${secondLayer}`);
//             res.status(200).json({ message: 'Server', parcels: parcels });
//         } else if (secondLayer && thirdLayer) {
//             console.log(`Sending parcels for layers: ${secondLayer} and ${thirdLayer}`);
//             res.status(200).json({ message: 'Server', parcels: parcels });
//         }
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getParcels = async (req, res) => {
    let layer = req.query.getParcel; // This could be used to specify if the request is for coordinates
    let secondLayer;
    let thirdLayer;
    let fourthLayer;
    let fifthLayer;
    let sixthLayer;

    // Log the type and content of the query parameter
    console.log('Type of req.query.getParcel:', typeof layer);
    console.log('Content of req.query.getParcel:', layer);
    
    // Check if layer is an array or a string that looks like an array
    if (Array.isArray(layer)) {
        console.log('First element of the query array:', layer[0]);
        secondLayer = layer.length > 1 ? layer[1] : null;
        thirdLayer = layer.length > 2 ? layer[2] : null;
        layer = layer[0];
    } else if (typeof layer === 'string' && layer.startsWith('[') && layer.endsWith(']')) {
        // Parse the string to get the first element
        try {
            const parsedLayer = JSON.parse(layer);
            if (Array.isArray(parsedLayer)) {
                console.log('Parsed array from string:', parsedLayer);
                secondLayer = parsedLayer.length > 1 ? parsedLayer[1] : null;
                thirdLayer = parsedLayer.length > 2 ? parsedLayer[2] : null;
                fourthLayer = parsedLayer.length > 3 ? parsedLayer[3] : null;
                fifthLayer = parsedLayer.length > 4 ? parsedLayer[4] : null;
                sixthLayer = parsedLayer.length > 5 ? parsedLayer[5] : null;
                layer = parsedLayer[0];
            }
        } catch (error) {
            console.error('Error parsing layer:', error);
        }
    }
    
    console.log('Received Query:', layer);
    console.log('Second element of Query:', secondLayer);
    console.log('Third element of Query:', thirdLayer);
    console.log('Fourth element of Query:', fourthLayer);
    console.log('Fifth element of Query:', fifthLayer);
    console.log('Sixth element of Query:', sixthLayer);

    try {
        let basePath;
        if (layer === 'all' && !secondLayer && !thirdLayer) {
            basePath = new URL('data/MapsIDKeysValue/publicMapV2/continent.json', import.meta.url);
        } else if (secondLayer && !thirdLayer) {
            const sanitizedSecondLayer = secondLayer.replace(/ /g, '_');
            basePath = new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/countries.json`, import.meta.url);
        } else if (secondLayer && thirdLayer && !fourthLayer) {
            const sanitizedSecondLayer = secondLayer.replace(/ /g, '_');
            const sanitizedThirdLayer = thirdLayer.replace(/ /g, '_');
            basePath = new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/${sanitizedThirdLayer}/States.json`, import.meta.url);
        } else if (secondLayer && thirdLayer && fourthLayer && !fifthLayer) {
            const sanitizedSecondLayer = secondLayer.replace(/ /g, '_');
            const sanitizedThirdLayer = thirdLayer.replace(/ /g, '_');
            const sanitizedFourthLayer = fourthLayer.replace(/ /g, '_');
            basePath = new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/${sanitizedThirdLayer}/${sanitizedFourthLayer}/Counties.json`, import.meta.url);

        }else if (secondLayer && thirdLayer && fourthLayer && fifthLayer && !sixthLayer) {
            const sanitizedSecondLayer = secondLayer.replace(/ /g, '_');
            const sanitizedThirdLayer = thirdLayer.replace(/ /g, '_');
            const sanitizedFourthLayer = fourthLayer.replace(/ /g, '_');
            const sanitizedFifthLayer = fifthLayer.replace(/ /g, '_');
            basePath = new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/${sanitizedThirdLayer}/${sanitizedFourthLayer}/${sanitizedFifthLayer}/citiesandTownsandfFeatures.json`, import.meta.url);

        }else if (secondLayer && thirdLayer && fourthLayer && fifthLayer && sixthLayer) {
            const sanitizedSecondLayer = secondLayer.replace(/ /g, '_');
            const sanitizedThirdLayer = thirdLayer.replace(/ /g, '_');
            const sanitizedFourthLayer = fourthLayer.replace(/ /g, '_');
            const sanitizedFifthLayer = fifthLayer.replace(/ /g, '_');
            const sanitizedSixthLayer = sixthLayer.replace(/ /g, '_');
            if (sanitizedSixthLayer === 'Features') {
                basePath = new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/${sanitizedThirdLayer}/${sanitizedFourthLayer}/${sanitizedFifthLayer}/${sanitizedSixthLayer}/Features.json`, import.meta.url);
            } else {
            basePath = new URL(`data/MapsIDKeysValue/publicMapV2/${sanitizedSecondLayer}/${sanitizedThirdLayer}/${sanitizedFourthLayer}/${sanitizedFifthLayer}/${sanitizedSixthLayer}/neighborHoodsAndFeatures.json`, import.meta.url);
            }
        } else {
            res.status(400).json({ message: 'Invalid query parameters' });
            return;
        }

        const data = await fs.readFile(basePath, 'utf8');
        const parcels = JSON.parse(data);

        if (layer === 'all' && !secondLayer && !thirdLayer) {
            console.log('Sending all continents');
            res.status(200).json({ message: 'Server', parcels: parcels });
        } else if (secondLayer && !thirdLayer) {
            console.log(`Sending parcels for layer: ${secondLayer}`);
            res.status(200).json({ message: 'Server', parcels: parcels });
        } else if (secondLayer && thirdLayer && !fourthLayer) {
            console.log(`Sending parcels for layers: ${secondLayer} and ${thirdLayer}`);
            res.status(200).json({ message: 'Server', parcels: parcels });
        }else if (secondLayer && thirdLayer && fourthLayer && !fifthLayer) {
            console.log(`Sending parcels for layers: ${secondLayer} and ${thirdLayer} and ${fourthLayer}`);
            res.status(200).json({ message: 'Server', parcels: parcels });

        }else if (secondLayer && thirdLayer && fourthLayer && fifthLayer && !sixthLayer) {
            console.log(`Sending parcels for layers: ${secondLayer} and ${thirdLayer} and ${fourthLayer} and ${fifthLayer}`);
            res.status(200).json({ message: 'Server', parcels: parcels });

        } else if (secondLayer && thirdLayer && fourthLayer && fifthLayer && sixthLayer) {
            console.log(`Sending parcels for layers: ${secondLayer} and ${thirdLayer} and ${fourthLayer} and ${fifthLayer} and ${sixthLayer}`);
            res.status(200).json({ message: 'Server', parcels: parcels });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};






// Define paths to the JSON files
const basePath = fileURLToPath(new URL('data/MapsIDKeysValue/publicMapV2', import.meta.url));

// Function to read JSON data from a file
async function readJson(filePath) {
    const data = await fs.readFile(filePath, 'utf-8'); // Read file asynchronously with UTF-8 encoding
    return JSON.parse(data); // Parse the string data into JSON
}

// Function to get the continent code based on user input
async function getContinentCode(continent) {
    const continentDataPath = `${basePath}/continent.json`; // Path to continent data
    const data = await readJson(continentDataPath);
    return data[continent]; // Return the code associated with the given continent
}

// Function to get the country code based on user input
async function getCountryCode(continent, country) {
    const countriesDataPath = `${basePath}/${continent.replace(/ /g, '_')}/countries.json`; // Construct path to the specific country file
    const data = await readJson(countriesDataPath);
    return data[country]; // Return the code associated with the given country
}

// Refactored main function to receive continent and country from function arguments
async function getCodes(continent, country) {
    try {
        const [continentCode, countryCode] = await Promise.all([
            getContinentCode(continent),
            getCountryCode(continent, country)
        ]);
        return `P1${continentCode}${countryCode}`;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; // Re-throw error to be handled by caller
    }
}



import {UPCheck} from './testGrounds.js';

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
            features,
            continent,
            country
        } = req.body;

        const dataPath = new URL('data/userHosted.json', import.meta.url).pathname;

        // Read the current user-hosted events data
        const data = await fs.readFile(dataPath, 'utf8');
        const userHosted = JSON.parse(data);

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
            features,
            continent,
            country
        });

        // // Generate a unique ID for the new event
        // const eventId = generateCurrentId();
        // // Increment the ID parts for the next event
        // incrementIdParts();
        const combinedCode = await getCodes(continent, country);
        console.log(`Received combined code for continent and country: ${combinedCode}`);
        const completeIDtag = await UPCheck(combinedCode)

        const newEvent = {
            id: completeIDtag,  // Assign the generated ID
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
            url:[],
            continent,
            country
        };

        userHosted.push(newEvent);

        // Save the updated events back to the file
        await fs.writeFile(dataPath, JSON.stringify(userHosted, null, 2), 'utf8');
        console.log('Event added successfully');

        res.status(201).json({ message: 'Event added successfully.', id: combinedCode });
    } catch (error) {
        console.error('Server error:', error);
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

