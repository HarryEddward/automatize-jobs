"use client";
import puter from "@heyputer/puter.js";

export async function generateWithAI(message: string, rolePrompt: string) {
  const result = await puter.ai.chat([
    {
      role: "system",
      content: rolePrompt
    },
    {
      role: "user",
      content: message
    }
  ], {
    model: 'o3-mini',
    reasoning: "high",
    reasoning_effort: "medium"
    
  });

  return result;
}