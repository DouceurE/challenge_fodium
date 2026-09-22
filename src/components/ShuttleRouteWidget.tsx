"use client";

import React, { useMemo, useState, useEffect } from "react";
import { 
  Bus, 
  Clock, 
  MapPin, 
  Navigation, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShuttleStop } from "./PassSelection";

/**
 * Propriétés attendues par le composant ShuttleRouteWidget.
 *
 * @interface ShuttleRouteWidgetProps
 * @property {ShuttleStop} selectedStop - L'objet arrêt actuellement sélectionné.
 * @property {(stop: ShuttleStop) => void} setSelectedStop - Fonction de mise à jour de l'arrêt dans le parent.
 * @property {ShuttleStop[]} shuttleStops - Liste complète des arrêts disponibles.
 * @property {string} destination - Nom du lieu de destination finale.
 */
export interface ShuttleRouteWidgetProps {
  selectedStop: ShuttleStop;
  setSelectedStop: (stop: ShuttleStop) => void;
  shuttleStops: ShuttleStop[];
  destination: string;
}

/**
 * Métriques de simulation pour chaque arrêt de Dakar (temps de base, distance, waypoints).
 */
const STOP_METRICS: Record<string, { baseMinutes: number; distanceKm: number; zone: string; waypoints: string[] }> = {
  "Rond-point Point E (Dakar)": { baseMinutes: 35, distanceKm: 14.2, zone: "Dakar Plateau / Fann", waypoints: ["Point E", "Avenue Cheikh Anta Diop", "Autoroute A1"] },
  "Station Elton Keur Massar": { baseMinutes: 45, distanceKm: 18.5, zone: "Banlieue Est", waypoints: ["Keur Massar", "Péage Keur Massar", "Autoroute A1"] },
  "Rond-point VDN2 / Yoff": { baseMinutes: 30, distanceKm: 11.0, zone: "Dakar Nord", waypoints: ["Yoff", "Voie Dégagement Nord", "Autoroute A1"] },
  "Pikine Technopole": { baseMinutes: 25, distanceKm: 9.5, zone: "Grande Banlieue", waypoints: ["Pikine Technopole", "Rond-point Cambérène", "Autoroute A1"] },
  "Gare des Baux Maraîchers": { baseMinutes: 30, distanceKm: 12.0, zone: "Pikine / Hann", waypoints: ["Baux Maraîchers", "Hann Maristes", "Autoroute A1"] },
};

/**
 * Composant de simulation du trajet de navette Fodium et du trafic en temps réel.
 * Se synchronise instantanément avec la sélection faite dans le formulaire de la page.
 *
 * @component
 * @param {ShuttleRouteWidgetProps} props - Propriétés du composant.
 * @returns {JSX.Element | null} Le widget interactif ou null si non monté (sécurité SSR).
 */
