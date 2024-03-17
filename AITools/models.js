





import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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" // Make sure to use your actual API key
});

async function main() {
  const list = await openai.models.list();

  for await (const model of list) {
    console.log(model);
  }
}
main();