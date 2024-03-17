




import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: "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" // Make sure to use your actual API key
});


async function main() {
  const moderation = await openai.moderations.create({ input: "I want to kill them." });

  console.log(moderation);
}
main();
