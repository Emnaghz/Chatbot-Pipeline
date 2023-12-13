import { useState } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "hello i am chatgpt",
      sender: "chatgpt",
      direction: "ingoing",
    },
  ]);

  const [typing, setTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    // update our messages state
    setMessages(newMessages);

    //set a typing indicator
    setTyping(true);

    //process message to chatGPT
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    //formatting data for an api request
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "chatgpt") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "explain all concepts like i am a fresh beginner, and don't response with long and detailed patagraph unless i ask you for",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo-1106",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "chatgpt",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "650px", width: "550px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}

export default App;
