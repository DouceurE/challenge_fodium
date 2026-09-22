'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedPriceProps {
  value: number;
  currency?: string;
  className?: string;
}

/**
 * Composant de compteur de prix mécanique/digital animé.
 * Utilise une physique de ressort amortie (sans rebond) pour une lisibilité instantanée
 * et un retour visuel ultra-réactif lors des variations de tarif.
 */
export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
  value,
  currency = 'FCFA',
  className = '',
}) => {
  // Configuration physique optimisée : réactivité maximale, aucun dépassement/rebond
  const spring = useSpring(value, {
    mass: 0.5,      // Ultra léger : déclenchement immédiat
    stiffness: 120, // Accélération franche vers le montant cible
    damping: 20,    // Freinage ferme : arrêt parfait sur la valeur exacte
  });

  const displayValue = useTransform(spring, (current) =>
    Math.round(current).toLocaleString('fr-FR')
  );

  const [formattedText, setFormattedText] = useState(
    value.toLocaleString('fr-FR')
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

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