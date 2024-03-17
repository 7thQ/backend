






import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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" // Make sure to use your actual API key
});


async function main() {
  const file = await openai.files.create({
    file: fs.createReadStream("mydata.jsonl"),
    purpose: "fine-tune",
  });

  console.log(file);
}

main();