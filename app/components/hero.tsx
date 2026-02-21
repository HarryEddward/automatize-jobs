
import Link from "next/link";
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

import Video from 'next-video';
import sampleVideo from '/videos/sample.mp4';
import DisplayCards from "./display-3d-cards";


import { ArrowUp, ChevronsUp, Sparkles } from "lucide-react";
import { TestimonialCarousel } from "./ui/testimonial";


const defaultCards = [
  {
    icon: <ArrowUp className="size-4 text-blue-300" />,
    title: "CV Personalizado",
    description: "Crea un CV ideal para tu trabajo",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-700",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Carta de Presentación",
    description: "Adapta el puesto de trabajo y el cv a cad",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-700",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 text-wrap",
  },
  {
    icon: <ChevronsUp className="size-4 text-blue-300" />,
    title: "Encuentra trabajo más rápido",
    description: "Aumenta un 60% de conseguir un trabaj",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-700",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    description:
      "Amazing experience working with this team! The results exceeded my expectations.",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Highly recommended! Great service and professional approach.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description:
      "Exceptional quality and professionalism. Would definitely work with them again.",
  },
];


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

      <DisplayCards cards={defaultCards} />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mt-28" />
      <TestimonialCarousel
        testimonials={TESTIMONIAL_DATA}
        className="max-w-2xl mx-auto"
      />

      
      {
        /**
         * <video width="100%" height="100%" controls preload="none" className="rounded-xl mb-8">
        <source src={'/videos/sample.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {
        !user && (
          <Button size="lg" variant={"outline"} className="w-1/2 shadow-xl">
            <Link href="/auth/login">Prueba GRATIS sin tarjeta!</Link>
          </Button>
        )
      }

         */
      }
      
      
      
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8 mt-8" />
    </div>
  );
}
