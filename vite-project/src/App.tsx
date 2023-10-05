import "./App.css";
import OpenAI from "openai";

function App() {
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
            content: "Give me a list of contemporary architecture",
          },
        ],
      })
      .then((res) => console.log(res.choices[0].message.content));
  };
  chatCompletion();

  return (
    <>
      <p>try</p>
    </>
  );
}

export default App;
