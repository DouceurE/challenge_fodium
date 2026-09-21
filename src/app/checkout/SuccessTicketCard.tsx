"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";

interface SuccessTicketCardProps {
  passType: string;
  stop: string;
  paymentMethod: string;
  eventId: string;
}

/**
 * Composant de confirmation affichant le pass numérique et son QR code dynamique.
 * Déclenche automatiquement l'animation de confettis lors du chargement.
 */
export default function SuccessTicketCard({
  passType,
  stop,
  paymentMethod,
  eventId,
}: SuccessTicketCardProps) {
  // Génération d'un identifiant de billet simulé et de l'URL de vérification
  const ticketCode = `FD-2026-9821-SN`;
  const qrData = `https://fodium.kanzey.co/verify-ticket?code=${ticketCode}&event=${eventId}&type=${passType}`;

  // Déclenchement de l'effet visuel de célébration
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
      <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900">Paiement Confirmé !</h2>
        <p className="text-xs text-slate-500">
          Votre transaction a été validée avec succès via {paymentMethod.toUpperCase()}.
        </p>
      </div>

      {/* TICKET DIGITAL OFFICIEL AVEC QR CODE VECTORIEL */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 space-y-5 border border-slate-800 text-left relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-orange-400">Pass Officiel Fodium</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            VALIDE
          </span>
        </div>

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
      </div>

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