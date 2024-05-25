

// fetchData1.mjs
export async function fetchData1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data from function 1");
        }, 1000); // Simulate async operation
    });
}

// fetchData2.mjs
export async function fetchData2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data from function 2");
        }, 7000); // Simulate async operation
    });
}

// main.mjs
// import { fetchData1 } from './fetchData1.mjs';
// import { fetchData2 } from './fetchData2.mjs';

async function mainFunction() {
    try {
        const [result1, result2] = await Promise.all([fetchData1(), fetchData2()]);
        console.log(`${result1} and ${result2}`);
    } catch (error) {
        console.error("Error in fetching data:", error);
    }
}

mainFunction();
