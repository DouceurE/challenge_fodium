"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";

/**
 * Interface définissant les propriétés attendues par la carte de confirmation de réservation.
 * 
 * @interface SuccessTicketCardProps
 * @property {string} passType - Formule sélectionnée ("combo" pour Billet + Navette, "single" pour Billet seul).
 * @property {string} stop - Nom de l'arrêt de navette choisi si la formule est "combo".
 * @property {string} paymentMethod - Identifiant ou nom du moyen de paiement utilisé (ex: "wave", "orange-money").
 * @property {string} eventId - Identifiant unique de l'événement réservé.
 */
interface SuccessTicketCardProps {
  passType: string;
  stop: string;
  paymentMethod: string;
  eventId: string;
}

/**
 * Composant de confirmation de réservation affichant le pass numérique officiel et son QR Code dynamique.
 * 
 * Ce composant gère :
 * - Le déclenchement automatique de la célébration visuelle par jet de confettis au montage (`canvas-confetti`).
 * - Une animation d'apparition 3D (effet retournement/flip `rotateY`) du billet via `framer-motion`.
 * - La génération du QR Code officiel haute définition intégrant l'URL de validation du titre.
 * - Des boutons d'action rapide (Ajout au Wallet mobile, partage du trajet sur WhatsApp).
 *
 * @component
 * @param {SuccessTicketCardProps} props - Propriétés d'affichage et de configuration du billet validé.
 * @returns {JSX.Element} Carte récapitulative et titre de transport interactif.
 */
export default function SuccessTicketCard({
  passType,
  stop,
  paymentMethod,
  eventId,
}: SuccessTicketCardProps) {
  // Identification alphanumérique simulée du billet et structuration de la donnée encodée dans le QR Code
  const ticketCode = `FD-2026-9821-SN`;
  const qrData = `https://fodium.kanzey.co/verify-ticket?code=${ticketCode}&event=${eventId}&type=${passType}`;

  // Déclenchement de l'effet visuel de célébration (confettis) dès le chargement du composant
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F97316", "#F59E0B", "#10B981", "#3B82F6"],
    });
  }, []);

  return (
    <motion.div
      key="success-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-200 shadow-2xl text-center space-y-6"
    >
      {/* Icône de confirmation */}
      <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      {/* Titre et détails de confirmation du paiement */}
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900">Paiement Confirmé !</h2>
        <p className="text-xs text-slate-500">
          Votre transactison a été validée avec succès via {paymentMethod.toUpperCase()}.
        </p>
      </div>

      {/* TICKET DIGITAL OFFICIEL AVEC EFFET FLIP 3D */}
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="bg-slate-950 text-white rounded-2xl p-6 space-y-5 border border-slate-800 text-left relative overflow-hidden shadow-2xl"
      >
        {/* Entête du ticket réintégrée */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-orange-400">Pass Officiel Fodium</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            VALIDE
          </span>
        </div>

        {/* Informations résumées du pass */}
        <div className="space-y-1.5">
          <div className="text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Type : </span>
            <span className="font-bold">
              {passType === "combo" ? "Billet + Navette Transport" : "Billet Seul"}
            </span>
          </div>
          {passType === "combo" && (
            <div className="text-xs text-slate-300">
              <span className="text-slate-400 font-medium">Départ Navette : </span>
              <span className="font-bold text-orange-400">{stop}</span>
            </div>
          )}
        </div>

        {/* COMPOSANT QR CODE DYNAMIQUE */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner max-w-[200px] mx-auto">
          <QRCodeSVG value={qrData} size={150} level="H" includeMargin={false} />
        </div>

        <span className="block text-center text-[10px] text-slate-400 tracking-widest font-mono pt-1">
          {ticketCode}
        </span>
      </motion.div>

      {/* BOUTONS D'INITIATIVES CRÉATIVES (WALLET ET WHATSAPP) */}
      <div className="flex gap-2 pt-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="flex-1 bg-slate-900 border border-slate-800 text-white text-[11px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          📱 Ajouter au Wallet
        </motion.button>

        <motion.a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Je viens de réserver mon Pass Fodium pour l'événement ! Retrouve-moi au départ de ${stop}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          💬 Partager sur WhatsApp
        </motion.a>
      </div>

      {/* Navigation de retour */}
      <div className="pt-2">
        <Link
          href="/"
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          Retour à l'accueil
        </Link>
      </div>
    </motion.div>
  );
}