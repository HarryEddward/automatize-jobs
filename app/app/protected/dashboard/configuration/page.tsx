"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronRight, ChevronLeft, Globe, GraduationCap, BookOpen, Briefcase, Building2, Trophy, Languages, Plane, FolderKanban, Calendar, Target, AlertTriangle, TextSearch, BookOpenText } from "lucide-react";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { DebouncedTextEditor } from "@/components/ui/debounce-text-editor";
import { Editor } from "@monaco-editor/react";
import { IoDocuments } from "react-icons/io5";
import { isEmpty } from "remeda";
import { Tables } from "@/database.types";
import { Button } from "@/components/ui/button";
import { createCv } from "@/services/client/cv";
import { jobApplicationExample } from "@/app/config/client";
import { downloadText } from "@/app/utils/client/download";
import { createCoverLetter } from "@/services/client/coverLetter";



const supabase = createClient();


const SECTIONS = [
  { key: "translate_lang",            label: "Idioma",                     icon: Globe,         table: "configuration_ai",      field: "translate_lang",
    helperText: `/*


Escribe el idioma que te gusta traduccir por defecto a la IA.


-------- {Ejemplo} --------



[Idioma (Español, Inglés, etc.)]



-------- {Ejemplo} --------



*/
`
  },
  { key: "formal_training",           label: "Formación formal",           icon: GraduationCap, table: "configuration_personal", field: "formal_training",
    helperText:
`/*


Escribe tu formación académica formal (carreras, cursos, certificaciones, etc.) para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------



1. [Nombre de la formación] (Descripción de acronimos)
    - Localidad: [Pais, Ciudad]
    - Ubicación: [Local/Web]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre de la formación] (Descripción de acronimos)
    - Localidad: [Pais, Ciudad]
    - Ubicación: [Local]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

...



-------- {Ejemplo} --------



*/`
  },
  { key: "informal_training",         label: "Formación informal",         icon: BookOpen,      table: "configuration_personal", field: "informal_training",
    helperText:
`/*


Escribe tu formación académica informal (carreras, cursos, certificaciones, etc.) para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------



1. [Nombre de la formación] (Descripción de acronimos)
    - Localidad: [Pais, Comunidad, Ciudad]
    - Ubicación: [Local/Web]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre de la formación] (Descripción de acronimos)
    - Localidad: [Pais, Comunidad, Ciudad]
    - Ubicación: [Local]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

...



-------- {Ejemplo} --------



*/`
  },
  { key: "work_experience",           label: "Experiencia laboral",        icon: Briefcase,     table: "configuration_personal", field: "work_experience",
    helperText:
`/*


Escribe tu experiencia laboral para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------


1. [Nombre del puesto] (Descripción de acronimos):
    - Localidad: [Pais, Comunidad, Ciudad]
    - Empresa: [Nombre de la empresa]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Jornada: [Tipo de jornada] ([Hora, Mintuos] a la semana)
    - Sector: [Nombre del sector]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre del puesto] (Descripción de acronimos):
    - Localidad: [Pais, Comunidad, Ciudad]
    - Empresa: [Nombre de la empresa]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Jornada: [Tipo de jornada] ([Hora, Mintuos] a la semana)
    - Sector: [Nombre del sector]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

...



-------- {Ejemplo} --------



*/`
  },
  { key: "business_experience",       label: "Experiencia empresarial",    icon: Building2,     table: "configuration_personal", field: "business_experience",
    helperText:
`/*

Escribe tu experiencia empresarial para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------



1. [Nombre de la formación] (Descripción de acronimos)
    - Persona Jurídica: [Tipo de persona jurídica]
    - Actividad Legal: [Descripción breve de la actividad legal de la empresa]
    - Localidad: [Pais, Comunidad, Ciudad]
    - Ubicación: [Local/Web]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre de la formación] (Descripción de acronimos)
    - Persona Jurídica: [Tipo de persona jurídica]
    - Actividad Legal: [Descripción breve de la actividad legal de la empresa]
    - Localidad: [Pais, Comunidad, Ciudad]
    - Ubicación: [Local/Web]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

...



-------- {Ejemplo} --------



*/`
  },
  { key: "achievements",              label: "Logros",                     icon: Trophy,        table: "configuration_personal", field: "achievements",
    helperText:
`/*


Escribe tus logros académicos, profesionales o personales para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------



1. [Nombre del logro] (Descripción de acronimos):
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre del logro] (Descripción de acronimos):
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

...



-------- {Ejemplo} --------



*/`
  },
  { key: "languages",                 label: "Idiomas",                    icon: Languages,     table: "configuration_personal", field: "languages",
    helperText:
`/*


Escribe los idiomas que dominas para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------



1. [Idioma] (Descripción de acronimos):
    - Habla: [Fluido/Intermedio/Básico]
    - Escritura: [Excelente/Buena/Regular]
    - Academico: [Titulado/No titulado/[Nivel de estudios alcanzado (A1.2, B2, etc.)]]
    - Nativo: [Sí/No]

2. [Idioma] (Descripción de acronimos):
    - Habla: [Fluido/Intermedio/Básico]
    - Escritura: [Excelente/Buena/Regular]
    - Academico: [Titulado/No titulado/[Nivel de estudios alcanzado (A1.2, B2, etc.)]]
    - Nativo: [Sí/No]



-------- {Ejemplo} --------



*/`
  },
  { key: "international_experiences", label: "Experiencias internacionales",icon: Plane,        table: "configuration_personal", field: "international_experiences",
    helperText:
`/*


Escribe tus experiencias internacionales (estudios, trabajos, voluntariados, etc. en el extranjero) para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------



1. [Nombre de la experiencia] (Descripción de acronimos):
    - Tipo: [Estudio/Trabajo/Voluntariado/etc.]
    - Localidad: [Pais, Comunidad, Ciudad]
    - Empresa/Institución: [Nombre de la empresa o institución]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre de la experiencia] (Descripción de acronimos):
    - Tipo: [Estudio/Trabajo/Voluntariado/etc.]
    - Localidad: [Pais, Comunidad, Ciudad]
    - Empresa/Institución: [Nombre de la empresa o institución]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]



-------- {Ejemplo} --------



*/`
  },
  { key: "projects",                  label: "Proyectos",                  icon: FolderKanban,  table: "configuration_personal", field: "projects",
    helperText:
`/*


Escribe tus proyectos personales o colaborativos para que la IA pueda destacar lo más relevante en cada postulación.


-------- {Ejemplo} --------


1. [Nombre del proyecto] (Descripción de acronimos):
    - Localidad: [Pais, Comunidad, Ciudad]
    - Ubicación: [Local/Web]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

2. [Nombre del proyecto] (Descripción de acronimos):
    - Localidad: [Pais, Comunidad, Ciudad]
    - Ubicación: [Local/Web]
    - Fecha inicialización: [Día] [Mes recortado] [Año]
    - Fecha finalización: [Día] [Mes recortado] [Año]
    - Experiencias:
      - [Descripción breve]
      - [...]
    - Aprendizajes:
      - [Descripción breve]
      - [...]

...



-------- {Ejemplo} --------



*/`
  },
  { key: "viability",                 label: "Disponibilidad",             icon: Calendar,      table: "configuration_personal", field: "viability",
    helperText:
`/*


Escribe tu disponibilidad laboral para que la IA pueda adaptar tus postulaciones a trabajos que se ajusten a ella.


- General:
    - Disponibilidad: [Inmediato/1 mes/3 meses/etc.]
    - Duración: [Número de años] año/s y [Número de meses] mes/es
    - Localidades:
        1. [Capital/Ciudad/Pueblo mas cercana al trabajo donde usted vive]
        2. [Capital/Ciudad/Pueblo segundo mas cercana al trabajo donde usted vive]
        3. [...]
    - Jornadas preferentes:
        1. [Jornada completa/parcial/reducida]
        2. [...]
    - Notas:
        - [Descripción breve de cualquier consideración adicional que el reclutador debería saber sobre su disponibilidad para ese sector laboral]
        - [...]


- [Sector laboral (Informatica, Salud, Educación, etc.)]:
    - Disponibilidad: [Inmediato/1 mes/3 meses/etc.]
    - Duración: [Número de años] año/s y [Número de meses] mes/es
    - Localidades:
        1. [Capital/Ciudad/Pueblo mas cercana al trabajo donde usted vive]
        2. [Capital/Ciudad/Pueblo segundo mas cercana al trabajo donde usted vive]
        3. [...]
    - Jornadas preferentes:
        1. [Jornada completa/parcial/reducida]
        2. [...]
    - Notas:
        - [Descripción breve de cualquier consideración adicional que el reclutador debería saber sobre su disponibilidad para ese sector laboral]
        - [...]

...



*/`
  },
  { key: "intentions",                label: "Intenciones",                icon: Target,        table: "configuration_personal", field: "intentions",
    helperText:
`/*


Escribe tus intenciones laborales (qué tipo de trabajos buscas, qué sectores te interesan, etc.) para que la IA pueda adaptar tus postulaciones a trabajos que se ajusten a ellas.


-------- {Ejemplo} --------



1. [Tipo de trabajo o sector laboral] (Descripción de acronimos):
    - Descripción: [Descripción breve de qué tipo de trabajos buscas en ese sector laboral o qué te interesa de ese sector laboral]
    - Notas:
        - [Descripción breve de cualquier consideración adicional que el reclutador debería saber sobre tus intenciones laborales para ese sector laboral]
        - [...]

2. [Tipo de trabajo o sector laboral] (Descripción de acronimos):
    - Descripción: [Descripción breve de qué tipo de trabajos buscas en ese sector laboral o qué te interesa de ese sector laboral]
    - Notas:
        - [Descripción breve de cualquier consideración adicional que el reclutador debería saber sobre tus intenciones laborales para ese sector laboral]
        - [...]



-------- {Ejemplo} --------



*/`
  },
];

