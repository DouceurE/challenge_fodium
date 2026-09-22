'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

/**
 * Propriétés du composant SlideToPay.
 * 
 * @interface SlideToPayProps
 * @property {number} amount - Le montant total à régler en FCFA.
 * @property {() => void} onSuccess - Fonction de rappel déclenchée lorsque le glissement est complété.
 * @property {boolean} [disabled=false] - Indique si l'action de glissement est désactivée.
 */
interface SlideToPayProps {
  amount: number;
  onSuccess: () => void;
  disabled?: boolean;
}

/**
 * Composant de validation de paiement interactif par glissement (Swipe-to-Pay).
 * 
 * Permet de valider un achat via un geste continu, sécurisant la confirmation
 * de la commande et évitant les clics accidentels.
 *
 * @component
 * @param {SlideToPayProps} props - Propriétés du composant.
 * @returns {JSX.Element} Le composant de glissement pour paiement.
 */
export const SlideToPay: React.FC<SlideToPayProps> = ({
  amount,
  onSuccess,
  disabled = false,
}) => {
  /** État indiquant si le glissement a été effectué avec succès */
  const [isCompleted, setIsCompleted] = useState(false);

  /** Valeur de mouvement Framer Motion représentant le déplacement X du curseur */
  const x = useMotionValue(0);

  /** Distance maximale de glissement nécessaire pour déclencher la validation (en pixels) */
  const dragRange = 220;

  /** Opacité du texte incitatif qui s'estompe à mesure que l'utilisateur glisse */
  const textOpacity = useTransform(x, [0, dragRange / 2], [1, 0]);

  /** Largeur en pourcentage du fond dégradé qui suit la progression du glissement */
  const bgProgress = useTransform(x, [0, dragRange], ['0%', '100%']);

  /**
   * Gère la fin du geste de glissement.
   * Vérifie si le curseur a atteint le seuil requis pour valider l'action.
   */
  const handleDragEnd = () => {
    if (x.get() >= dragRange - 10 && !disabled) {
      setIsCompleted(true);
      onSuccess();
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto h-16 bg-slate-900 rounded-full p-1.5 overflow-hidden select-none border border-slate-800 shadow-xl">
      {/* Remplissage dynamique en arrière-plan révélé au glissement */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
        style={{ width: bgProgress }}
      />

      {/* Libellé d'instruction */}
      <motion.span
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-300 uppercase tracking-widest pointer-events-none pl-6"
      >
        Glisser pour valider
      </motion.span>

      {/* Bouton/Curseur glissant interactif */}
      <motion.div
        drag={isCompleted || disabled ? false : 'x'}
        dragConstraints={{ left: 0, right: dragRange }}
        dragElastic={0.05}
        dragSnapToOrigin={!isCompleted}
        style={{ x }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.95 }}
        className={`relative z-10 w-13 h-13 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing ${
          isCompleted ? 'bg-emerald-500 text-white' : 'bg-white text-orange-600'
        }`}
      >
        {isCompleted ? (
          <Check className="w-6 h-6 stroke-[3]" />
        ) : (
          <ChevronRight className="w-6 h-6 stroke-[3] animate-pulse" />
        )}
      </motion.div>
    </div>
  );
};