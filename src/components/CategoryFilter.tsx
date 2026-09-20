"use client";

import React from "react";
import { Calendar, Bus } from "lucide-react";

interface CategoryFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

/**
 * CategoryFilter - Composant de sélection de catégories principales
 * 
 * Rôle :
 * 1. Permet à l'utilisateur de basculer facilement entre la vue Événements et la vue Navettes Transport.
 * 2. Met en valeur visuellement l'offre de transport ("Nouveau") avec un badge distinctif.
 */
export default function CategoryFilter({ filter, setFilter }: CategoryFilterProps) {
  return (
    <section className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      {/* BOUTON ÉVÉNEMENTS */}
      <button
        onClick={() => setFilter("events")}
        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
          filter === "events"
            ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
            : "bg-white border-slate-200 text-slate-700 hover:border-orange-300"
        }`}
      >
        <div className={`p-3 rounded-xl ${filter === "events" ? "bg-white/20" : "bg-orange-50 text-orange-500"}`}>
          <Calendar className="w-6 h-6" />
        </div>
        <span className="font-bold text-sm">Événements</span>
      </button>

      {/* BOUTON NAVETTES TRANSPORT */}
      <button
        onClick={() => setFilter("transport")}
        className={`relative p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
          filter === "transport"
            ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
            : "bg-white border-slate-200 text-slate-700 hover:border-orange-300"
        }`}
      >
        <span className="absolute top-2 right-2 text-[9px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase">
          Nouveau
        </span>
        <div className={`p-3 rounded-xl ${filter === "transport" ? "bg-white/20" : "bg-orange-50 text-orange-500"}`}>
          <Bus className="w-6 h-6" />
        </div>
        <span className="font-bold text-sm">Navettes Transport</span>
      </button>
    </section>
  );
}