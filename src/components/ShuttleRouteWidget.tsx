"use client";

import React, { useMemo } from "react";
import { 
  Bus, 
  Clock, 
  MapPin, 
  Navigation, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Interface représentant la structure d'un arrêt de navette.
 * 
 * @interface ShuttleStop
 * @property {string} id - Identifiant unique de l'arrêt.
 * @property {string} name - Nom de l'arrêt de bus/navette.
 * @property {string} zone - Zone géographique dans la région de Dakar.
 * @property {number} baseMinutes - Temps de trajet de base en minutes jusqu'au site.
 * @property {number} distanceKm - Distance estimée en kilomètres.
 * @property {string[]} waypoints - Étapes intermédiaires du trajet.
 */
export interface ShuttleStop {
  id: string;
  name: string;
  zone: string;
  baseMinutes: number;
  distanceKm: number;
  waypoints: string[];
}

/**
 * Interface des propriétés du composant ShuttleRouteWidget.
 * 
 * @interface ShuttleRouteWidgetProps
 * @property {string} pickupStop - Nom de l'arrêt de ramassage sélectionné par l'utilisateur.
 * @property {string} destination - Lieu de destination finale (ex: nom de la salle ou du stade).
 */
export interface ShuttleRouteWidgetProps {
  pickupStop: string;
  destination: string;
}

/** Liste de référence des points de ramassage Fodium à Dakar */
const SHUTTLE_STOPS: ShuttleStop[] = [
  {
    id: "pointe-e",
    name: "Rond-point Point E (Dakar)",
    zone: "Dakar Plateau / Fann",
    baseMinutes: 35,
    distanceKm: 14.2,
    waypoints: ["Point E", "Avenue Cheikh Anta Diop", "Autoroute A1"],
  },
  {
    id: "keur-massar",
    name: "Station Elton Keur Massar",
    zone: "Banlieue Est",
    baseMinutes: 45,
    distanceKm: 18.5,
    waypoints: ["Keur Massar", "Péage Keur Massar", "Autoroute A1"],
  },
  {
    id: "yoff",
    name: "Rond-point VDN2 / Yoff",
    zone: "Dakar Nord",
    baseMinutes: 30,
    distanceKm: 11.0,
    waypoints: ["Yoff", "Voie Dégagement Nord", "Autoroute A1"],
  },
  {
    id: "pikine",
    name: "Pikine Technopole",
    zone: "Grande Banlieue",
    baseMinutes: 25,
    distanceKm: 9.5,
    waypoints: ["Pikine Technopole", "Rond-point Cambérène", "Autoroute A1"],
  },
  {
    id: "baux-maraichers",
    name: "Gare des Baux Maraîchers",
    zone: "Pikine / Hann",
    baseMinutes: 30,
    distanceKm: 12.0,
    waypoints: ["Baux Maraîchers", "Hann Maristes", "Autoroute A1"],
  },
];

/**
 * Composant interactif d'estimation d'itinéraire et de simulation de trajet pour les navettes Fodium.
 * Se synchronise automatiquement avec l'arrêt choisi dans la page parente.
 *
 * @component
 * @param {ShuttleRouteWidgetProps} props - Propriétés transmises par la page parente.
 * @returns {JSX.Element} Le widget de simulation d'itinéraire.
 */
export default function ShuttleRouteWidget({ 
  pickupStop, 
  destination 
}: ShuttleRouteWidgetProps) {
  /** Heure de départ sélectionnée (format "HH:MM") */
  const [departureTime, setDepartureTime] = React.useState<string>("16:30");

  /** 
   * Recherche dynamique de l'arrêt correspondant à la prop `pickupStop` reçue du parent.
   */
  const currentStop = useMemo(() => {
    const found = SHUTTLE_STOPS.find(
      (s) => s.name.toLowerCase().includes(pickupStop.toLowerCase()) || 
             pickupStop.toLowerCase().includes(s.name.toLowerCase())
    );
    return found || SHUTTLE_STOPS[0];
  }, [pickupStop]);

  /** 
   * Modélisation de la densité du trafic selon l'heure de départ.
   */
  const trafficImpact = useMemo(() => {
    const [hours] = departureTime.split(":").map(Number);
    
    // Heures de pointe à Dakar (17h - 19h)
    if (hours >= 17 && hours <= 19) {
      return { multiplier: 1.4, status: "Densité Élevée", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" };
    }
    // Début de soirée (19h - 21h)
    if (hours > 19 && hours <= 21) {
      return { multiplier: 1.1, status: "Fluidité Moyenne", color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" };
    }
    // Heures creuses
    return { multiplier: 1.0, status: "Fluide", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" };
  }, [departureTime]);

  /** Durée finale estimée du trajet en minutes */
  const estimatedMinutes = Math.round(currentStop.baseMinutes * trafficImpact.multiplier);

  /** Calcul de l'heure d'arrivée estimée */
  const arrivalTime = useMemo(() => {
    const [hours, minutes] = departureTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + estimatedMinutes;
    const arrHours = Math.floor(totalMinutes / 60) % 24;
    const arrMinutes = totalMinutes % 60;
    return `${String(arrHours).padStart(2, "0")}:${String(arrMinutes).padStart(2, "0")}`;
  }, [departureTime, estimatedMinutes]);

  /** Économie de CO2 estimée */
  const co2SavedKg = (currentStop.distanceKm * 0.12).toFixed(1);

  /** Construction de l'itinéraire complet comprenant les waypoints et le terminus */
  const fullWaypoints = useMemo(() => {
    return [currentStop.name, ...currentStop.waypoints.slice(1), destination || "Site Événement"];
  }, [currentStop, destination]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl space-y-6 max-w-2xl mx-auto"
    >
      {/* EN-TÊTE DU WIDGET */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 text-orange-600 rounded-2xl">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Simulateur de Navette Fodium</h3>
            <p className="text-xs text-slate-500">
              Trajet estimé depuis <span className="font-bold text-slate-700">{currentStop.name}</span>
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5" /> Service Officiel
        </span>
      </div>

      {/* SÉLECTEUR D'HORAIRE DE DÉPART */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-500" /> Point de départ actif :
          </label>
          <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>📍 {currentStop.name}</span>
            <span className="text-[10px] text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md font-extrabold">{currentStop.zone}</span>
          </div>
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

      {/* TABLEAU DE BORD DES RÉSULTATS DYNAMIQUES */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${currentStop.id}-${departureTime}`}
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

      {/* ÉTAPES CLÉS DE L'ITINÉRAIRE */}
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