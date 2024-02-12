import {BedrockRuntimeClient, InvokeModelCommand} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
    region: "us-west-2",
});

const sendPrompt = async (prompt) => {
    const input = {
        body: JSON.stringify({
            prompt,
            maxTokens: 300,
            temperature: 0.5,
            topP: 0.9,
        }),
        contentType: "application/json",
        modelId: "ai21.j2-mid-v1",
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);

    return JSON.parse(Buffer.from(response.body).toString()).completions;
};

Promise.resolve(sendPrompt("Please generate a funny Haiku about software engineering.")).then(console.log);
