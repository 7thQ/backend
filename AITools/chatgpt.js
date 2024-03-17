
import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI({
    apiKey: "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" // Make sure to use your actual API key
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Wrap rl.question into a promise for better async control
const askQuestion = (query) => new Promise(resolve => {
    rl.question(query, (answer) => {
        resolve(answer);
    });
});

async function main() {
    try {
        // Preemptive request to trigger deprecation warnings before user interaction
        await openai.chat.completions.create({
            messages: [{ role: "system", content: "Initializing..." }],
            model: "gpt-4-0125-preview",
        });

        console.log("Initialization complete.\n");

        let firstPrompt = true;

        while (true) {
            const userPrompt = firstPrompt ? "Hello master David, how can I help you today brother? " : "Next input here: ";
            firstPrompt = false;

            const userInput = await askQuestion(userPrompt);

            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: userInput }],
                model: "gpt-4-0125-preview",
            });

            console.log("\nSole:", completion.choices[0].message.content);
            console.log("----------------------------------------"); // Add a boundary line
        }
    } catch (error) {
        console.error("An error occurred:", error);
        rl.close();
    }
}

main();






// // the bare minimum to get a response from the chatbot

// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: "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"
// });

// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "ship on wheels" }],
//         model: "dall-e-2",
//     });
    

//     console.log(completion.choices[0]);
// }

// main();
// // --------- end of the bear minimum to get a response from the chatbot

