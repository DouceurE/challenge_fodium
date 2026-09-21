"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Calendar, Bus, Ticket, User } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Navbar - Composant de barre de navigation principale et responsive.
 * 
 * Rôle & Caractéristiques :
 * - Offre un comportement adaptatif dual : barre flottante en bas (Bottom Bar) sur mobile pour une ergonomie optimale au pouce, et barre supérieure (Top Bar) sur écran de bureau.
 * - Utilise `usePathname()` pour surligner dynamiquement l'onglet actif avec la couleur de la marque (Orange Fodium).
 * - Intègre le logo officiel optimisé via le composant `<Image />` de Next.js.
 * - Inclut un indicateur visuel animé "bientôt" pour mettre en valeur les fonctionnalités en cours de développement (Fodium Transport).
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:top-0 md:bottom-auto md:left-0 md:right-0 md:rounded-none">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md text-slate-900 rounded-full md:rounded-b-2xl px-6 py-2.5 shadow-xl border border-slate-200/80 flex items-center justify-between">
        
        {/* LOGO OFFICIEL FODIUM (Rendu optimisé Next.js Image) */}
        <Link href="/" className="hidden md:flex items-center gap-2">
          <Image 
            src="/logo.jpg" 
            alt="Fodium Logo" 
            width={120}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* LIENS ET ONGLETS DE NAVIGATION */}
        <div className="flex items-center justify-around w-full md:w-auto md:gap-8">
          
          {/* ONGLET 1 : ACCUEIL */}
          <Link
            href="/"
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              pathname === "/" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Accueil</span>
          </Link>

          {/* ONGLET 2 : ÉVÉNEMENTS */}
          <Link
            href="/events"
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              pathname === "/events" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Événements</span>
          </Link>

          {/* ONGLET 3 : TRANSPORT (MODALITE BIENTÔT DISPONIBLE) */}
          <div className="relative flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold text-slate-400 cursor-not-allowed pointer-events-none">
            <motion.span
              animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-3 -right-2 md:-top-2 md:-right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-md"
            >
              bientôt
            </motion.span>
            <Bus className="w-5 h-5" />
            <span>Transport</span>
          </div>

          {/* ONGLET 4 : MES BILLETS */}
          <Link
            href="/tickets"
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              pathname === "/tickets" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span>Billets</span>
          </Link>

          {/* ONGLET 5 : PROFIL UTILISATEUR */}
          <Link
            href="/profile"
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              pathname === "/profile" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profil</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}