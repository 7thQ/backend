





import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "sk-RYbKKc" // Make sure to use your actual API key
});


async function main() {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });

    console.log(image.data);
}
main();



