"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Cliente para frontend
import { InfoIcon } from "lucide-react";
import { DebouncedInput } from "@/components/ui/debounce-input";
import { DebouncedTextarea } from "@/components/ui/debounce-areatext";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import Editor from '@monaco-editor/react';
import { Button } from "@/components/ui/button";


const supabase = createClient();

export default function ProtectedPageClient() {
  type typeLLMProvider = "chatgpt" | "gemini" | "grok";
  const [userDetails, setUserDetails] = useState<{
    configuration_ai?: { id: number; translate_lang: string; llm_provider: typeLLMProvider  };
    configuration_personal?: any;
  }>({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace('/auth/login');
          return;
        }
        setLoading(false);
      } catch (error) {
        console.error('Error verifying authentication:', error);
        router.replace('/auth/login');
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/auth/login');
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);

  // Cargar datos desde Supabase
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        // Obtener datos de la tabla AI
        const { data: configuration_ai, error: errorAI } = await supabase
          .from("configuration_ai")
          .select("*")
          .single();

        if (errorAI) throw errorAI;

        // Obtener datos de la tabla profesional y académica
        const { data: configuration_personal, error: errorProf } =
          await supabase
            .from("configuration_personal")
            .select("*")
            .single();

        if (errorProf) throw errorProf;

        setUserDetails({ configuration_ai, configuration_personal });
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  // Función genérica para actualizar translate_lang
  const handleSaveInputConfigAiTranslateLang = async (value: string) => {
    try {
      if (!userDetails.configuration_ai?.id) return;

      const { error } = await supabase
        .from("configuration_ai")
        .update({ translate_lang: value })
        .eq("id", userDetails.configuration_ai.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating translate_lang:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationFormalTraining = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ formal_training: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating formal_training:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationInformalTraining = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ informal_training: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating formal_training:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationWorkExperience = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ work_experience: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating work_experience:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationBusinessExperience = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ business_experience: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating business_experience:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationAchievements = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ achievements: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating achievements:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationLanguages = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ languages: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating languages:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationInternationalExperiences = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ international_experiences: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating international_experiences:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationProjects = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ projects: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating projects:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationViability = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ viability: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating viability:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationIntentions = async (value: string) => {
    try {
      if (!userDetails.configuration_personal?.id) return;

      const { error } = await supabase
        .from("configuration_personal")
        .update({ intentions: value })
        .eq("id", userDetails.configuration_personal.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating intentions:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <div className="container mx-auto px-4 gap-y-4 flex flex-col">
        <h1 className="text-2xl font-bold">Configura tu información.</h1>
        <p>Gestiona todo tu contenido academico, profesional como configuraciónes para que la IA comprenda y optimize tu postulación de trabajo.</p>

        <p className="text-red-500 mt-3 font-bold">RECUERDA: NO INTRODUZCAS NINGÚNA REFERENCIA EXPLICITA PERSONAL</p>
      </div>
      <div className=" flex flex-col gap-2 items-start my-8">

        
        <div className="rounded-lg bg-secondary p-4 w-full grid grid-cols-2 gap-6">
          <div className="w-full h-[70vh] overflow-scroll flex flex-col gap-y-8">

            <div className="rounded-md bg-accent p-4 w-full grid grid-cols-2 gap-4">
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Idioma de traducción</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Academica formal</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Academica informal</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Experiencia laboral</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Experiencia empresarial</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Logros</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Idiomas</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Experiencias internacionales</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Proyectos</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Disponibilidad</Button>
              <Button variant={"outline"} className="flex items-center gap-x-2 py-8">Intenciones</Button>
            </div>

            {/*
            <DebouncedInput
              initialValue={userDetails.configuration_ai?.translate_lang || ""}
              onSave={handleSaveInputConfigAiTranslateLang}
              placeholder="Idioma de traducción a la postulación de trabajo"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.formal_training || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationFormalTraining}
              placeholder="Formación formal (educación, cursos, certificaciones, etc.)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.informal_training || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationInformalTraining}
              placeholder="Formación informal (cursos, talleres, experiencia laboral, etc.)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.work_experience || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationWorkExperience}
              placeholder="Experiencia laboral (puestos, responsabilidades, logros, etc.)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.business_experience || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationBusinessExperience}
              placeholder="Experiencia emprendedora (proyectos empresariales, emprendimientos, etc.)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.achievements || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationAchievements}
              placeholder="Logros (premios, reconocimientos, publicaciones, etc.)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.languages || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationLanguages}
              placeholder="Idiomas (idiomas que hablas y tu nivel de competencia en cada uno)"
              rows={4}
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.international_experiences || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationInternationalExperiences}
              placeholder="Experiencias internacionales (estudios, trabajo, voluntariado, etc. en el extranjero)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.projects || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationProjects}
              placeholder="Proyectos (proyectos relevantes en los que has trabajado, ya sean académicos, profesionales o personales)"
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.viability || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationViability}
              placeholder="Viabilidad (¿qué tan viable es tu postulación a un trabajo específico? ¿qué tan alineada está tu experiencia y formación con el trabajo al que quieres postular?)"
              rows={3}
            />

            <DebouncedTextarea
              initialValue={userDetails.configuration_personal?.intentions || ""}
              onSave={handleSaveInputConfigProfesionalAndAcademicInformationIntentions}
              placeholder="Intenciones (¿cuáles son tus intenciones y objetivos profesionales? ¿qué tipo de trabajo estás buscando? ¿en qué tipo de empresa te gustaría trabajar? etc.)"
              rows={3}
            />
            */}
            

          </div>
          
          <Editor height="70vh" className="rounded-lg" defaultLanguage="markdown" defaultValue="// Editor de texto" />
        </div>
        


        


      </div>
    </div>
  );
}