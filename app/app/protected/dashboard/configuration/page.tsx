"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Cliente para frontend
import { InfoIcon } from "lucide-react";
import { DebouncedInput } from "@/components/ui/debounce-input";
import { DebouncedTextarea } from "@/components/ui/debounce-areatext";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function ProtectedPageClient() {
  const [userDetails, setUserDetails] = useState<{
    config_ai?: { id: number; translate_lang: string };
    config_profesional_and_academic_information?: any;
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
        const { data: config_ai, error: errorAI } = await supabase
          .from("ai_configuration")
          .select("*")
          .single();

        if (errorAI) throw errorAI;

        // Obtener datos de la tabla profesional y académica
        const { data: config_profesional_and_academic_information, error: errorProf } =
          await supabase
            .from("profesional_and_academic_information")
            .select("*")
            .single();

        if (errorProf) throw errorProf;

        setUserDetails({ config_ai, config_profesional_and_academic_information });
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
      if (!userDetails.config_ai?.id) return;

      const { error } = await supabase
        .from("ai_configuration")
        .update({ translate_lang: value })
        .eq("id", userDetails.config_ai.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating translate_lang:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationFormalTraining = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ formal_training: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating formal_training:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationInformalTraining = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ informal_training: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating formal_training:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationWorkExperience = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ work_experience: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating work_experience:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationBusinessExperience = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ business_experience: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating business_experience:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationAchievements = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ achievements: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating achievements:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationLanguages = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ languages: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating languages:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationInternationalExperiences = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ international_experiences: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating international_experiences:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationProjects = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ projects: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating projects:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationViability = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ viability: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating viability:", err);
    }
  };

  const handleSaveInputConfigProfesionalAndAcademicInformationIntentions = async (value: string) => {
    try {
      if (!userDetails.config_profesional_and_academic_information?.id) return;

      const { error } = await supabase
        .from("profesional_and_academic_information")
        .update({ intentions: value })
        .eq("id", userDetails.config_profesional_and_academic_information.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating intentions:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <div className="container mx-auto px-4 gap-y-4 flex flex-col">
        <h1 className="text-2xl font-bold">Configura tu información</h1>
        <p>Gestiona todo tu contenido academico como profesional para que la IA comprenda y optimize tu postulación de trabajo, entre configuraciónes de la IA misma.</p>

        <p className="text-red-500 mt-3 font-bold">RECUERDA: NO INTRODUZCAS NINGÚNA REFERENCIA EXPLICITA PERSONAL</p>
      </div>
      <div className=" flex flex-col gap-2 items-start">

        <DebouncedInput
          initialValue={userDetails.config_ai?.translate_lang || ""}
          onSave={handleSaveInputConfigAiTranslateLang}
          placeholder="Idioma de traducción a la postulación de trabajo"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.formal_training || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationFormalTraining}
          placeholder="Formación formal (educación, cursos, certificaciones, etc.)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.informal_training || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationInformalTraining}
          placeholder="Formación informal (cursos, talleres, experiencia laboral, etc.)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.work_experience || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationWorkExperience}
          placeholder="Experiencia laboral (puestos, responsabilidades, logros, etc.)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.business_experience || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationBusinessExperience}
          placeholder="Experiencia emprendedora (proyectos empresariales, emprendimientos, etc.)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.achievements || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationAchievements}
          placeholder="Logros (premios, reconocimientos, publicaciones, etc.)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.languages || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationLanguages}
          placeholder="Idiomas (idiomas que hablas y tu nivel de competencia en cada uno)"
          rows={4}
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.international_experiences || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationInternationalExperiences}
          placeholder="Experiencias internacionales (estudios, trabajo, voluntariado, etc. en el extranjero)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.projects || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationProjects}
          placeholder="Proyectos (proyectos relevantes en los que has trabajado, ya sean académicos, profesionales o personales)"
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.viability || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationViability}
          placeholder="Viabilidad (¿qué tan viable es tu postulación a un trabajo específico? ¿qué tan alineada está tu experiencia y formación con el trabajo al que quieres postular?)"
          rows={3}
        />

        <DebouncedTextarea
          initialValue={userDetails.config_profesional_and_academic_information?.intentions || ""}
          onSave={handleSaveInputConfigProfesionalAndAcademicInformationIntentions}
          placeholder="Intenciones (¿cuáles son tus intenciones y objetivos profesionales? ¿qué tipo de trabajo estás buscando? ¿en qué tipo de empresa te gustaría trabajar? etc.)"
          rows={3}
        />

        


      </div>
    </div>
  );
}