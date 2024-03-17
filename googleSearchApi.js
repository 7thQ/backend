


  


import { parse } from 'querystring';
import axios from 'axios';
import fs from 'fs';
// import readline from 'readline';
import { run } from './conevertD.js';




import { URL } from 'url';


export async function handleSearch(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {
        try {
            const parsed = parse(body);
            const userInputQuery = parsed.query;
            const userInputNum = parsed.num;
            await fetchAndSaveResults(userInputQuery, userInputNum);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Search complete and data saved.');
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred on the server.');
        }
    });
}



// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Function to get user input
// function getUserInput(query) {
//   return new Promise(resolve => {
//     rl.question(query, (input) => {
//       resolve(input);
//     });
//   });
// }

// Modified function to accept query and number of results as parameters

// Now declared as an async function to use await and return a Promise
const fetchAndSaveResults = async (query, num) => {
  console.log('Fetching results from Google Search API...');

  const url = "https://www.searchapi.io/api/v1/search";
  const params = {
    "engine": "google",
    "q": query,
    "num": num,
    "api_key": "roCKRYa2qiL4sSixVaJPFJga"
  };

  try {
    const response = await axios.get(url, { params });
    const organicResults = response.data.organic_results.map(result => {
      const { displayed_link, sitelinks, ...rest } = result;
      return rest;
    });
    // const resultsForHetericaryTree = response.data.organic_results.map(result => {
    //     const { displayed_link, sitelinks, ...rest } = result;
    //     return rest;
    //   });
    // const metaData = response.data.organic_results.map(result => {
    //     const { displayed_link, sitelinks, ...rest } = result;
    //     return rest;
    //   });
    //   const resultsForNetwork = response.data.organic_results.map(result => {
    //     const { displayed_link, sitelinks, ...rest } = result;
    //     return rest;
    //   });

    const filePath = new URL('./data/hData.json', import.meta.url).pathname;

    const data = await fs.promises.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    json.children = organicResults;
    await fs.promises.writeFile(filePath, JSON.stringify(json, null, 2));
    run()
   

    console.log('Results saved to hData.json');
    console.log('and converted the data to refindD.json');
  } catch (error) {
    console.error('Error:', error);
  }
};






// so far the only differncs on each is adding this to the paths name if your using windows ".replace(/^\/[A-Z]:/, '')" 


// so if your hhaving trouble reading writing to somewhere makesure you check if your using the write sysntax for your os 
// ex: 
// windows:  const filePath = new URL('./data/hData.json', import.meta.url).pathname.replace(/^\/[A-Z]:/, '');
// mac:  const filePath = new URL('./data/hData.json', import.meta.url).pathname;  <-- this is the default for mac



  // ---------------windows^^^^^^^^^^

  