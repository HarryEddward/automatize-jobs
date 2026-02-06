
const promptCoverLetter = (cv: string, jobDescription: string) => `
Escribeme una carta de presentación para postular a un trabajo.

A la hora de escibir la carta de presentación, adecua el texto desde los siguientes textos:
1. Curriculum Vitae
2. Descripción de la postulación de trabajo

Respeta el tono y la formalidad igual al redactar la carta de presentación desde la descripción de la postulación del trabajo, siempre priorizando una respuesta formal y profesional.
`;

const promptCvAdjustmentReport = (
    formalTraining: string,
    informalTraining: string,
    workExperience: string,
    businessExperience: string,
    achievements: string,
    languages: string,
    internationalExperiences: string,
    projects: string,
    vailability: string,
    intentions: string,
) => `


`; 

export {
    promptCoverLetter,
    promptCvAdjustmentReport
}