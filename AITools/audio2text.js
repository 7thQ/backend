





import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "sk-RYbKKcuUvjtDOasHOvAS" // Make sure to use your actual API key
});


async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}
main();
