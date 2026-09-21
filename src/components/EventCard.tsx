"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Ticket } from "lucide-react";

export interface EventType {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  ticketPrice: number;
  shuttlePrice: number;
  image: string;
  organizer?: string;
}

interface EventCardProps {
  event: EventType;
}

/**
 * EventCard - Composant d'affichage sous forme de carte pour un événement
 */
export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* IMAGE ET BADGE CATÉGORIE */}
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {event.category}
        </span>
      </div>

      {/* CONTENU DE LA CARTE */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-lg line-clamp-1">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>

        {/* PIED DE CARTE (PRIX ET BOUTON) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">À partir de</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {event.ticketPrice.toLocaleString("fr-FR")} FCFA
            </span>
          </div>

          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Réserver</span>
          </Link>
        </div>
      </div>
    </div>
  );
}