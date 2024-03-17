import fs from 'fs';

// const inputFilePath = new URL('./data/hData.json', import.meta.url).pathname;
const inputFilePath = new URL('./data/hData.json', import.meta.url).pathname;

const refinedFilePath = new URL('../frontend/smallQuerynetwork/data/refinedD.json', import.meta.url).pathname;
const refinedFilePath2 = new URL('./data/refinedD.json', import.meta.url).pathname;

function convertData(childrenData) {
    const nodes = [];
    const links = [];
    const group = 1; // Same group for all nodes

    // Create nodes
    childrenData.forEach((item) => {
        nodes.push({ id: item.position.toString(), group: group });
    });

    // Create links
    childrenData.forEach((item) => {
        childrenData.forEach((otherItem) => {
            if (item.position !== otherItem.position) {
                links.push({ 
                    source: item.position.toString(), 
                    target: otherItem.position.toString(), 
                    value: 50
                });
            }
        });
    });

    return { nodes, links };
}


// // ----------------------------------------_





// ----------------------------------------_





function processFile(inputFilePath, outputFilePath) {
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading JSON file: ${err}`);
            return;
        }

        try {
            const jsonData = JSON.parse(data);

            // Check if jsonData has the 'children' property and it's an array
            if (!jsonData.children || !Array.isArray(jsonData.children)) {
                throw new Error('JSON does not contain a "children" array');
            }

            const convertedData = convertData(jsonData.children);

            fs.writeFileSync(outputFilePath, JSON.stringify(convertedData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to file:', writeErr);
                } else {
                    console.log('Results saved to refinedD.json');
                }
            });

            console.log(`Data converted and saved to: ${outputFilePath}`);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}



export function run() {
    processFile(inputFilePath, refinedFilePath);
    processFile(inputFilePath, refinedFilePath2);
}















// fs.readFile(inputFilePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error(`Error reading JSON file: ${err}`);
//         return;
//     }

//     try {
//         const jsonData = JSON.parse(data);

//         // Check if jsonData has the 'children' property and it's an array
//         if (!jsonData.children || !Array.isArray(jsonData.children)) {
//             throw new Error('JSON does not contain a "children" array');
//         }

//         const convertedData = convertData(jsonData.children);

//         fs.writeFileSync(refinedFilePath2, JSON.stringify(convertedData, null, 2), (writeErr) => {
//             if (writeErr) {
//                 console.error('Error writing to file:', writeErr);
//             } else {
//                 console.log('Results saved to refinedD.json');
//             }
//         });

//         console.log(`Data converted and saved to: ${refinedFilePath2}`);
//     } catch (error) {
//         console.error('Error parsing JSON:', error);
//     }
// });


// ----------------------------------------old unptomized 01-04-2024^^^^^^
