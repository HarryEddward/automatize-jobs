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

export async function createCv(data: IPrompt) {
  const res = await fetch('/templates/prompts/cv.mustache');
  const template = await res.text();

  const rolePrompt = "Eres un experto senior en recursos humanos, redacción profesional y optimización avanzada de CVs orientados a procesos de selección reales.";

  const textPrompt = Mustache.render(template, data);
  console.log(textPrompt);

  
  const result = await generateWithAI(textPrompt, rolePrompt);

  return result;
}