"use client";

import React from "react";
import { Calendar, Bus } from "lucide-react";

/**
 * Interface définissant les propriétés (props) du composant CategoryFilter.
 * 
 * @property filter Identifiant du filtre actuellement actif ('events' pour les événements, 'transport' pour les navettes)
 * @property setFilter Fonction de mise à jour permettant de basculer le filtre actif
 */
interface CategoryFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

/**
 * Composant de sélection de la vue principale (Événements vs Navettes Transport).
 * 
 * Rôle & Caractéristiques :
 * - Permet à l'utilisateur de basculer facilement entre le catalogue des événements et l'offre de navettes.
 * - Met en valeur la fonctionnalité de transport grâce à un badge "Nouveau" distinctif.
 * - Offre un retour visuel dynamique (changements de couleur, ombres et contrastes) selon l'onglet actif.
 */
export default function CategoryFilter({ filter, setFilter }: CategoryFilterProps) {
  return (
    <section className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      {/* BOUTON SELECTION : FILTRE ÉVÉNEMENTS */}
      <button
        type="button"
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

      {/* BOUTON SELECTION : FILTRE NAVETTES TRANSPORT */}
      <button
        type="button"
        onClick={() => setFilter("transport")}
        className={`relative p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
          filter === "transport"
            ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
            : "bg-white border-slate-200 text-slate-700 hover:border-orange-300"
        }`}
      >
        {/* BADGE DE MISE EN VALEUR DE LA NOUVELLE FONCTIONNALITÉ */}
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