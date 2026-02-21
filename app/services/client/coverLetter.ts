'use client';
import { generateWithAI } from "./ai";
import Mustache from 'mustache';



interface IPrompt {
    translate_lang: string | null,
    formal_training: string | null,
    informal_training: string | null,
    work_experience: string | null,
    business_experience: string | null,
    projects: string | null,
    achievements: string | null,
    languages: string | null,
    international_experiences: string | null,
    viability: string | null,
    intentions: string | null,

    job_offer: string | null
}


interface IPromptUpgrader {
    coverLetter: string
}

export async function createCoverLetter(data: IPrompt) {
    const res = await fetch('/templates/prompts/coverLetter.mustache');
    const template = await res.text();

    const rolePrompt = "Eres un experto en redacción profesional de cartas de presentación. Debes ser persuasivo, claro y conciso. No inventes datos y enfócate solo en información del CV y la oferta laboral.";

    const textPrompt = Mustache.render(template, data);
    console.log(textPrompt);

    
    const resultRaw = await generateWithAI(textPrompt, rolePrompt);
    console.log(resultRaw.message?.content);
    const resultFromat = String(resultRaw.message?.content).replace(/\[([^\]]+)\]/g, '{{$1}}');
    console.log(resultFromat);

    const dataSensitive = {
        candidate_name: "Adrian M.M.",
        candidate_date: new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date()),
        candidate_city: "Pollença",
        candidate_phone: "+34 643 56 70 16",
        candidate_email: "au7812ooae32@gmail.com",
        candidate_rrss: "https://github.com/HarryEddward"
    };

    console.log(dataSensitive);


    const result = Mustache.render(resultFromat, dataSensitive);

    console.log(result);

    return result;
}


export async function createCoverLetterUpgrader(data: IPromptUpgrader) {
  const res = await fetch('/templates/prompts/coverLetterUpgrader.mustache');
  const template = await res.text();

  const rolePrompt = "Eres un experto en redacción profesional de cartas de presentación. Debes ser persuasivo, claro y conciso. No inventes datos y enfócate solo en información del CV y la oferta laboral.";

  const textPrompt = Mustache.render(template, data);
  console.log(textPrompt);

  
  const result = await generateWithAI(textPrompt, rolePrompt);

  return result;
}