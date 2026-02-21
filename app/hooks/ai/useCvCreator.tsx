import React, { useEffect, useState } from 'react'
import { useAiChat } from '../useAiChat'
import { useAiMessage } from '../useAiMessage';


interface IPompt {
    translate_lang: string,
    formal_training: string,
    informal_training: string,
    work_experience: string,
    business_experience: string,
    projects: string,
    achievements: string,
    languages: string,
    international_experiences: string,
    viability: string,
    intentions: string,

    job_offer: string
}


interface IUseCVCreator extends IPompt {

};


const prompt = ({
    translate_lang,
    formal_training,
    informal_training,
    work_experience,
    business_experience,
    projects,
    achievements,
    languages,
    international_experiences,
    viability,
    intentions,

    job_offer
}: IPompt) => 
`
Eres un experto en recursos humanos, redacción profesional y optimización de CVs para procesos de selección.

Tu objetivo es generar un CV completamente adaptado a una oferta de trabajo específica, maximizando la relevancia, claridad y probabilidad de contratación.

---

CONTEXTO DEL CANDIDATO (DATOS REALES - NO INVENTAR):

Idioma objetivo: ${translate_lang}

Formación formal:
${formal_training}

Formación informal:
${informal_training}

Experiencia laboral:
${work_experience}

Experiencia empresarial:
${business_experience}

Proyectos:
${projects}

Logros:
${achievements}

Idiomas:
${languages}

Experiencias internacionales:
${international_experiences}

Disponibilidad:
${viability}

Intenciones laborales:
${intentions}

---

OFERTA DE TRABAJO:

${job_offer}

---

INSTRUCCIONES:

1. Analiza la oferta de trabajo y detecta:
   - Habilidades clave requeridas
   - Experiencia relevante
   - Palabras clave importantes (ATS)
   - Nivel del puesto

2. Filtra SOLO la información relevante del candidato:
   - Elimina lo irrelevante para este puesto
   - Prioriza lo que encaja directamente
   - Reordena secciones según importancia

3. Reescribe el contenido:
   - Enfocado a impacto profesional
   - Usando lenguaje claro, directo y profesional
   - Evitando texto genérico o vacío
   - Sin inventar información bajo ningún concepto

4. Optimiza para ATS (Applicant Tracking Systems):
   - Usa palabras clave del job description
   - Mantén estructura clara
   - Evita formatos innecesarios

---

REGLAS ESTRICTAS:

- ❌ No inventar datos
- ❌ No incluir información irrelevante
- ❌ No repetir contenido
- ❌ No usar frases genéricas tipo "trabajador", "responsable", etc.
- ✅ Priorizar logros y resultados
- ✅ Ser conciso pero potente

---

FORMATO DE SALIDA (OBLIGATORIO):

Genera un CV en texto plano estructurado así:

# NOMBRE DEL CANDIDATO

## Perfil profesional
[Resumen adaptado al puesto en 3-5 líneas]

## Experiencia relevante
[SOLO experiencia alineada con el puesto]

## Formación
[Filtrada y relevante]

## Proyectos (si aplican)
[Relevantes al puesto]

## Logros destacados
[Opcional pero potente]

## Idiomas

## Disponibilidad

---

IMPORTANTE:

- El CV debe parecer escrito manualmente por un experto
- Debe estar completamente adaptado a la oferta
- No debe incluir secciones vacías
`;

export default async function useCvCreator({
    translate_lang,
    formal_training,
    informal_training,
    work_experience,
    business_experience,
    projects,
    achievements,
    languages,
    international_experiences,
    viability,
    intentions,

    job_offer
}: IUseCVCreator) {


    const [resultCv, setResultCv] = useState<string>('');

    useEffect(() => {

        useAiMessage(
            prompt({
                translate_lang,
                formal_training,
                informal_training,
                work_experience,
                business_experience,
                projects,
                achievements,
                languages,
                international_experiences,
                viability,
                intentions,
                job_offer
            })
        )
        .then((result) => setResultCv(result))
        .catch((error) => console.error(error));
        
    }, []);


  
    return resultCv;
}
