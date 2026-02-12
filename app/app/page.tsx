import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { TutorialStep } from "@/components/tutorial/tutorial-step";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Automatize Jobs</Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Suspense>
            <Hero />
          </Suspense>
          
          <main className="container justify-center items-center flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Que funciones tiene?</h2>
            <div className="flex-col gap-y-6 flex">
              <TutorialStep title="Automatiza todos los sitios de postulaciones web con un click!">
                <p>Al recopilar todos las páginas web de postulaciones, la IA obtiene su descripión y con ella te genera tu CV con la carta de presentación</p>
              </TutorialStep>
              <TutorialStep title="Genera tu CV y Carta de Presentación automáticamente, y en cualquier idioma!">
                <p>La IA analiza las descripciones de los trabajos y te genera un CV personalizado con base en tus habilidades y experiencia.</p>
              </TutorialStep>
              <TutorialStep title="Adapta tus experiencias para adaptarlo en diferentes trabajos!">
                <p>La IA adapta tus experiencias laborales a cada trabajo específico, asegurando que tu CV resalte las habilidades más relevantes para cada posición.</p>
              </TutorialStep>
              <TutorialStep title="Mas probabilidades de conseguir el trabajo">
                <p>Al tener un CV personalizado y una carta de presentación adaptada a cada trabajo, aumentas tus posibilidades de ser seleccionado por los reclutadores.</p>
              </TutorialStep>
              
            </div>
            
          </main>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
