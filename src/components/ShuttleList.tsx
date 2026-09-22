"use client";

import React from "react";
import { Bus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ShuttleCard from "./ShuttleCard";

export interface ShuttleRouteType {
  id: string;
  eventId: string;
  title: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  frequency: string;
  stopsCount: number;
  price: number;
  image: string;
  popularFor: string;
}

export const MOCK_SHUTTLES: ShuttleRouteType[] = [
  {
    id: "s1",
    eventId: "1",
    title: "Navette Express Stade Abdoulaye Wade",
    departureCity: "Dakar (Rond-point Point E)",
    arrivalCity: "Diamniadio (Stade)",
    departureTime: "14:30 & 16:00",
    frequency: "Les jours de match",
    stopsCount: 4,
    price: 3000,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    popularFor: "Match Sénégal vs Égypte",
  },
  {
    id: "s2",
    eventId: "2",
    title: "Ligne Nocturne Concerts & Festivals",
    departureCity: "Dakar Centre (Place de l'Indépendance)",
    arrivalCity: "Monument de la Renaissance",
    departureTime: "18:00 - 20:00 (Toutes les 30 min)",
    frequency: "Vendredi & Samedi",
    stopsCount: 3,
    price: 2500,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    popularFor: "Dakar Music Festival 2026",
  },
  {
    id: "s3",
    eventId: "3",
    title: "Navette Interurbaine Dakar ⇄ Saly Express",
    departureCity: "Gare des Baux Maraîchers",
    arrivalCity: "Saly Center / Station Elton",
    departureTime: "07:00, 11:00 & 16:00",
    frequency: "Tous les jours",
    stopsCount: 2,
    price: 5000,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    popularFor: "Week-end & Événements Côte Petite",
  },
];

interface ShuttleListProps {
  searchQuery: string;
}

/**
 * ShuttleList - Composant conteneur affichant la grille des navettes.
 */
export default function ShuttleList({ searchQuery }: ShuttleListProps) {
  const filteredShuttles = MOCK_SHUTTLES.filter(
    (shuttle) =>
      shuttle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shuttle.departureCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shuttle.arrivalCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shuttle.popularFor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Service Officiel Fodium Transport</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black">
            Voyagez en toute sérénité vers vos événements
          </h2>
          <p className="text-xs text-orange-100 max-w-xl">
            Place garantie, navettes climatisées, départs réguliers et sécurité renforcée avec contrôle QR Code.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bus className="w-5 h-5 text-orange-500" />
          <span>Lignes de navettes disponibles</span>
        </h3>
        <span className="text-xs text-slate-500">{filteredShuttles.length} trajet(s)</span>
      </div>

      {filteredShuttles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShuttles.map((shuttle) => (
            <motion.div
              key={shuttle.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ShuttleCard shuttle={shuttle} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
          <p className="text-slate-500 text-sm">Aucune navette ne correspond à votre recherche.</p>
        </div>
      )}
    </section>
  );
}