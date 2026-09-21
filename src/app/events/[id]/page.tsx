"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Bus, Check, ArrowRight, Info, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_EVENTS } from "@/components/EventList";

/**
 * Liste des arrêts stratégiques desservis par les navettes Fodium Transport.
 */
const SHUTTLE_STOPS = [
  "Rond-point Point E (Dakar)",
  "Station Elton Keur Massar",
  "Rond-point VDN2 / Yoff",
  "Pikine Technopole",
  "Gare des Baux Maraîchers",
];

/**
 * Page de détails dynamique de l'événement (`/events/[id]`).
 * 
 * Rôle & Caractéristiques :
 * - Extrait l'identifiant d'événement dynamiquement via les paramètres de route (`use(params)`).
 * - Permet de basculer entre l'option "Billet Seul" et le "Pass Combiné (Billet + Navette)".
 * - Intègre la sélection du point de ramassage de navette avec mise à jour interactive.
 * - Propose un compteur de quantité réactif (+ / -) recalculant instantanément le prix total.
 * - Redirige vers le tunnel de paiement `/checkout` en transmettant la configuration complète via URL params.
 */
export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  // Résolution asynchrone des paramètres (Next.js App Router)
  const resolvedParams = use(params);
  const eventId = resolvedParams.id || "1";

  // Récupération dynamique de l'événement ou repli par défaut sur le premier élément
  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  // ÉTATS REACT LOCAUX POUR LE PANIER
  const [passType, setPassType] = useState<"single" | "combo">("combo");
  const [selectedStop, setSelectedStop] = useState(SHUTTLE_STOPS[0]);
  const [quantity, setQuantity] = useState(1);

  // LOGIQUE DE CALCUL DU PRIX TOTAL
  const basePrice = event.ticketPrice;
  const shuttlePrice = passType === "combo" ? event.shuttlePrice : 0;
  const unitPrice = basePrice + shuttlePrice;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8 py-6">
      {/* BOUTON DE RETOUR VERS LA LISTE PRINCIPALE */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors"
      >
        ← Retour aux événements
      </Link>

      {/* BANNIÈRE DE PRÉSENTATION DE L'ÉVÉNEMENT */}
      <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
        <Image 
          src={event.image} 
          alt={event.title} 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white space-y-2">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/20 w-fit px-3 py-1 rounded-full border border-orange-500/30">
            {event.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULAIRE DE CONFIGURATION DE LA FORMULE */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">
            Choisissez votre formule d'accès
          </h2>
          <p className="text-xs text-slate-500">
            Sélectionnez votre billet et ajoutez la navette officielle Fodium Transport.
          </p>
        </div>

        {/* SÉLECTEUR BASSIN : BILLET SEUL vs PASS COMBINÉ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPassType("single")}
            className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-4 ${
              passType === "single"
                ? "border-orange-500 bg-orange-500/5 ring-2 ring-orange-500/20"
                : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Billet Seul</h3>
                <p className="text-xs text-slate-500 mt-0.5">Accès simple à l'événement</p>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                passType === "single" ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300"
              }`}>
                {passType === "single" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
            <div className="text-base font-black text-slate-900">
              {event.ticketPrice.toLocaleString("fr-FR")} FCFA
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPassType("combo")}
            className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-4 ${
              passType === "combo"
                ? "border-orange-500 bg-orange-500/5 ring-2 ring-orange-500/20"
                : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
            }`}
          >
            <span className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
              Pass Combiné Populaire
            </span>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-base">Billet + Navette</h3>
                  <Bus className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Trajet aller-retour garanti</p>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                passType === "combo" ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300"
              }`}>
                {passType === "combo" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-slate-900">
                {(event.ticketPrice + event.shuttlePrice).toLocaleString("fr-FR")} FCFA
              </span>
              <span className="text-[10px] text-orange-600 font-semibold bg-orange-100 px-1.5 py-0.5 rounded">
                + {event.shuttlePrice.toLocaleString("fr-FR")} FCFA navette
              </span>
            </div>
          </button>
        </div>

        {/* CHOIX DU POINT DE RAMASSAGE DES NAVETTES (ANIMÉ VIA FRAMER MOTION) */}
        <AnimatePresence>
          {passType === "combo" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-2 border-t border-slate-100 overflow-hidden"
            >
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-orange-500" />
                <span>Sélectionnez votre point de départ pour la navette :</span>
              </label>

              <select
                value={selectedStop}
                onChange={(e) => setSelectedStop(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-sm focus:outline-none focus:border-orange-500 transition-all"
              >
                {SHUTTLE_STOPS.map((stop) => (
                  <option key={stop} value={stop}>
                    {stop}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-[11px] text-amber-800 font-medium">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Départ prévu 2h avant le début de l'événement. Votre billet inclut le retour.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPTEUR DE QUANTITÉ DYNAMIQUE */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-sm font-bold text-slate-800">Nombre de places :</span>
          <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-1.5 bg-white rounded-lg hover:bg-slate-200 transition-colors text-slate-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-slate-900 px-2 text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-1.5 bg-white rounded-lg hover:bg-slate-200 transition-colors text-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* BANDEAU RÉCAPITULATIF & REDIRECTION VERS PAIEMENT */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left w-full md:w-auto">
          <span className="text-xs text-slate-400 font-medium block">
            Récapitulatif ({quantity} {quantity > 1 ? "places" : "place"})
          </span>
          <div className="text-2xl font-black text-orange-400">
            {totalPrice.toLocaleString("fr-FR")} FCFA
          </div>
          <p className="text-[11px] text-slate-400">
            {passType === "combo" ? `Billet + Navette depuis ${selectedStop}` : "Billet seul sans transport"}
          </p>
        </div>

        <Link
          href={`/checkout?event=${eventId}&type=${passType}&stop=${encodeURIComponent(selectedStop)}&quantity=${quantity}&total=${totalPrice}`}
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/20"
        >
          <span>Continuer vers le paiement</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}