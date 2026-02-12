
import Link from "next/link";
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export async function Hero() {

  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return (
    <div className="flex flex-col gap-16 items-center">
      
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Crea CV adaptados y Cartas de Presentación a {" "}
  
        <a
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          cualquier tipo de trabajo, en minutos.
        </a>
      </p>
      {
        !user && (
          <Button size="lg" variant={"outline"} className="w-1/2 shadow-xl">
            <Link href="/auth/login">Prueba GRATIS sin tarjeta!</Link>
          </Button>
        )
      }
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
