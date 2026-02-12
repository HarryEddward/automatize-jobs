import puter, { ChatMessage } from "@heyputer/puter.js";
import { useEffect, useState } from "react";

export async function useAiChat(chat: ChatMessage[]) {
    
    const [result, setResult] = useState<string>('');
    
    useEffect(() => {
        puter.ai.chat(chat, {
            model: 'o3-mini',
        })
        .then((result: any) => {
            setResult(result);
        });
    }, []);

    return result;
}