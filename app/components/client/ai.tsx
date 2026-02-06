// MyComponent.jsx
"use client";

import { useEffect, useState } from "react";
import puter, { ChatMessage } from "@heyputer/puter.js";


export function AI() {
    
    const [ai, setAi] = useState<ChatMessage | undefined>(undefined);

    const prompt = "Explicame la teoria de cuerdas sobre la fisica cuantica";

    useEffect(() => {
        puter.ai.chat(prompt).then((result) => setAi(result.message));
    }, []);

    return (
        <div className="flex items-center font-bold">
            {JSON.stringify(ai?.content)}
        </div>
    )
    
}
