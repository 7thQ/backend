


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



// Import required modules
import fs from 'fs/promises';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

// Define paths to the JSON files
const continentDataPath = fileURLToPath(new URL('data/MapsIDKeysValue/publicMapV1/continent.json', import.meta.url));
const countriesDataPath = fileURLToPath(new URL('data/MapsIDKeysValue/publicMapV1/countries.json', import.meta.url));

// Function to read JSON data from a file
async function readJson(filePath) {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

// Function to get the continent code
async function getContinentCode(continent) {
    const data = await readJson(continentDataPath);
    return data[continent];
}

// Function to get the country code
async function getCountryCode(continent, country) {
    const data = await readJson(countriesDataPath);
    return data[continent][country];
}

// Main function that orchestrates the flow
async function main() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (query) => new Promise((resolve) => rl.question(query, resolve));

    try {
        const continent = await question("Enter a continent: ");
        const country = await question("Enter a country: ");
        rl.close();

        // Run both asynchronous functions
        const [continentCode, countryCode] = await Promise.all([
            getContinentCode(continent),
            getCountryCode(continent, country)
        ]);

        // Combine the codes and print them
        console.log(`Combined Code: ${continentCode}${countryCode}`);
    } catch (error) {
        console.error("An error occurred:", error);
        rl.close();
    }
}

// Run the main function
main();
