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
    return completions;
}

const multiVarPrompt = (category) => `
Instructions: Return a list of unique items that relate to the category provided. The list must have atleast 10 item and have some priority in relevancy to the category provided. 
Ensure that variations of entries referring to the same thing are treated as duplicates. Follow the format of the example response. Note the format is in json.
Context: Example response: 'animals' => 
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
