"use client";

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

export async function runChat({ history, message, api, temperature }) {
  const genAI = new GoogleGenerativeAI(api);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const safetySettings = [];

  const chat = model.startChat({
    history,
    generationConfig: {
      temperature,
    },
    // safetySettings,
  });

  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    return { role: "model", parts: text };
  } catch (error) {
    console.error(error);
    return {
      role: "error",
      parts:
        "An error occured. Please refresh the page and start again.\n" +
        "(Check the console for an error message.)",
    };
  }
}
