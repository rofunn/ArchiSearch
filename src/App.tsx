import { FormEvent, useState } from "react";
import "./App.css";
import OpenAI from "openai";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [image, setImage] = useState("");
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_CHAT_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const IMAGE_URL = "https://api.unsplash.com/search/photos";

  const chatCompletion = async () => {
    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please provide the name of one famous contemporary architecture of this city ${prompt}, but just provide the name of the architecture without any details, only the name of the architecture.`,
          },
        ],
      })
      .then((res) => {
        const data = res.choices[0].message.content;
        if (data) {
          setResult(data);
          getImages(data);
        }
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  const getImages = async (archName: string) => {
    try {
      const images = await axios.get(
        `${IMAGE_URL}?query=${archName}&page=1&per_page=5&client_id=${
          import.meta.env.VITE_UNSPLASH_API_KEY
        }`
      );
      setImage(images.data.results[0].urls.small);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    chatCompletion();
  };
  return (
    <>
      {/* <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          value={prompt}
        />
        <button type="submit">Search</button>
      </form>
      <p>{result}</p>
      <img src={image} /> */}
      <p>Test Test 123 123</p>
    </>
  );
}

export default App;
