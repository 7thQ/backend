






import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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" // Make sure to use your actual API key
});



async function main() {
  const fineTune = await openai.fineTuning.jobs.create({
    training_file: "file-abc123"
  });

  console.log(fineTune);
}

main();
