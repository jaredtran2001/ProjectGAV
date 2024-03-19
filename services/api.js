const {OpenAI} = require("openai");
import {REACT_APP_API_KEY} from "@env";
import Toast from "react-native-toast-message";

const apiKey = REACT_APP_API_KEY;
const instructions = `Instructions: 
Step 1: Work step by step
Step 2: Generate a list of unique items that classify as whatever category that is provided by the user 
Step 3: The list must have as many valid answers as possible without repeats  and have priority in relevancy as the category provided based on the newest data. 
Step 4: Do not respond if you do not understand the provided category or can't find items  for the category or the input data is invalid
Step 5: Ensure that variations of entries referring to the same thing are treated as duplicates and should not exist. 
    a. For example bunny and rabbit are synonymous so only one of them is included in the example output
Step 6: The response needs to be in a comma separated list such as: <item1>, <item2>, <item3>`;

const exampleResponse =
    "Dog, Cat, Fish, Bird, Rabbit, Hamster, Turtle, Guinea Pig, Horse, Chicken, Cow, Pig, Sheep, Duck, Goat, Mouse, Rat, Snake, Lizard, Frog, Spider, Butterfly, Bee, Ant, Elephant, Tiger, Lion, Bear, Giraffe, Monkey, Dolphin, Whale, Penguin, Koala, Kangaroo, Fox, Deer, Squirrel, Bat, Owl, Eagle, Duck, Parrot, Turkey, Goldfish, Shark, Crab, Lobster, Shrimp, Octopus, Jellyfish, Bee, Butterfly, Ladybug, Beetle, Mosquito, Dragonfly, Caterpillar";
const openai = new OpenAI({
    apiKey: apiKey, // This is the default and can be omitted
});

const showToast = (header, text) => {
    Toast.show({
        type: "error",
        text1: header,
        text2: text,
        position: "top",
        visibilityTime: 5000,
    });
};

async function sendPrompt(prompt) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {role: "system", content: "Answer in a consistent style."},
                {role: "user", content: instructions},
                {role: "user", content: "Animals"},
                {role: "user", content: exampleResponse},
                {role: "user", content: prompt},
            ],
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            response_format: {type: "text"},
            seed: 1,
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        // Check if the error is due to no internet connection
        if (error.code === "ENOTFOUND" || error.code === "ENETUNREACH") {
            showToast("No Internet Connection", "AI Generation requires Internet");
            throw new Error("No internet connection. Please check your network.");
        } else {
            showToast("Could not generate deck", "Try to be simple but concise i.e. soccer players");
            throw new Error("Error in sendPrompt: Unable to make API call");
        }
    }
}

function parseResponse(apiResponse) {
    try {
        let extractedSubstring = apiResponse.trim().replace(/\n/g, "");
        if (extractedSubstring.endsWith(",") || extractedSubstring.endsWith(".")) {
            extractedSubstring = extractedSubstring.slice(0, -1);
        }
        const extractedArray = extractedSubstring.split(",");
        const jsonFormatedExtractedArray = extractedArray.map((team) => `{"name": "${team}"}`);
        const resultString = jsonFormatedExtractedArray.join(", ");
        const jsonData = JSON.parse(`[${resultString}]`);
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        showToast("Could not generate deck", "Try to be simple but concise i.e. soccer players");
        throw new Error("Error in sendPrompt: Unable to make API call");
    }
}

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
        console.log(extractedSubstring);
        const jsonData = JSON.parse(`[${extractedSubstring}]`);
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        throw new Error("Error in generating Deck");
    }
}
