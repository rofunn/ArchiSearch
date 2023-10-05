import { FormEvent, useState } from "react";
import "./App.css";
import OpenAI from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_CHAT_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  let chatCompletion = async () => {
    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please provide 5 contemporary architecture of this city ${prompt}, but just provide the names of the architectures without any details, and return them in an array format.`,
          },
        ],
      })
      .then((res) => {
        const data = res.choices[0].message.content;
        if (data) {
          setResult(data);
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    chatCompletion();
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          value={prompt}
        />
        <button type="submit">Search</button>
      </form>
      <p>{result}</p>
    </>
  );
}

export default App;