export default function ProtectedPageClient() {
  const [userDetails, setUserDetails] = useState<{
    configuration_ai: Tables<'configuration_ai'>;
    configuration_personal: Tables<'configuration_personal'>;
  }>({
    configuration_ai: {} as Tables<'configuration_ai'>,
    configuration_personal: {} as Tables<'configuration_personal'>,
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.replace("/auth/login"); return; }
        setLoading(false);
      } catch {
        router.replace("/auth/login");
      }
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/auth/login");
    });
    return () => subscription?.unsubscribe();
  }, [router]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const { data: configuration_ai, error: errorAI } = await supabase.from("configuration_ai").select("*").single();
        if (errorAI) throw errorAI;
        if (isEmpty(configuration_ai)) {
          router.replace('/protected/initialize');
        }

        const { data: configuration_personal, error: errorProf } = await supabase.from("configuration_personal").select("*").single();
        console.log("Fetched user details:", { configuration_ai, configuration_personal });
        
        if (errorProf) throw errorProf;
        if (isEmpty(configuration_personal)) {
          router.replace('/protected/initialize');
        }
        

        setUserDetails({ configuration_ai, configuration_personal });
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserDetails();
  }, []);

  const handleSave = async (field: string, table: "configuration_ai" | "configuration_personal", value: string) => {
    
    const record = table === "configuration_ai" ? userDetails.configuration_ai : userDetails.configuration_personal;
    if (!record?.id) return;
    const { error } = await supabase.from(table).update({ [field]: value }).eq("id", record.id);
    if (error) {
      throw error;
    } else {
      // Actualiza el estado local para reflejar el cambio en UI inmediatamente
      setUserDetails((prev) => {
        if (table === "configuration_ai" && prev.configuration_ai) {
          return {
            ...prev,
            configuration_ai: {
              ...prev.configuration_ai,
              [field]: value,
            },
          };
        } else if (table === "configuration_personal" && prev.configuration_personal) {
          return {
            ...prev,
            configuration_personal: {
              ...prev.configuration_personal,
              [field]: value,
            },
          };
        } else {
          return prev;
        }
      });
    }
  };

  const getFieldValue = (section: typeof SECTIONS[0]): string => {
    if (section.table === "configuration_ai")
      return (userDetails.configuration_ai?.[section.field as keyof typeof userDetails.configuration_ai] as string) || "";
    return (userDetails.configuration_personal?.[section.field as keyof typeof userDetails.configuration_personal] as string) || "";
  };

  const activeSectionData = SECTIONS.find(s => s.key === activeSection);


  

  if (loading) return <Loader />;

  return (
    <div className=" h-full  items-start justify-center p-4 min-w-8xl ">

      <div className="bg-gradient-to-br from-white via-white to-slate-100 border-2 border-gray-200 text-slate-900 font-['DM_Sans',_sans-serif] rounded-2xl shadow-sm border border-slate-200/50">
        <style>{`
          * { box-sizing: border-box; }

          .section-btn { 
            transition: all 0.2s ease;
            background: rgba(255, 255, 255, 0.6);
          }
          .section-btn:hover {
            background: rgba(59, 130, 246, 0.05);
            border-color: rgba(59, 130, 246, 0.3);
          }
          .section-btn.active {
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(59, 130, 246, 0.08);
          }
          .editor-panel {
            animation: slideUp 0.25s ease;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .warning-bar {
            background: repeating-linear-gradient(
              -45deg,
              rgba(249, 115, 115, 0.06), rgba(249, 115, 115, 0.06) 4px,
              transparent 4px, transparent 12px
            );
          }
        `}</style>

        {/* Header */}
        <div className="px-4 pt-10 pb-6 border-b border-slate-200/60 bg-slate-50 rounded-t-xl">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-slate-500/70 font-medium mb-2">Perfil · IA</p>
            <h1 className="text-2xl font-['Syne',_sans-serif] font-extrabold leading-tight mb-2 text-slate-900">
              Configura tu<br />información
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gestiona tu contenido académico y profesional para que la IA optimice tus postulaciones.
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="px-4 py-3 warning-bar border-b border-red-200/50">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600 font-medium">
              NO incluyas referencias personales explícitas (nombre, DNI, dirección, etc.)
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">

          {/* ─── Mobile (< lg) ─── */}
          <div className="lg:hidden">
            {!activeSection ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-slate-500/60 uppercase tracking-widest mb-3">Secciones</p>
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const value = getFieldValue(section);
                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className="section-btn w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-slate-200/70 text-left"
                    >
                      <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-slate-600" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-slate-900">{section.label}</span>
                        {value
                          ? <span className="block text-xs text-slate-500 truncate mt-0.5">{value}</span>
                          : <span className="block text-xs text-slate-400 mt-0.5">Sin completar</span>}
                      </span>
                      <ChevronRight size={16} className="text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="editor-panel">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-5 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Volver
                </button>

                {activeSectionData && (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <activeSectionData.icon size={16} className="text-blue-600" />
                      </span>
                      <h2 className="text-lg font-['Syne',_sans-serif] font-bold text-slate-900">{activeSectionData.label}</h2>
                    </div>

                    <DebouncedTextEditor
                      key={activeSectionData.key}
                      initialValue={getFieldValue(activeSectionData)}
                      onSave={(val) => handleSave(activeSectionData.field, activeSectionData.table as "configuration_ai" | "configuration_personal", val)}
                      height="25vh"
                      placeholder={`Escribe aquí tu ${activeSectionData.label.toLowerCase()}...`}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── Desktop (≥ lg) ─── */}
          <div className="hidden lg:grid lg:grid-cols-[220px_1fr_1fr] gap-4 h-[50vh] min-w-4xl w-full">

            {/* Left: lista */}
            <div className="flex flex-col gap-1.5 overflow-y-auto pr-2">
              <p className="text-xs text-slate-500/60 uppercase tracking-widest mb-2 px-2">Secciones</p>
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const value = getFieldValue(section);
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`section-btn w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-slate-200/70 text-left ${activeSection === section.key ? "active" : ""}`}
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-slate-600" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-slate-900">{section.label}</span>
                      {value
                        ? <span className="block text-xs text-slate-500 truncate">{value.slice(0, 28)}…</span>
                        : <span className="block text-xs text-slate-400">Sin completar</span>}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: editor */}
            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden h-full shadow-sm">
              {activeSection && activeSectionData ? (
                <>
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/60 shrink-0 bg-gradient-to-r from-blue-50 to-transparent">
                    <activeSectionData.icon size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold text-slate-900">{activeSectionData.label}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <DebouncedTextEditor
                      key={activeSectionData.key}
                      initialValue={getFieldValue(activeSectionData)}
                      onSave={(val) => handleSave(activeSectionData.field, activeSectionData.table as "configuration_ai" | "configuration_personal", val)}
                      height="50vh"
                      placeholder={`Escribe aquí tu ${activeSectionData.label.toLowerCase()}...`}
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400 px-24">
                  <div className="w-12 h-12 rounded-full border border-slate-200/70 flex items-center justify-center bg-slate-50/50">
                    <ChevronRight size={20} />
                  </div>
                  <p className="text-sm">Selecciona una sección</p>
                </div>
              )}
            </div>

            <div className="flex h-full border-2 w-full">
              {/* Espacio para futuras funcionalidades o información adicional */}

              <div className="w-full h-full rounded-xl border border-slate-200/50 bg-gradient-to-br from-slate-50 to-white text-slate-900 font-['DM_Sans',_sans-serif] shadow-sm">
                {
                  activeSection && activeSectionData  ? (
                    
                      <Editor
                        height="100%"
                        language="typescript"
                        loading={<Loader />}
                        className="p-4"
                        value={activeSectionData.helperText}
                        
                        theme="hc-light"
                        options={{ readOnly: true, minimap: { enabled: false }, folding: false, wordWrap: "on", lineNumbers: "off" }}
                      />

                    
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-400">
                      <div className="w-6 h-6 rounded-full border border-slate-200/70 flex items-center justify-center bg-slate-50/50"></div>
                        <BookOpenText size={40} />
                      </div>
                  )
                }
                
              </div>
            </div>


          </div>

        </div>
      </div>
      

      <Button
      onClick={() => handleGenerateCv()}
      >Generar CV</Button>
      <Button
      onClick={() => handleGenerateCoverLetter()}
      >Generar Carta de Presentación</Button>
      

    </div>
    
  );
}