export default function ShuttleRouteWidget({ 
  selectedStop, 
  setSelectedStop, 
  shuttleStops,
  destination 
}: ShuttleRouteWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [departureTime, setDepartureTime] = useState<string>("16:30");

  // Sécurité pour éviter les erreurs d'hydratation SSR sous Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Récupère les métriques de trafic et de distance propres à l'arrêt actuellement sélectionné.
   */
  const currentStopDetails = useMemo(() => {
    return STOP_METRICS[selectedStop.name] || {
      baseMinutes: 30,
      distanceKm: 12.0,
      zone: "Dakar",
      waypoints: [selectedStop.name, "Autoroute A1"]
    };
  }, [selectedStop]);

  /**
   * Calcule l'impact du trafic en fonction de l'heure de départ choisie.
   */
  const trafficImpact = useMemo(() => {
    const [hours] = departureTime.split(":").map(Number);
    if (hours >= 17 && hours <= 19) {
      return { multiplier: 1.4, status: "Densité Élevée", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" };
    }
    if (hours > 19 && hours <= 21) {
      return { multiplier: 1.1, status: "Fluidité Moyenne", color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" };
    }
    return { multiplier: 1.0, status: "Fluide", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" };
  }, [departureTime]);

  // Durée estimée finale du trajet
  const estimatedMinutes = Math.round(currentStopDetails.baseMinutes * trafficImpact.multiplier);

  /**
   * Calcule l'heure d'arrivée estimée.
   */
  const arrivalTime = useMemo(() => {
    const [hours, minutes] = departureTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + estimatedMinutes;
    const arrHours = Math.floor(totalMinutes / 60) % 24;
    const arrMinutes = totalMinutes % 60;
    return `${String(arrHours).padStart(2, "0")}:${String(arrMinutes).padStart(2, "0")}`;
  }, [departureTime, estimatedMinutes]);

  // Calcul du CO2 économisé
  const co2SavedKg = (currentStopDetails.distanceKm * 0.12).toFixed(1);

  /**
   * Génère les étapes de l'itinéraire.
   */
  const fullWaypoints = useMemo(() => {
    return [selectedStop.name, ...currentStopDetails.waypoints.slice(1), destination || "Site Événement"];
  }, [selectedStop, currentStopDetails, destination]);

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl space-y-6 max-w-2xl mx-auto"
    >
      {/* En-tête du widget */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 text-orange-600 rounded-2xl">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Simulateur de Navette Fodium</h3>
            <p className="text-xs text-slate-500">
              Trajet estimé depuis <span className="font-bold text-slate-700">{selectedStop.name}</span>
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5" /> Service Officiel
        </span>
      </div>

      {/* Menus déroulants (Point de départ synchronisé + Heure) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-500" /> Point de départ :
          </label>
          <select
            value={selectedStop.id}
            onChange={(e) => {
              const found = shuttleStops.find((s) => s.id === e.target.value);
              if (found) {
                setSelectedStop(found);
              }
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
          >
            {shuttleStops.map((stop) => (
              <option key={stop.id} value={stop.id}>
                📍 {stop.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-500" /> Heure de départ souhaitée :
          </label>
          <select
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
          >
            <option value="15:30">15:30 (Départ anticipé)</option>
            <option value="16:30">16:30 (Recommandé)</option>
            <option value="17:30">17:30 (Heure de pointe)</option>
            <option value="18:30">18:30 (Heure de pointe)</option>
            <option value="19:30">19:30 (Dernière navette)</option>
          </select>
        </div>
      </div>

      {/* Tableau de bord des résultats dynamiques */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${selectedStop.id}-${departureTime}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-950 text-white rounded-2xl p-5 space-y-4 shadow-lg relative overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-2 text-center border-b border-slate-800 pb-4">
            <div>
              <span className="block text-[10px] text-slate-400 font-medium">Départ</span>
              <span className="text-lg font-black text-white">{departureTime}</span>
            </div>

            <div className="border-x border-slate-800">
              <span className="block text-[10px] text-slate-400 font-medium">Durée estimée</span>
              <span className="text-lg font-black text-orange-400">{estimatedMinutes} min</span>
            </div>

            <div>
              <span className="block text-[10px] text-slate-400 font-medium">Arrivée estimée</span>
              <span className="text-lg font-black text-emerald-400">{arrivalTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center text-xs pt-1 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">État du trafic :</span>
              <span className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] border ${trafficImpact.bg} ${trafficImpact.color}`}>
                {trafficImpact.status}
              </span>
            </div>

            <div className="text-slate-400 text-[11px]">
              🌱 Impact : <span className="text-emerald-400 font-bold">-{co2SavedKg} kg CO₂</span> économisés
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Itinéraire étape par étape */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-orange-500" /> Itinéraire étape par étape :
        </h4>

        <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-200">
          {fullWaypoints.map((step, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === fullWaypoints.length - 1;

            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative flex items-center justify-between text-xs"
              >
                <div
                  className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white ${
                    isLast
                      ? "border-emerald-500 text-emerald-500"
                      : isFirst
                      ? "border-orange-500 text-orange-500"
                      : "border-slate-300 text-slate-300"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isLast ? "bg-emerald-500" : isFirst ? "bg-orange-500" : "bg-slate-300"}`} />
                </div>

                <span className={`font-semibold ${isLast ? "text-emerald-700 font-bold" : isFirst ? "text-slate-900 font-bold" : "text-slate-600"}`}>
                  {step}
                </span>

                {isFirst && (
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    Embarquement
                  </span>
                )}
                {isLast && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Terminus
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}