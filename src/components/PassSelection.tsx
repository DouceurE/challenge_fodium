"use client";

import React from "react";
import { Bus, Ticket, Plus, Minus, Check } from "lucide-react";

/**
 * Représente un arrêt de navette Fodium Transport.
 *
 * @interface ShuttleStop
 * @property {string} id - Identifiant unique de l'arrêt.
 * @property {string} name - Nom lisible de l'arrêt.
 * @property {number} price - Prix supplémentaire associé à cet arrêt (généralement 0 FCFA si inclus dans la formule combo).
 */
export interface ShuttleStop {
  id: string;
  name: string;
  price: number;
}

/**
 * Interface des propriétés du composant PassSelection.
 *
 * @interface PassSelectionProps
 * @property {number} ticketPrice - Prix unitaire du billet d'entrée seul.
 * @property {number} shuttlePrice - Prix unitaire du service de navette.
 * @property {"single" | "combo"} passType - Type de pass sélectionné ("single" pour billet seul, "combo" pour billet + navette).
 * @property {(type: "single" | "combo") => void} setPassType - Fonction de mise à jour du type de pass.
 * @property {ShuttleStop} selectedStop - Arrêt de navette actuellement sélectionné.
 * @property {(stop: ShuttleStop) => void} setSelectedStop - Fonction de mise à jour de l'arrêt de navette sélectionné.
 * @property {ShuttleStop[]} shuttleStops - Liste des arrêts de navette disponibles.
 * @property {number} quantity - Nombre de places sélectionnées.
 * @property {React.Dispatch<React.SetStateAction<number>> | ((qty: number) => void)} setQuantity - Fonction de mise à jour de la quantité de places.
 */
export interface PassSelectionProps {
  ticketPrice: number;
  shuttlePrice: number;
  passType: "single" | "combo";
  setPassType: (type: "single" | "combo") => void;
  selectedStop: ShuttleStop;
  setSelectedStop: (stop: ShuttleStop) => void;
  shuttleStops: ShuttleStop[];
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>> | ((qty: number) => void);
}

/**
 * Composant de sélection de formule de Pass (Billet seul ou Billet + Navette) et du nombre de places.
 *
 * Permet à l'utilisateur d'opter pour une formule combinée avec transport, de choisir
 * son point de ramassage et d'ajuster le nombre de billets souhaités.
 *
 * @component
 * @param {PassSelectionProps} props - Propriétés fournies au composant.
 * @returns {JSX.Element} Le bloc interactif de sélection de pass et d'options.
 */
export const PassSelection: React.FC<PassSelectionProps> = ({
  ticketPrice,
  shuttlePrice,
  passType,
  setPassType,
  selectedStop,
  setSelectedStop,
  shuttleStops,
  quantity,
  setQuantity,
}) => {
  /**
   * Incrémente ou décrémente la quantité de places réservées.
   *
   * @param {number} delta - La variation à appliquer (+1 ou -1).
   */
  const handleQuantityChange = (delta: number) => {
    const nextValue = Math.max(1, quantity + delta);
    setQuantity(nextValue);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-white space-y-6">
      {/* SECTION 1 : CHOIX DE LA FORMULE */}
      <div>
        <h2 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-4">
          1. Choisissez votre formule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* OPTION : BILLET SEUL */}
          <button
            type="button"
            onClick={() => setPassType("single")}
            className={`p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer ${
              passType === "single"
                ? "border-orange-500 bg-orange-500/10 text-white"
                : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <Ticket className={`w-6 h-6 ${passType === "single" ? "text-orange-500" : "text-slate-500"}`} />
              {passType === "single" && (
                <span className="p-1 rounded-full bg-orange-500 text-slate-950">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Billet Seul</h3>
              <p className="text-xs text-slate-400 mt-1">Accès simple à l'événement sans transport.</p>
            </div>
            <div className="text-xl font-black text-white">
              {ticketPrice.toLocaleString("fr-FR")} FCFA
            </div>
          </button>

          {/* OPTION : COMBO BILLET + NAVETTE */}
          <button
            type="button"
            onClick={() => setPassType("combo")}
            className={`p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between space-y-3 relative cursor-pointer ${
              passType === "combo"
                ? "border-orange-500 bg-orange-500/10 text-white"
                : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
            }`}
          >
            <span className="absolute -top-3 right-4 bg-orange-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Recommandé
            </span>
            <div className="flex items-center justify-between w-full">
              <Bus className={`w-6 h-6 ${passType === "combo" ? "text-orange-500" : "text-slate-500"}`} />
              {passType === "combo" && (
                <span className="p-1 rounded-full bg-orange-500 text-slate-950">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Billet + Navette</h3>
              <p className="text-xs text-slate-400 mt-1">Accès événement + trajet aller-retour en navette.</p>
            </div>
            <div className="text-xl font-black text-white">
              {(ticketPrice + shuttlePrice).toLocaleString("fr-FR")} FCFA
            </div>
          </button>
        </div>
      </div>

      {/* SECTION 2 : SÉLECTION DE L'ARRÊT DE NAVETTE (Affiché si combo) */}
      {passType === "combo" && (
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold text-orange-500 uppercase tracking-wider">
            2. Point de ramassage Navette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shuttleStops.map((stop) => {
              const isSelected = selectedStop.id === stop.id;
              return (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => setSelectedStop(stop)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "border-orange-500 bg-orange-500/20 text-white font-bold"
                      : "border-slate-800 bg-slate-800/20 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="truncate">📍 {stop.name}</span>
                  {stop.price > 0 && (
                    <span className="text-[10px] text-orange-400 font-extrabold ml-2">
                      +{stop.price.toLocaleString("fr-FR")} FCFA
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3 : SÉLECTION DU NOMBRE DE PLACES */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Quantité
          </span>
          <span className="text-xs text-slate-500">Nombre de pass à réserver</span>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-white"
            aria-label="Diminuer la quantité"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-black text-lg text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="w-8 h-8 rounded-xl bg-orange-500 hover:bg-orange-400 flex items-center justify-center transition-colors text-slate-950 font-bold"
            aria-label="Augmenter la quantité"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};