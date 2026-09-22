"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CreditCard, Lock, X } from "lucide-react";
import { SlideToPay } from "./SlideToPay";
import { AnimatedPrice } from "./AnimatedPrice";
import SuccessTicketCard from "./SuccessTicketCard";

/**
 * Interface définissant les propriétés attendues par la modale de checkout.
 * Alignée avec l'appel effectif dans `src/app/events/[id]/page.tsx`.
 *
 * @interface CheckoutModalProps
 * @property {boolean} isOpen - Indique si la modale est ouverte.
 * @property {() => void} onClose - Callback pour fermer la modale.
 * @property {string} eventTitle - Titre officiel de l'événement réservé.
 * @property {string} ticketType - Libellé de la formule (ex: "Pass Combiné (Billet + Navette)" ou "Billet Seul").
 * @property {string} [shuttleStop] - Nom de l'arrêt de navette sélectionné (optionnel).
 * @property {number} totalPrice - Montant total du panier en FCFA.
 * @property {string} [eventId] - Identifiant unique de l'événement.
 */
export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  ticketType: string;
  shuttleStop?: string;
  totalPrice: number;
  eventId?: string;
}

/**
 * Composant Modale de Checkout Express avec validation par glissement (`SlideToPay`).
 *
 * Orchestre l'ensemble du parcours de règlement :
 * - Sélection dynamique de la méthode de paiement (Wave, Orange Money, Carte Bancaire).
 * - Saisie des informations client et détection d'opérateur mobile.
 * - Validation sécurisée par glissement (action tactile fluide).
 * - Transition dynamique vers la carte de confirmation et le QR Code (`SuccessTicketCard`).
 *
 * @component
 * @param {CheckoutModalProps} props - Propriétés d'initialisation de la modale.
 * @returns {JSX.Element | null} Overlay de paiement ou `null` si fermé.
 */
export function CheckoutModal({
  isOpen,
  onClose,
  eventTitle,
  ticketType,
  shuttleStop,
  totalPrice,
  eventId = "FD-EVT-2026",
}: CheckoutModalProps) {
  /** Méthode de paiement actuellement sélectionnée ("wave" | "om" | "card") */
  const [method, setMethod] = useState<"wave" | "om" | "card">("wave");

  /** Numéro de téléphone saisi pour Wave / Orange Money */
  const [phone, setPhone] = useState<string>("");

  /** Données de saisie de la carte bancaire */
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvc, setCardCvc] = useState<string>("");

  /** État de validation de la transaction */
  const [isPaid, setIsPaid] = useState<boolean>(false);

  /**
   * Détection automatique de l'opérateur mobile au Sénégal selon le préfixe saisi.
   */
  useEffect(() => {
    const cleanPhone = phone.replace(/\s+/g, "");
    if (cleanPhone.startsWith("77") || cleanPhone.startsWith("78")) {
      setMethod("om");
    } else if (cleanPhone.startsWith("76")) {
      setMethod("wave");
    }
  }, [phone]);

  /**
   * Callback déclenché lors du glissement complet de `SlideToPay`.
   */
  const handlePaymentSuccess = () => {
    setIsPaid(true);
  };

  /**
   * Réinitialise le formulaire et ferme la modale.
   */
  const handleResetAndClose = () => {
    setIsPaid(false);
    setPhone("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    onClose();
  };

  /**
   * Condition de déverrouillage de la glissière `SlideToPay`.
   */
  const isFormValid =
    method === "card"
      ? cardNumber.trim().length >= 12 &&
        cardExpiry.trim().length >= 4 &&
        cardCvc.trim().length >= 3
      : phone.trim().length >= 8;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
        {/* Fond de fermeture au clic extérieur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="absolute inset-0"
        />

        {/* Conteneur principal de la Modale */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 overflow-hidden text-white"
        >
          {/* Poignée ergonomique pour mobile */}
          <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-5 sm:hidden" />

          {!isPaid ? (
            <div>
              {/* En-tête */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-wider block">
                    Paiement Express
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {eventTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Fermer la fenêtre"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Récapitulatif Tarifaire */}
              <div className="bg-slate-800/80 rounded-2xl p-4 mb-5 border border-slate-700/80 shadow-inner">
                <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                  <span>Type de Pass :</span>
                  <span className="font-bold text-white">{ticketType}</span>
                </div>
                {shuttleStop && (
                  <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                    <span>Arrêt Navette :</span>
                    <span className="text-orange-400 font-bold">📍 {shuttleStop}</span>
                  </div>
                )}
                <div className="border-t border-slate-700/80 my-2 pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-slate-200 text-sm">Total à payer</span>
                  <div className="text-2xl font-black text-orange-400">
                    <AnimatedPrice value={totalPrice} className="text-2xl font-black text-orange-400" />
                  </div>
                </div>
              </div>

              {/* 1. Choix du mode de règlement */}
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Sélectionnez la méthode de paiement
              </label>
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                <button
                  type="button"
                  onClick={() => setMethod("wave")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    method === "wave"
                      ? "border-sky-400 bg-sky-500/10 text-white shadow-lg shadow-sky-500/10"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="font-extrabold text-sky-400">Wave</span>
                  <span className="text-[10px] opacity-80 text-slate-400">0% de frais</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("om")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    method === "om"
                      ? "border-orange-500 bg-orange-500/10 text-white shadow-lg shadow-orange-500/10"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="font-extrabold text-orange-500">Orange</span>
                  <span className="text-[10px] opacity-80 text-slate-400">Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    method === "card"
                      ? "border-emerald-500 bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/10"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="font-extrabold text-emerald-400">Carte</span>
                  <span className="text-[10px] opacity-80 text-slate-400">Visa/MC</span>
                </button>
              </div>

              {/* 2. Saisie des coordonnées */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  2. Saisissez vos coordonnées
                </label>

                {method !== "card" ? (
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="77 000 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono text-sm transition-colors"
                    />
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Numéro de carte (16 chiffres)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white placeholder-slate-500 text-center focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <div className="relative flex items-center">
                        <input
                          type="password"
                          placeholder="CVC"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-3 pr-8 py-3 text-xs text-white placeholder-slate-500 text-center focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Confirmation par glissement (`SlideToPay`) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  3. Glissez pour valider le paiement
                </label>
                <SlideToPay
                  amount={totalPrice}
                  onSuccess={handlePaymentSuccess}
                  disabled={!isFormValid}
                />
              </div>
            </div>
          ) : (
            /* Affichage du Ticket & QR Code une fois glissé */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-2"
            >
              <SuccessTicketCard
                passType={ticketType.includes("Combiné") ? "combo" : "single"}
                stop={shuttleStop || "N/A"}
                paymentMethod={method}
                eventId={eventId}
              />
              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs transition-colors border border-slate-700 cursor-pointer"
              >
                Fermer
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CheckoutModal;