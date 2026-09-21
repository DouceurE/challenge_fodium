"use client";

import React, { useState } from "react";
import HeroSearch from "@/components/HeroSearch";
import CategoryFilter from "@/components/CategoryFilter";
import EventList from "@/components/EventList";

/**
 * HomePage - Page d'accueil principale de Fodium
 * 
 * Rôle :
 * 1. Sert de point d'entrée central à la plateforme.
 * 2. Maintient l'état global de recherche (`searchQuery`) et de filtrage (`filter`).
 * 3. Assemble les sous-composants modulaires (Hero, Filtres, Liste d'événements).
 */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("events");

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-10">
      {/* SECTION HERO ET RECHERCHE */}
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* FILTRE DE CATÉGORIES */}
      <CategoryFilter filter={filter} setFilter={setFilter} />
      {/* SECTION SELON LE FILTRE SÉLECTIONNÉ */}
      {filter === "events" && <EventList searchQuery={searchQuery} />}
  
    </div>
  );
}