"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Ticket, Bus, Sparkles, X } from "lucide-react";

/**
 * Interface représentant la structure d'une notification de preuve sociale.
 *
 * @interface SocialNotification
 * @property {string} id - Identifiant unique de la notification.
 * @property {string} user - Prénom ou identifiant masqué de l'utilisateur.
 * @property {string} action - Action effectuée (ex: "a réservé un Pass Combiné").
 * @property {string} location - Zone géographique (ex: "Parcelles Assainies").
 * @property {string} timeAgo - Temps écoulé depuis l'action (ex: "Il y a 2 min").
 * @property {"ticket" | "shuttle" | "viewers"} type - Type de notification pour l'icône associée.
 */
export interface SocialNotification {
  id: string;
  user: string;
  action: string;
  location: string;
  timeAgo: string;
  type: "ticket" | "shuttle" | "viewers";
}

/**
 * Jeu de données fictif simulant l'activité des utilisateurs en direct à Dakar.
 */
const MOCK_NOTIFICATIONS: SocialNotification[] = [
  {
    id: "1",
    user: "Amina K.",
    action: "a réservé 2 Pass Combinés (Billet + Navette)",
    location: "Point E",
    timeAgo: "Il y a 2 min",
    type: "shuttle",
  },
  {
    id: "2",
    user: "Mamadou L.",
    action: "a acheté un Billet VIP",
    location: "Dakar Plateau",
    timeAgo: "Il y a 5 min",
    type: "ticket",
  },
  {
    id: "3",
    user: "18 personnes",
    action: "consultent actuellement la navette pour Keur Massar",
    location: "Keur Massar",
    timeAgo: "En direct",
    type: "viewers",
  },
  {
    id: "4",
    user: "Sokhna D.",
    action: "a réservé sa place de navette",
    location: "Pikine Technopole",
    timeAgo: "Il y a 8 min",
    type: "shuttle",
  },
];

/**
 * Composant de preuve sociale en temps réel (Social Proof Toast).
 *
 * Affiche des notifications animées discrètes pour renforcer l'engagement
 * et rassurer l'utilisateur sur la forte demande des pass et navettes Fodium.
 *
 * @component
 * @returns {JSX.Element} Notification Toast animée en bas d'écran.
 */
export default function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Premier affichage après 3 secondes
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Biais d'alternance toutes le 8 secondes
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_NOTIFICATIONS.length);
        setIsVisible(true);
      }, 600);
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentNotif = MOCK_NOTIFICATIONS[currentIndex];

  /**
   * Sélection de l'icône et des styles selon le type de notification.
   */
  const renderIcon = () => {
    switch (currentNotif.type) {
      case "shuttle":
        return <Bus className="w-4 h-4 text-orange-500" />;
      case "ticket":
        return <Ticket className="w-4 h-4 text-emerald-500" />;
      case "viewers":
        return <Users className="w-4 h-4 text-sky-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-5 left-5 z-40 max-w-sm bg-slate-900/95 border border-slate-800 text-white p-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3"
        >
          {/* Badge d'icône */}
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
            {renderIcon()}
          </div>

          {/* Contenu textuel */}
          <div className="text-xs space-y-0.5 pr-2">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="text-white">{currentNotif.user}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                • {currentNotif.timeAgo}
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-tight">
              {currentNotif.action}
            </p>
          </div>

          {/* Bouton de fermeture */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-slate-500 hover:text-slate-300 p-1 rounded-full transition-colors shrink-0 cursor-pointer"
            aria-label="Fermer les notifications"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}