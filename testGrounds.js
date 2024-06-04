


// main.mjs
// import { fetchData1 } from './fetchData1.mjs';
// import { fetchData2 } from './fetchData2.mjs';


// fetchData1.mjs
// export async function fetchData1() {
   
//     return new Promise((resolve) => {
//         console.log("Fetching data from function 1");
//         // setTimeout(() => {
//             resolve("Data from function 1");
//         // }, 1000); // Simulate async operation
//     });
// }

// // fetchData2.mjs
// export async function fetchData2() {
//     console.log("Fetching data from function 2");
//     return new Promise((resolve) => {
        
//         // setTimeout(() => {
//             resolve("Data from function 2");
//         // }, 8000); // Simulate async operation
//     });
// }


// async function mainFunction() {
//     try {
//         const [result1, result2] = await Promise.all([fetchData1(), fetchData2()]);
//         console.log(`${result1} and ${result2}`);
//     } catch (error) {
//         console.error("Error in fetching data:", error);
//     }
// }

// mainFunction();

// // Import required modules
// import fs from 'fs/promises'; // File system module with promise support for asynchronous operations
// import { createInterface } from 'readline'; // Readline module for reading input from the console
// import { fileURLToPath } from 'url'; // Utility to convert URL to file path

// // Define paths to the JSON files using URL and converting to path for file operations
// const continentDataPath = fileURLToPath(new URL('data/MapsIDKeysValue/publicMapV1/continent.json', import.meta.url));
// const countriesDataPath = fileURLToPath(new URL('data/MapsIDKeysValue/publicMapV1/countries.json', import.meta.url));

// // Function to read JSON data from a file
// async function readJson(filePath) {
//     const data = await fs.readFile(filePath, 'utf-8'); // Read file asynchronously with UTF-8 encoding
//     return JSON.parse(data); // Parse the string data into JSON
// }

// // Function to get the continent code based on user input
// async function getContinentCode(continent) {
//     const data = await readJson(continentDataPath); // Load continent data from file
//     return data[continent]; // Return the code associated with the given continent
// }

// // Function to get the country code based on user input and selected continent
// async function getCountryCode(continent, country) {
//     const data = await readJson(countriesDataPath); // Load countries data from file
//     return data[continent][country]; // Return the code associated with the given country under the selected continent
// }

// // Main function that orchestrates the flow of the script
// async function main() {
//     const rl = createInterface({
//         input: process.stdin, // Standard input stream for the console input
//         output: process.stdout // Standard output stream for the console output
//     });

//     // Helper function to wrap readline question in a promise for async/await usage
//     const question = (query) => new Promise((resolve) => rl.question(query, resolve));

//     try {
//         const continent = await question("Enter a continent: "); // Ask user for continent
//         const country = await question("Enter a country: "); // Ask user for country
//         rl.close(); // Close readline interface

//         console.time('Fetching Codes'); // Start timer
//         // Execute both asynchronous functions in parallel and wait for both promises to resolve
//         const [continentCode, countryCode] = await Promise.all([
//             getContinentCode(continent),
//             getCountryCode(continent, country)
//         ]);

//         console.timeEnd('Fetching Codes'); // End timer and print execution time
//         // Combine the codes and print the result to the console
//         console.log(`Combined Code: ${continentCode}${countryCode}`);
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error("An error occurred:", error);
//         rl.close(); // Ensure readline interface is closed on error
//     }
// }

// // Run the main function
// main();





// Import required modules
import fs from 'fs/promises'; // File system module with promise support for asynchronous operations
import { createInterface } from 'readline'; // Readline module for reading input from the console
import { fileURLToPath } from 'url'; // Utility to convert URL to file path

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
};

// Function to get the country code based on user input
async function getCountryCode(continent, country) {
    const countriesDataPath = `${basePath}/${continent.replace(/ /g, '_')}/countries.json`; // Construct path to the specific country file
    const data = await readJson(countriesDataPath);
    return data[country]; // Return the code associated with the given country
};

// Function to get the country code based on user input
async function getStateCode(continent, country, state) {
    const statesDataPath = `${basePath}/${continent.replace(/ /g, '_')}/${country.replace(/ /g, '_')}/States.json`; // Construct path to the specific country file
    const data = await readJson(statesDataPath);
    return data[state]; // Return the code associated with the given country
};


import { readFile } from 'fs/promises';

async function UPChecker() {
    // Define the path to the JSON file
    const path = fileURLToPath(new URL('data/userHosted.json', import.meta.url));

    // Read and parse the JSON file
    const data = await readFile(path, 'utf8');
    const userHosted = JSON.parse(data);

    // Initialize a variable to track the highest UP number
    let maxUP = 0;

    // Iterate over each item in the userHosted array
    userHosted.forEach(item => {
        const currentUP = parseInt(item.id.split("UP")[1]);
        if (currentUP > maxUP) {
            maxUP = currentUP;
        }
    });

    // Increment the highest found UP number by one
    const newUP = maxUP + 1;

    // Append the new UP number to IDtag
    const UP = `UP${newUP}`;
    console.log(UP)

    return UP;
    
};




