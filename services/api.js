const {BedrockRuntimeClient, InvokeModelCommand} = require("@aws-sdk/client-bedrock-runtime");
const AWS = require("aws-sdk");
const Buffer = require("buffer/").Buffer;
require("react-native-get-random-values");

const client = new BedrockRuntimeClient({
    region: "us-west-2",
    credentials: {
        accessKeyId: "AKIAYS2NWMOVVGHI3IUI",
        secretAccessKey: "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",
    },
});

// const sendPrompt = async (prompt) => {
async function sendPrompt(prompt) {
    const input = {
        body: JSON.stringify({
            prompt,
            maxTokens: 600,
            temperature: 0.5,
            topP: 0.9,
        }),
        contentType: "application/json",
        modelId: "ai21.j2-mid-v1",
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    const bufferData = Buffer.from(response.body, "utf-8"); // Use the correct encoding
    const jsonString = bufferData.toString("utf-8"); // Convert Buffer to string
    const parsedData = JSON.parse(jsonString);
    const completions = parsedData.completions;
    console.log("Got here");
    return completions;
}

const multiVarPrompt = (category) => `
Instructions: 
1. Work Step by Step
2. Generate a list of unique items that relate to the category provided. 
3. The list must have atleast 10 items and have some priority in relevancy to the category provided. 
4. Make sure that you understand what the input is and these items in the response are valid answers. If you can not gather items that are relevant to the prompt or do not understand the input, then respond with: 'Not able to generate deck'
5. Ensure that variations of entries referring to the same thing are treated as duplicates. 
    a. You can ensure that this does not happen by reviewing the output you have and thinking step by step if the item is synonymous with the other item
        For example bunny and rabbit are synonymous so only one of them is included in the example output
6. Follow the format of the example response output. Note the format of the response is in json and follows this exact format.
Example response: 
        \n\n Human: Animals
        \n\n Assistant: 
        [
            {"name": "Tiger"},
            {"name": "Raccoon"},
            {"name": "Swordfish"},
            {"name": "Lion"},
            {"name": "Hippo"},
            {"name": "Giraffe"},
            {"name": "Spider"},
            {"name": "Alligator"},
            {"name": "Turtle"},
            {"name": "Rabbit"},
            {"name": "Crow"},
            {"name": "Snake"},
            {"name": "Polar Bear"},
            {"name": "Chimpanzee"},
            {"name": "Horse"},
            {"name": "Unicorn"},
            {"name": "Whale"},
            {"name": "Deer"},
            {"name": "Owl"},
            {"name": "Butterfly"},
            {"name": "Squirrel"},
            {"name": "Squid"}
        ]
Input data: ${category}`;

// const generateDeck = async (category) => {
export async function generateDeck(category) {
    console.log("Testing");
    console.log(category);
    const prompt = multiVarPrompt(category);
    try {
        const apiResponse = await sendPrompt(prompt);
        const jsonString = apiResponse[0].data.text.trim().replace(/\n/g, "");

        const startIndex = jsonString.indexOf("[");
        const lastIndex = jsonString.lastIndexOf(",");
        const extractedSubstring = jsonString.substring(startIndex + 1, lastIndex);

        const jsonData = JSON.parse(`[${extractedSubstring}]`);
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error("Error in generateDeck:", error);
        throw error;
    }
}
