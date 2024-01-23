"use client";

import styles from "./Chat.module.css";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { runChat } from "@/lib/gemini/runChat";
import { useHistory } from "./useHistory";
import Markdown from "marked-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function Chat({ api, temperature, isApiSet }) {
  const { history, addToHistory } = useHistory(scrollChatToBottom);
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const chatRef = React.useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    const userMsg = { role: "user", parts: message };
    addToHistory(userMsg);
    setMessage("");
    const result = await runChat({ history, message, api, temperature });
    addToHistory(result);
    setIsSending(false);
  }

  function scrollChatToBottom() {
    if (chatRef) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }

  return (
    <>
      <Flex direction="column" gap="4" className={styles.wrapper}>
        <a
          className="self-end cursor-pointer flex flex-row items-center justify-center gap-2 bg-slate-600 rounded-sm p-1 px-3 hover:bg-slate-700 no-underline"
          color="gray"
          href="https://github.com/keit-maybe/Gemini-Chat"
          target="_blank"
        >
          <GitHubLogoIcon />
          View on Github
        </a>
        <Flex
          direction="column"
          gap="4"
          className={styles.messageWrapper}
          ref={chatRef}
        >
          {history.length > 0 ? (
            history.map((item) => (
              <Flex
                direction="column"
                className={`${
                  item.role === "user" ? styles.user : styles.model
                }`}
                key={Math.random()}
              >
                <Text size="3" weight="bold">
                  {item.role === "user" ? "You" : "Bot"}
                </Text>
                <Text size="4" className="flex flex-col gap-4">
                  <Markdown breaks gfm>
                    {item.parts}
                  </Markdown>
                </Text>
              </Flex>
            ))
          ) : (
            <Text size="2" align="center">
              {isApiSet === false
                ? "Please enter your API key."
                : "Say something to begin the conversation…"}
            </Text>
          )}
        </Flex>
        <form className={styles.inputWrapper} onSubmit={handleSubmit}>
          <Flex direction="row" gap="2" align="stretch">
            <input
              className={styles.input}
              placeholder="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
            <Button
              className={styles.button}
              type="submit"
              disabled={isSending || isApiSet === false}
            >
              Send
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
}

export default Chat;
