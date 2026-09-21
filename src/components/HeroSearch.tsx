"use client";

import React from "react";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Interface définissant les propriétés (props) attendues par le composant HeroSearch.
 * 
 * @property searchQuery Terme de recherche actuel saisi par l'utilisateur
 * @property setSearchQuery Fonction de mise à jour de l'état global/parent de la recherche
 */
interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * HeroSearch - Section d'en-tête principale (Hero Section) et barre de recherche unifiée.
 * 
 * Rôle & Caractéristiques :
 * - Présente l'accroche marketing de Fodium (billetterie + navettes de transport).
 * - Utilise `framer-motion` pour des animations fluides d'apparition au chargement.
 * - Fournit un champ de saisie réactif permettant de filtrer instantanément le catalogue d'événements.
 */
export default function HeroSearch({ searchQuery, setSearchQuery }: HeroSearchProps) {
  return (
    <div className="space-y-6">
      {/* SECTION HERO : TITRE, BADGE ET PHRASE D'ACCROCHE */}
      <section className="text-center space-y-4 pt-2">
        {/* BADGE ANNONCE TRANSPORT */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fodium Transport : Vos navettes officielles</span>
        </motion.div>

        {/* TITRE PRINCIPAL EN GRADIENT */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
        >
          Vos événements et trajets, <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            réunis en un seul endroit.
          </span>
        </motion.h1>

        {/* DESCRIPTION SOUS-TITRE */}
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto font-medium">
          Billets sécurisés par QR code et réservation de navettes en quelques clics.
        </p>
      </section>

      {/* BARRE DE RECHERCHE DYNAMIQUE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un événement, un lieu ou une navette..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-orange-200/80 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-lg shadow-orange-500/5 text-sm md:text-base"
          />
        </div>
      </motion.div>
    </div>
  );
}