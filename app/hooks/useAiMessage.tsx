import puter from "@heyputer/puter.js";
import { useEffect, useState } from "react";

export async function useAiMessage(message: string) {
    
    const [result, setResult] = useState<string>('');
    
    useEffect(() => {
        puter.ai.chat(message, {
            model: 'gemini-2.5-flash',
        })
        .then((result: any) => {
            setResult(result);
        });
    }, []);

    return result;
}