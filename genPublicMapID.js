


import readline from 'readline';

// Readline interface for simulating button click in the console
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

// Function to generate the current unique id based on the specified structure
const generateCurrentId = () => {
  return `P1WC${idParts.WC}C${idParts.C}S${idParts.S}SC${idParts.SC}CT${idParts.CT}N${idParts.N}UP${idParts.UP}`;
};

// Function to increment the ID parts
const incrementIdParts = () => {
  // Increment the "UP" part
  idParts.UP += 1;

  // Check and carry over if needed, like an odometer
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
   // Now WC can increment, useful for representing up to 7 continents or more
   if (idParts.WC > 7) { // Assuming a wrap-around or reset is not necessary beyond 7 continents
    idParts.WC = 1;
  }
};

// Function to print the button and wait for a click (Enter key press)
const printButtonAndWaitForClick = () => {
  console.log('Press "Enter" to generate a new id.');
  rl.question('', (answer) => {
    const newId = generateCurrentId();
    console.log(`Generated ID: ${newId}`);
    incrementIdParts();  // Increment the ID after showing the current one
    printButtonAndWaitForClick();  // Print the button again for the next id
  });
};

// Start the process
printButtonAndWaitForClick();

