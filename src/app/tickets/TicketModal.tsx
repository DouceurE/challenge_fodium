"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { TicketItem } from "./TicketCard";

/**
 * Propriétés du composant TicketModal.
 * 
 * @interface TicketModalProps
 * @property {TicketItem | null} ticket - Le billet sélectionné pour l'affichage en grand, ou `null` si la modale est fermée.
 * @property {() => void} onClose - Fonction de rappel pour fermer la modale.
 */
interface TicketModalProps {
  ticket: TicketItem | null;
  onClose: () => void;
}

/**
 * Composant Modale dédié à la présentation plein écran du QR Code de validation du billet.
 * 
 * Affiche les détails de l'événement, les informations de navette si applicable, 
 * ainsi que le QR code haute définition généré dynamiquement à partir du code du billet.
 *
 * @component
 * @param {TicketModalProps} props - Propriétés du composant.
 * @returns {JSX.Element} La modale d'affichage du ticket.
 */
export default function TicketModal({ ticket, onClose }: TicketModalProps) {
  return (
    <AnimatePresence>
      {ticket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-800 space-y-6 text-center shadow-2xl relative overflow-hidden"
          >
            {/* En-tête de la modale */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-orange-400">Pass Officiel Fodium</span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
              >
                Fermer ✕
              </button>
            </div>

            {/* Détails du billet */}
            <div className="space-y-1 text-left">
              <h3 className="font-extrabold text-lg text-white">{ticket.eventTitle}</h3>
              <p className="text-xs text-slate-400">{ticket.date}</p>
              {ticket.passType === "combo" && (
                <p className="text-xs text-orange-400 font-bold pt-1">
                  Navette : {ticket.shuttleStop}
                </p>
              )}
            </div>

            {/* Génération du QR Code */}
            <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl max-w-[220px] mx-auto shadow-inner">
              <QRCode
                value={`https://fodium.kanzey.co/verify-ticket?code=${ticket.code}`}
                size={180}
                level="H"
              />
            </div>

            {/* Code texte et consignes de contrôle */}
            <div className="space-y-1">
              <span className="block text-center text-xs text-slate-300 font-mono tracking-widest font-bold">
                {ticket.code}
              </span>
              <span className="block text-[10px] text-slate-500">
                Présentez ce code QR au contrôleur ou à l'embarquement
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}