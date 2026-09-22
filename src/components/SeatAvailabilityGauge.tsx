"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Flame } from "lucide-react";

/**
 * Propriétés attendues par le composant SeatAvailabilityGauge.
 *
 * @interface SeatAvailabilityGaugeProps
 * @property {number} [totalSeats=45] - Nombre total de places dans la navette.
 * @property {number} [bookedSeats] - Nombre de places déjà réservées (calculé dynamiquement si non fourni).
 * @property {string} [stopName="Point E"] - Nom de l'arrêt de navette sélectionné.
 */
export interface SeatAvailabilityGaugeProps {
  totalSeats?: number;
  bookedSeats?: number;
  stopName?: string;
}

/**
 * Jauge de disponibilité des places de navette en temps réel.
 * 
 * S'adapte dynamiquement à l'arrêt de navette sélectionné par l'utilisateur
 * et calcule un taux de remplissage réaliste (effet d'urgence FOMO).
 *
 * @component
 * @param {SeatAvailabilityGaugeProps} props - Propriétés du composant.
 * @returns {JSX.Element} Barre de progression animée avec indicateurs de places restantes.
 */
export default function SeatAvailabilityGauge({
  totalSeats = 45,
  bookedSeats,
  stopName = "Point E",
}: SeatAvailabilityGaugeProps) {
  /**
   * Calcul dynamique et cohérent du nombre de places réservées selon le nom de l'arrêt
   * pour simuler une affluence différente et réaliste par station dakaroise.
   */
  const getDynamicBookedSeats = () => {
    if (bookedSeats !== undefined) return bookedSeats;
    
    // Simulation d'affluence basée sur la longueur de la chaîne du nom de l'arrêt
    const charCodeSum = stopName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const simulatedBooked = 30 + (charCodeSum % 14); // Entre 30 et 43 passagers
    return Math.min(totalSeats, simulatedBooked);
  };

  const currentBooked = getDynamicBookedSeats();
  const remainingSeats = Math.max(0, totalSeats - currentBooked);
  const percentage = Math.min(100, Math.round((currentBooked / totalSeats) * 100));

  /** Détermine si le bus est presque complet (seuil d'urgence à 80%) */
  const isUrgent = percentage >= 80;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white space-y-3 shadow-lg">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <Users className="w-4 h-4 text-orange-500" />
          <span>Navette depuis {stopName}</span>
        </div>

        {isUrgent ? (
          <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 font-extrabold px-2.5 py-0.5 rounded-full border border-red-500/30 text-[10px] animate-pulse">
            <Flame className="w-3 h-3" />
            <span>Plus que {remainingSeats} places !</span>
          </span>
        ) : (
          <span className="text-emerald-400 font-semibold text-[11px]">
            {remainingSeats} places disponibles
          </span>
        )}
      </div>

      {/* Barre de progression animée de la jauge */}
      <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
        <motion.div
          key={stopName} // Force l'animation de la barre à chaque changement d'arrêt
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isUrgent 
              ? "bg-gradient-to-r from-orange-500 to-red-500" 
              : "bg-gradient-to-r from-orange-600 to-orange-400"
          }`}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400">
        <span>Taux de remplissage : {percentage}%</span>
        <span>Capacité standard : {totalSeats} passagers</span>
      </div>
    </div>
  );
}