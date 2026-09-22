'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * Propriétés du composant AnimatedPrice.
 * 
 * @interface AnimatedPriceProps
 * @property {number} value - La valeur numérique du prix à animer.
 * @property {string} [currency='FCFA'] - L'unité monétaire ou le symbole affiché à côté du prix.
 * @property {string} [className=''] - Classes CSS Tailwind optionnelles pour personnaliser le style.
 */
interface AnimatedPriceProps {
  value: number;
  currency?: string;
  className?: string;
}

/**
 * Composant de compteur de prix mécanique/digital animé.
 * 
 * Utilise une physique de ressort amortie (`useSpring`) sans rebond pour une lisibilité
 * instantanée et un retour visuel fluide lors des variations de tarif (sélection d'options,
 * ajouts de billets ou navettes).
 *
 * @component
 * @param {AnimatedPriceProps} props - Propriétés du composant.
 * @returns {JSX.Element} L'élément de prix animé.
 */
export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
  value,
  currency = 'FCFA',
  className = '',
}) => {
  /**
   * Configuration de la physique du ressort Framer Motion.
   * Optimisée pour une réactivité maximale sans dépassement ni rebond.
   */
  const spring = useSpring(value, {
    mass: 0.5,      // Ultra léger : déclenchement immédiat
    stiffness: 120, // Accélération franche vers le montant cible
    damping: 20,    // Freinage ferme : arrêt parfait sur la valeur exacte
  });

  /**
   * Transformation de la valeur numérique courante du ressort en chaîne formatée (FR).
   */
  const displayValue = useTransform(spring, (current) =>
    Math.round(current).toLocaleString('fr-FR')
  );

  /** État local contenant le texte du prix actuellement formaté */
  const [formattedText, setFormattedText] = useState(
    value.toLocaleString('fr-FR')
  );

  /**
   * Met à jour la cible du ressort lorsque la propriété `value` change.
   */
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  /**
   * Écoute les changements de la valeur transformée et met à jour l'état du texte.
   */
  useEffect(() => {
    return displayValue.on('change', (latest) => {
      setFormattedText(latest);
    });
  }, [displayValue]);

  return (
    <motion.span
      key={value}
      initial={{ scale: 1.05, color: '#f97316' }}
      animate={{ scale: 1, color: 'inherit' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`inline-flex items-baseline font-black tracking-tight ${className}`}
    >
      <span>{formattedText}</span>
      <span className="ml-1 text-xs font-bold text-slate-400">{currency}</span>
    </motion.span>
  );
};