"use client";

import React from "react";
import EventCard, { EventType } from "@/components/EventCard";

// Données fictives pour tester l'affichage
const MOCK_EVENTS: EventType[] = [
  {
    id: "1",
    title: "Concert Live Afrobeats",
    category: "Musique",
    date: "Ven. 24 Nov. • 20:00",
    location: "Monument de la Renaissance, Dakar",
    price: "10 000 FCFA",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  },
  {
    id: "2",
    title: "Match Gala de Lutte",
    category: "Sport",
    date: "Sam. 02 Déc. • 16:30",
    location: "Arène Nationale, Pikine",
    price: "5 000 FCFA",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  },
  {
    id: "3",
    title: "Festival Tech & Innovation",
    category: "Conférence",
    date: "Jeu. 14 Déc. • 09:00",
    location: "King Fahd Palace, Dakar",
    price: "Gratuit",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
];

interface EventListProps {
  searchQuery: string;
}

/**
 * EventList - Grille de cartes d'événements
 * 
 * Rôle :
 * 1. Affiche la liste dynamique des événements filtrés par le terme de recherche.
 * 2. Gère l'état vide si aucun résultat n'est trouvé.
 */
export default function EventList({ searchQuery }: EventListProps) {
  const filteredEvents = MOCK_EVENTS.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Événements à venir</h2>
        <span className="text-xs text-slate-500">{filteredEvents.length} disponible(s)</span>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-sm">Aucun événement ne correspond à votre recherche.</p>
        </div>
      )}
    </section>
  );
}