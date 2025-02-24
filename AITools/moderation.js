




import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: "sk-RYbKKcuUvjOvAS" // Make sure to use your actual API key
});


async function main() {
  const moderation = await openai.moderations.create({ input: "I want to kill them." });

  console.log(moderation);
}
main();
