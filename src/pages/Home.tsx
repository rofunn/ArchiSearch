import { FormEvent, useState } from "react";
import OpenAI from "openai";
import axios from "axios";
import "../App.css";

function Home() {
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
    <main className="background h-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center justify-center h-full gap-4"
      >
        <input
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          value={prompt}
          className="w-1/3 h-[10%] rounded-full bg-o/50 placeholder:text-5xl placeholder:text-w pt-5 px-5"
          placeholder="I want to go to......"
          type="text"
        />
        <button
          type="submit"
          className="text-5xl bg-o h-[10%] p-2 rounded-xl text-w"
        >
          Search
        </button>
      </form>
      <p>{result}</p>
      <img src={image} />
    </main>
  );
}

export default Home;
