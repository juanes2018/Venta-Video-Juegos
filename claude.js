import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: "TU_API_KEY_AQUI",
});

async function main() {
  const response = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 200,
    messages: [
      { role: "user", content: "Hola Claude" }
    ],
  });

  console.log(response.content);
}

main();
