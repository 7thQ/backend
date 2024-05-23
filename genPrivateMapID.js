
import readline from 'readline';

// Readline interface for interactive console input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

// Function to generate a public map ID
const generatePublicId = () => {
  return `P1WC${idParts.WC}C${idParts.C}S${idParts.S}SC${idParts.SC}CT${idParts.CT}N${idParts.N}UP${idParts.UP}`;
};

// Function to generate a private map ID
const generatePrivateId = (mapName, userName, mapNumber) => {
  return `PM${mapName}${userName}${mapNumber}P1WC${idParts.WC}C${idParts.C}S${idParts.S}SC${idParts.SC}CT${idParts.CT}N${idParts.N}UP${idParts.UP}`;
};

// Function to increment the ID parts
const incrementIdParts = () => {
  idParts.UP += 1;
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
};

// Start the interactive process
const startProcess = () => {
  rl.question('Add to public map or make private map? (public/private): ', (type) => {
    if (type.toLowerCase() === 'public') {
      // Public map case
      const newId = generatePublicId();
      console.log(`Generated Public ID: ${newId}`);
      incrementIdParts();
      startProcess();  // Restart the process
    } else if (type.toLowerCase() === 'private') {
      // Private map case
      rl.question('Create new or add to existing? (new/existing): ', (choice) => {
        if (choice.toLowerCase() === 'new') {
          // New private map case
          rl.question("What's the name of the map? ", (mapName) => {
            rl.question("What's your username? ", (userName) => {
              // Assuming the user is creating their first private map, mapNumber is 1
              const mapNumber = 1;
              const newId = generatePrivateId(mapName, userName, mapNumber);
              console.log(`Generated Private ID: ${newId}`);
              
              // Option to continue adding
              addMoreToPrivateMap(mapName, userName, mapNumber);
            });
          });
        } else {
          // Existing private map case (simplified assumption: user provides map details again)
          rl.question("What's the name of the map? ", (mapName) => {
            rl.question("What's your username? ", (userName) => {
              rl.question("What's the map number? ", (mapNumber) => {
                const newId = generatePrivateId(mapName, userName, mapNumber);
                console.log(`Generated Private ID: ${newId}`);
                
                addMoreToPrivateMap(mapName, userName, mapNumber);
              });
            });
          });
        }
      });
    } else {
      console.log("Please enter 'public' or 'private'.");
      startProcess();
    }
  });
};

// Function to handle adding more entries to the same private map
const addMoreToPrivateMap = (mapName, userName, mapNumber) => {
  rl.question('Continue adding to this private map? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      incrementIdParts();
      const newId = generatePrivateId(mapName, userName, mapNumber);
      console.log(`Generated Private ID: ${newId}`);
      addMoreToPrivateMap(mapName, userName, mapNumber);
    } else {
      startProcess();  // Restart the process from the top
    }
  });
};

// Start the initial process
startProcess();
