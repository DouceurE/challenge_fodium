"use client";

import { useState } from "react";
import HeroSearch from "@/components/HeroSearch";
import CategoryFilter from "@/components/CategoryFilter";
import EventList from "@/components/EventList";
import ShuttleList from "@/components/ShuttleList";

/**
 * HomePage - Composant de la page d'accueil principale de Fodium (`/`).
 * 
 * Rôle & Caractéristiques :
 * - Sert de point d'entrée central à l'application billetterie et transport.
 * - Maintient les états locaux de recherche (`searchQuery`) et de filtrage (`filter`).
 * - Orchestre l'affichage dynamique des sous-composants modulaires (`HeroSearch`, `CategoryFilter`, `EventList`, `ShuttleList`).
 */
export default function HomePage() {
  /** Terme de recherche saisi dans la barre HeroSearch */
  const [searchQuery, setSearchQuery] = useState("");
  
  /** Filtre d'affichage actif ('events' pour la liste d'événements, 'transport' pour la vue navette) */
  const [filter, setFilter] = useState("events");

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-10 py-6">
      {/* SECTION HERO ET BARRE DE RECHERCHE UNIFIÉE */}
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* FILTRE DE CATÉGORIES PRINCIPALES */}
      <CategoryFilter filter={filter} setFilter={setFilter} />

      {/* AFFICHAGE CONDITIONNEL EN FONCTION DU FILTRE SÉLECTIONNÉ */}
      {filter === "events" ? (
        <EventList searchQuery={searchQuery} />
      ) : (
        <ShuttleList searchQuery={searchQuery} />
      )}
    </div>
  );
}