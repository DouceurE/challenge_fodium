"use client";

import React from "react";
import EventCard, { EventType } from "@/components/EventCard";

// Données unifiées et exportées pour être partagées avec la page de détail
export const MOCK_EVENTS: EventType[] = [
  {
    id: "1",
    title: "Dakar Music Festival 2026",
    category: "Concert",
    date: "Ven. 24 Nov. • 20:00",
    location: "Monument de la Renaissance, Dakar",
    ticketPrice: 15000,
    shuttlePrice: 3500,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  },
  {
    id: "2",
    title: "Gala Stand-Up & Rire",
    category: "Humour",
    date: "Sam. 02 Déc. • 19:30",
    location: "Théâtre National Daniel Sorano, Dakar",
    ticketPrice: 10000,
    shuttlePrice: 2500,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
  },
  {
    id: "3",
    title: "Match Sénégal vs Égypte",
    category: "Sport",
    date: "Jeu. 14 Déc. • 17:00",
    location: "Stade Abdoulaye Wade, Diamniadio",
    ticketPrice: 5000,
    shuttlePrice: 3000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
  },
];

interface EventListProps {
  searchQuery: string;
}

/**
 * EventList - Grille de cartes d'événements
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