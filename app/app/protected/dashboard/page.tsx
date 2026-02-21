"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlay } from "react-icons/fa";
import { FaLink, FaRegFileZipper, FaUpload } from "react-icons/fa6";
import { LuFilePlus2 } from "react-icons/lu";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoDocumentOutline, IoReloadCircle, IoSettingsSharp } from "react-icons/io5";
import { TbMailStar } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { Tables } from "@/database.types";
import { isEmpty } from "remeda";
import { createCv } from "@/services/client/cv";
import { downloadText } from "@/app/utils/client/download";
import { createCoverLetter, createCoverLetterUpgrader } from "@/services/client/coverLetter";


const supabase = createClient();

export default function ProtectedPage() {
  const [loading, setLoading] = useState(true);
  const [jobApplication, setJobApplication] = useState<string>("");
  const [uid, setUid] = useState<string>("");


  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.replace('/auth/login');
          return;
        }
        setUid(session.user.id);
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

  const [userDetails, setUserDetails] = useState<{
    ai_translate_lang: Tables<'configuration_ai'>['translate_lang'];
    configuration_personal: Tables<'configuration_personal'>;
  }>({
    ai_translate_lang: "" as Tables<'configuration_ai'>['translate_lang'],
    configuration_personal: {} as Tables<'configuration_personal'>,
  });

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const { data: configuration_ai, error: errorAI } = await supabase.from("configuration_ai").select("translate_lang").eq("user_id", uid).single();
        if (errorAI) throw errorAI;
        if (isEmpty(configuration_ai)) {
          router.replace('/protected/initialize');
        }

        const { data: configuration_personal, error: errorProf } = await supabase.from("configuration_personal").select("*").eq("user_id", uid).single();

        if (errorProf) throw errorProf;
        if (isEmpty(configuration_personal)) {
          router.replace('/protected/initialize');
        }
        

        setUserDetails({ ai_translate_lang: configuration_ai.translate_lang, configuration_personal });
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserDetails();
  }, []);


  const [cv, setCv] = useState({});
  const [loadingCv, setLoadingCv] = useState(false);

  const handleGenerateCv = async () => {
    try {
      setLoadingCv(true);

      const result = await createCv({
        translate_lang: userDetails.ai_translate_lang,
        formal_training: userDetails.configuration_personal.formal_training,
        informal_training: userDetails.configuration_personal.informal_training,
        work_experience: userDetails.configuration_personal.work_experience,
        business_experience: userDetails.configuration_personal.business_experience,
        projects: userDetails.configuration_personal.projects,
        achievements: userDetails.configuration_personal.achievements,
        languages: userDetails.configuration_personal.languages,
        international_experiences: userDetails.configuration_personal.international_experiences,
        viability: userDetails.configuration_personal.viability,
        intentions: userDetails.configuration_personal.intentions,

        job_offer: jobApplication,
      });

      setCv(result);


      downloadText(String(result.message?.content), "adaptador_cv")

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCv(false);
    }
  };

  const [coverLetter, setCoverLetter] = useState({});
  const [loadingCoverLetter, setLoadingCoverLetter] = useState(false);

  const handleGenerateCoverLetter = async () => {
    try {
      setLoadingCoverLetter(true);

      const result = await createCoverLetter({
        translate_lang: userDetails.ai_translate_lang,
        formal_training: userDetails.configuration_personal.formal_training,
        informal_training: userDetails.configuration_personal.informal_training,
        work_experience: userDetails.configuration_personal.work_experience,
        business_experience: userDetails.configuration_personal.business_experience,
        projects: userDetails.configuration_personal.projects,
        achievements: userDetails.configuration_personal.achievements,
        languages: userDetails.configuration_personal.languages,
        international_experiences: userDetails.configuration_personal.international_experiences,
        viability: userDetails.configuration_personal.viability,
        intentions: userDetails.configuration_personal.intentions,

        job_offer: jobApplication,
      });

      setCoverLetter(result);


      downloadText(result, "carta_de_presentación")

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  const handleGenerateCoverLetterUpgrader = async () => {
    try {
      setLoadingCoverLetter(true);

      const result = await createCoverLetterUpgrader({
        coverLetter: String(coverLetter),
      });

      setCoverLetter(result);


      downloadText(String(result.message?.content), "carta_de_presentación")

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCoverLetter(false);
    }
  };


  if (loading) return <Loader />;

  return (
    <div className="flex-1 w-full flex flex-col gap-12">

      <div className="container mx-auto px-4 gap-y-8 flex flex-col">
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Panel de control.</h1>
          <p>Gestiona desde el panel de control toda la ejeucción de jobs para automatizar la generación de los archivos finales.</p>
        </div>

        <div className="w-full flex flex-row gap-x-2">
          <Button variant={"outline"} className="flex">
            <span>Crear job</span>
            <LuFilePlus2 />
          </Button>
          <Button variant={"outline"} className="w-full">
            Ejecutar todos los jobs
          </Button>
          <Button variant={"outline"} className="flex ">
            <span>Descargar todo</span>
            <FaRegFileZipper />
          </Button>

        </div>
        
        <div className="w-full flex flex-row gap-x-2 items-center">
          <Button variant={"ghost"} className="">
            <IoSettingsSharp />
          </Button>
          <div className="rounded-md bg-accent p-4 w-full grid grid-cols-2 gap-6">
  
            {/* Sección 1 */}
            <div className="flex items-center gap-4">
              <Button variant="destructive">
                <BsFillTrash3Fill />
              </Button>
              {/*
                <Input placeholder="URL Postulación del trabajo" />
                <Input placeholder="Idioma a generar" />
              */}
              <textarea
                value={jobApplication}
                onChange={(e) => setJobApplication(e.target.value)}
                placeholder="Escribe algo aquí..."
                rows={1}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Sección 2 */}
            <div className="flex items-center justify-end gap-4">
              <Button
              onClick={() => handleGenerateCv()}
              variant="outline">
                <IoDocumentOutline />
              </Button>
              <Button
              onClick={() => handleGenerateCoverLetter()}
              variant="outline">
                <TbMailStar />
              </Button>
              <Button
              onClick={() => handleGenerateCoverLetterUpgrader()}
              variant="outline">
                <IoReloadCircle />
              </Button>
              <Button variant="outline">
                <FaPlay />
              </Button>
            </div>

          </div>
          <div className="h-full flex items-center p-2 gap-x-2  rounded-lg">
            <Button variant={"secondary"} className="">
              <FaUpload />
            </Button>
            <Button variant={"secondary"} className="">
              <FaLink />
            </Button>
          </div>
          
        </div>
        
      
      </div>
        
      
    </div>
  );
}
