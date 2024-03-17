






import fs from 'fs';
import { URL } from 'url';








// function to check if group one exists
export async function performGroupOneCheck() {
    const filePath = new URL('../frontend/data/refinedD.json', import.meta.url).pathname;

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        if (!data) {
            console.log('File is empty. Treating as no group 1.');
            return false;
        }
        const jsonData = JSON.parse(data) ;
    
        if (!jsonData.nodes || !Array.isArray(jsonData.nodes)) {
            throw new Error('JSON does not contain a "nodes" array');
        }
    
        const hasGroupOne = jsonData.nodes.some(node => node.group === 1);
        console.log(hasGroupOne ? 'The file contains a node with group value of 1' : 'No node with group value of 1 found in the file');
        return hasGroupOne;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// //function to check the hieghtst group number

export async function checkHGN() {
    const filePath = new URL('../frontend/data/refinedD.json', import.meta.url).pathname;

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
    
        if (!jsonData.nodes || !Array.isArray(jsonData.nodes)) {
            throw new Error('JSON does not contain a "nodes" array');
        }
    
        // Find the highest group number
        const highestGroupNumber = jsonData.nodes.reduce((max, node) => {
            return node.group > max ? node.group : max;
        }, 0);

        console.log('The highest group value in the file is:', highestGroupNumber);
        return highestGroupNumber;

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

//function to check add new groups using the new querys
export async function conditionalExecutionBasedOnGroupOne( res) {
    try {
        const filePath = new URL('../frontend/data/refinedD.json', import.meta.url).pathname;
        const alternateFilePath = new URL('../frontend/smallQuerynetwork/data/refinedD.json', import.meta.url).pathname.replace(/^\/[A-Z]:/, '');

        const hasGroupOne = await performGroupOneCheck();

        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('Data processing complete.');

        if (!hasGroupOne) {
            console.log("Group one does not exist. Using alternate file data...");

            //  Read data from the alternate file
            const alternateData = await fs.promises.readFile(alternateFilePath, 'utf8');
            
            // Write the alternate data to the original file
            await fs.promises.writeFile(filePath, alternateData, 'utf8');
            console.log("Data from the alternate file has been written to the original file.");
        } else {
            const alternateDataRaw = await fs.promises.readFile(alternateFilePath, 'utf8');
            const alternateData = JSON.parse(alternateDataRaw);

            const highestGroupNumber = await checkHGN();
            const mainDataRaw = await fs.promises.readFile(filePath, 'utf8');
            const mainData = JSON.parse(mainDataRaw);
            let maxId = mainData.nodes.reduce((max, node) => Math.max(max, parseInt(node.id)), 0);

            // Create a map for old ID to new ID
            const idMap = new Map();

            // Update group number and ID in the alternate data
            alternateData.nodes.forEach(node => {
                const oldId = node.id;
                node.group = highestGroupNumber + 1;
                maxId++;
                node.id = maxId.toString();
                idMap.set(oldId, node.id);
            });

            // Update source and target in the alternate links
            alternateData.links.forEach(link => {
                link.source = idMap.get(link.source) || link.source;
                link.target = idMap.get(link.target) || link.target;
            });

            // Append the updated alternate nodes and links to the main data
            mainData.nodes = mainData.nodes.concat(alternateData.nodes);
            mainData.links = mainData.links.concat(alternateData.links);

             // Find the lowest ID node for each group
             const lowestIdByGroup = new Map();
             mainData.nodes.forEach(node => {
                 const currentLowest = lowestIdByGroup.get(node.group);
                 if (!currentLowest || parseInt(node.id) < parseInt(currentLowest)) {
                     lowestIdByGroup.set(node.group, node.id);
                 }
             });
 
             // Create new links for lowest ID nodes across groups
             lowestIdByGroup.forEach((sourceId, sourceGroup) => {
                 lowestIdByGroup.forEach((targetId, targetGroup) => {
                     if (sourceGroup !== targetGroup) {
                         mainData.links.push({ source: sourceId, target: targetId, value: 100 });
                     }
                 });
             });
 
             // Write the updated data back to the main file
             await fs.promises.writeFile(filePath, JSON.stringify(mainData, null, 2), 'utf8');
             console.log('Updated data with inter-group links has been written to the main file.');

            // // Write the updated data back to the main file
            // await fs.promises.writeFile(filePath, JSON.stringify(mainData, null, 2), 'utf8');
            // console.log('Updated data has been appended to the main file.');
        }
    } catch (error) {
        console.error("Error in conditional execution:", error);
          // In case of an error, send an error response
        //   res.writeHead(500, { 'Content-Type': 'text/plain' });
        //   res.end('An error occurred on the server.')
    }
}




// conditionalExecutionBasedOnGroupOne();











