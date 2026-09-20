"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Bus, Ticket, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

/**
 * @file src/app/events/[id]/page.tsx
 * @description Page de détail dynamique d'un événement.
 * 
 * Rôles principaux :
 * 1. Extraction de l'identifiant de l'événement depuis l'URL dynamique Next.js (App Router).
 * 2. Affichage des informations détaillées (titre, date, lieu, visuel, description et tarif).
 * 3. Intégration de la section "Fodium Transport" (Section 3.3 du cahier des charges) 
 *    permettant de valoriser la réservation de navettes officielles.
 * 4. Bouton d'action principal pour déclencher le processus d'achat du billet.
 */

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-12 md:pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* BOUTON RETOUR */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux événements</span>
        </Link>

        {/* FICHE ÉVÉNEMENT */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm space-y-6">
          {/* BANNIÈRE IMAGE */}
          <div className="relative h-64 md:h-80 w-full bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80"
              alt="Détails événement"
              fill
              className="object-cover"
              priority
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
              Musique
            </span>
          </div>

          {/* DÉTAILS TEXTUELS */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                Concert Live Afrobeats
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                Identifiant : #{id}
              </p>
            </div>

            {/* METADATAS (DATE, LIEU, SÉCURITÉ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <Calendar className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date et Heure</span>
                  <span className="text-xs md:text-sm font-bold text-slate-900">Ven. 24 Nov. • 20:00</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Lieu</span>
                  <span className="text-xs md:text-sm font-bold text-slate-900">Monument de la Renaissance, Dakar</span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2 border-t border-slate-100 pt-6">
              <h2 className="text-base font-bold text-slate-900">À propos de l'événement</h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Une soirée d'exception réunissant les plus grands artistes Afrobeats de la scène locale et internationale. Réservez votre billet en toute sécurité et votre navette de transport officielle Fodium.
              </p>
            </div>

            {/* OPTION NAVETTE TRANSPORT (Section 3.3 du cahier des charges) */}
            <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-xs md:text-sm">
                  <Bus className="w-4 h-4" />
                  <span>Navette Officielle Fodium Transport</span>
                </div>
                <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Recommandé
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Évitez les tracas de stationnement. Réservez votre aller-retour en navette sécurisée depuis votre quartier.
              </p>
            </div>

            {/* BARRE D'ACTION / RÉSERVATION */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Prix du billet</span>
                <span className="text-lg md:text-2xl font-extrabold text-slate-900">10 000 FCFA</span>
              </div>

              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                <Ticket className="w-4 h-4" />
                <span>Prendre mon billet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}