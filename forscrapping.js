

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';




// Placeholder file paths
const inputFilePath = new URL('./data/hData.json', import.meta.url).pathname;
const outputFilePath = new URL('./data/scrap.json', import.meta.url).pathname;
const errorFilePath = new URL('./data/errorL.json', import.meta.url).pathname;

async function scrapeLinks(url) {
    const childLinks = [];
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        $('a').each((i, link) => {
            const href = $(link).attr('href');
            // Add validation to ensure href is a valid URL
            childLinks.push(href);
        });
    } catch (error) {
        fs.writeFileSync(errorFilePath, JSON.stringify(error,  null, 2));
        // console.error(`Error scraping ${url}:`, error);
    }
    return childLinks;
}

async function refineData() {
    let data = fs.readFileSync(inputFilePath, 'utf8');
    let jsonData = JSON.parse(data);

    for (const item of jsonData.children) {
        item.children = await scrapeLinks(item.link);
        // Add logic to assign positions like 1.1, 1.2, etc.
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`Data scrapped and saved to database`);
}


refineData();





