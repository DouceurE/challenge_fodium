"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { ShuttleRouteType } from "./ShuttleList";

interface ShuttleCardProps {
  shuttle: ShuttleRouteType;
}

/**
 * Composant carte de navette.
 * Redirige directement vers le tunnel de réservation de l'événement associé.
 */
export default function ShuttleCard({ shuttle }: ShuttleCardProps) {
  const router = useRouter();

  const handleReserveClick = () => {
    // Redirection directe vers la page de paiement / réservation de l'événement
    router.push(`/events/${shuttle.eventId}`);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative h-44 w-full bg-slate-100">
        <Image 
          src={shuttle.image} 
          alt={shuttle.title} 
          fill 
          className="object-cover" 
          unoptimized
        />
        <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 text-[10px] font-extrabold px-3 py-1 rounded-full border border-orange-500/30">
          {shuttle.popularFor}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-900 text-base line-clamp-1">{shuttle.title}</h4>

          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{shuttle.departureCity}</span>
                <span className="text-[10px] text-slate-400">➔ {shuttle.arrivalCity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{shuttle.departureTime}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Aller-Retour</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {shuttle.price.toLocaleString("fr-FR")} FCFA
            </span>
          </div>

          <button
            type="button"
            onClick={handleReserveClick}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>Réserver</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>
      </div>
    </div>
  );
}