// Main function that orchestrates the flow of the script
async function main()  {
    const rl = createInterface({
        input: process.stdin, // Standard input stream for the console input
        output: process.stdout // Standard output stream for the console output
    });

    // Helper function to wrap readline question in a promise for async/await usage
    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    try {
        const continent = await question("Enter a continent: "); // Ask user for continent
        const country = await question("Enter a country: "); // Ask user for country
        const state = await question("Enter a country: "); // Ask user for country
        rl.close(); // Close readline interface

        console.time('Fetching Codes'); // Start timer

        // Execute both asynchronous functions concurrently using Promise.all
        const [continentCode, countryCode, stateCode, UP] = await Promise.all([
            getContinentCode(continent),
            getCountryCode(continent, country),
            getStateCode(continent, country, state),
            UPChecker()
        ]);

        console.timeEnd('Fetching Codes'); // End timer and print execution time

        // Combine the codes and print the result to the console
        // var codeID = `P1${continentCode}${countryCode}${stateCode}${UP}`;
        // console.log(`Combined Code: ${codeID}`);
        // Check if any codes are undefined
        if (!continentCode || !countryCode || !stateCode || !UP) {
            console.log("One or more entries were not found, please re-enter the places correctly.");
            main(); // Restart the process
        } else {
            // Combine the codes and print the result to the console
            var codeID = `P1${continentCode}${countryCode}${stateCode}${UP}`;
            console.log(`Combined Code: ${codeID}`);
        }

        
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("An error occurred:", error);
        rl.close(); // Ensure readline interface is closed on error
    }
};

// Run the main function
// main();






// var IDtag = "P1WC1C1S1SC1CT1N1";


// Call the function and log the result


export async function UPCheck(combinedCode) {
    // Define the path to the JSON file
    const path = fileURLToPath(new URL('data/userHosted.json', import.meta.url));

    // Read and parse the JSON file
    const data = await readFile(path, 'utf8');
    const userHosted = JSON.parse(data);

    // Initialize a variable to track the highest UP number
    let maxUP = 0;

    // Iterate over each item in the userHosted array
    userHosted.forEach(item => {
        const currentUP = parseInt(item.id.split("UP")[1]);
        if (currentUP > maxUP) {
            maxUP = currentUP;
        }
    });

    // Increment the highest found UP number by one
    const newUP = maxUP + 1;

    // Append the new UP number to IDtag
    const completeIDtag = `${combinedCode}UP${newUP}`;
    console.log(completeIDtag)

    return completeIDtag;
    
};




// // Import required modules
// import fs from 'fs/promises'; // File system module with promise support for asynchronous operations
// import { createInterface } from 'readline'; // Readline module for reading input from the console
// import { fileURLToPath } from 'url'; // Utility to convert URL to file path

// // Define paths to the JSON files
// const basePath = fileURLToPath(new URL('data/MapsIDKeysValue/publicMapV2', import.meta.url));

// // Function to read JSON data from a file
// async function readJson(filePath) {
//     const data = await fs.readFile(filePath, 'utf-8'); // Read file asynchronously with UTF-8 encoding
//     return JSON.parse(data); // Parse the string data into JSON
// }

// // Function to get the continent code based on user input
// async function getContinentCode(continent) {
//     const continentDataPath = `${basePath}/continent.json`; // Path to continent data
//     const data = await readJson(continentDataPath);
//     return data[continent]; // Return the code associated with the given continent
// }

// // Function to get the country code based on user input
// async function getCountryCode(continent, country) {
//     const countriesDataPath = `${basePath}/${continent.replace(/ /g, '_')}/countries.json`; // Construct path to the specific country file
//     const data = await readJson(countriesDataPath);
//     return data[country]; // Return the code associated with the given country
// }

// // Main function that orchestrates the flow of the script
// async function main() {
//     const rl = createInterface({
//         input: process.stdin, // Standard input stream for the console input
//         output: process.stdout // Standard output stream for the console output
//     });

//     // Helper function to wrap readline question in a promise for async/await usage
//     const question = (query) => new Promise((resolve) => rl.question(query, resolve));

//     try {
//         const continent = await question("Enter a continent: "); // Ask user for continent
//         const country = await question("Enter a country: "); // Ask user for country
//         rl.close(); // Close readline interface

//         console.time('Fetching Codes'); // Start timer

//         // Execute both asynchronous functions sequentially
//         const continentCode = await getContinentCode(continent);
//         const countryCode = await getCountryCode(continent, country);

//         console.timeEnd('Fetching Codes'); // End timer and print execution time

//         // Combine the codes and print the result to the console
//         console.log(`Combined Code: ${continentCode}${countryCode}`);
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error("An error occurred:", error);
//         rl.close(); // Ensure readline interface is closed on error
//     }
// }

// // Run the main function
// main();
