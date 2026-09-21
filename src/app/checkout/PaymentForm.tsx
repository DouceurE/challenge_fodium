"use client";

import React from "react";
import { ShieldCheck, Smartphone, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentFormProps {
  /** Type de formule sélectionnée ('combo' ou 'single') */
  passType: string;
  /** Nom de l'arrêt de navette sélectionné */
  stop: string;
  /** Montant total à payer transmis par l'URL */
  total: string;
  /** Méthode de paiement actuellement sélectionnée */
  paymentMethod: "wave" | "om" | "card";
  /** Callback pour mettre à jour la méthode de paiement */
  setPaymentMethod: (method: "wave" | "om" | "card") => void;
  /** Numéro de téléphone saisi */
  phoneNumber: string;
  /** Callback pour mettre à jour le numéro de téléphone */
  setPhoneNumber: (phone: string) => void;
  /** État du chargement pendant le traitement de la transaction */
  isProcessing: boolean;
  /** Fonction de soumission du formulaire */
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Composant de formulaire dédié à la saisie du moyen de paiement.
 * Respecte le principe de responsabilité unique (SRP) en isolant l'UI de checkout.
 */
export default function PaymentForm({
  passType,
  stop,
  total,
  paymentMethod,
  setPaymentMethod,
  phoneNumber,
  setPhoneNumber,
  isProcessing,
  onSubmit,
}: PaymentFormProps) {
  return (
    <motion.div
      key="checkout-form"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-lg space-y-6"
    >
      <div className="space-y-1">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          Étape finale
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 pt-2">
          Paiement sécurisé
        </h1>
        <p className="text-xs text-slate-500">
          Finalisez votre réservation en choisissant votre moyen de paiement local.
        </p>
      </div>

      {/* RAPPEL DU RÉCAPITULATIF SÉLECTIONNÉ */}
      <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-100 space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
          <span>Formule sélectionnée :</span>
          <span className="text-orange-600">
            {passType === "combo" ? "Pass Combiné (Billet + Navette)" : "Billet Seul"}
          </span>
        </div>
        {passType === "combo" && (
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>Arrêt navette :</span>
            <span className="font-semibold text-slate-800">{stop}</span>
          </div>
        )}
        <div className="border-t border-orange-200/60 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
          <span>Montant total à payer :</span>
          <span className="text-xl text-orange-500">
            {Number(total).toLocaleString("fr-FR")} FCFA
          </span>
        </div>
      </div>

      {/* SÉLECTEUR ET SAISIE DES DONNÉES DE REGLEMENT */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Choisissez votre mode de règlement :
          </label>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("wave")}
              className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                paymentMethod === "wave"
                  ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20 text-sky-700 font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <Smartphone className="w-5 h-5 text-sky-500" />
              <span className="text-xs">Wave</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("om")}
              className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                paymentMethod === "om"
                  ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/20 text-orange-700 font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <Smartphone className="w-5 h-5 text-orange-500" />
              <span className="text-xs">Orange Money</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                paymentMethod === "card"
                  ? "border-slate-800 bg-slate-900 text-white font-bold"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Carte</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Numéro de téléphone portable :
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xs font-bold text-slate-400">+221</span>
            <input
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-16 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-sm py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Validation du paiement en cours...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Valider et Payer {Number(total).toLocaleString("fr-FR")} FCFA</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}