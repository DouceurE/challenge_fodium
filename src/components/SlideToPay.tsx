'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

interface SlideToPayProps {
  amount: number;
  onSuccess: () => void;
  disabled?: boolean;
}

export const SlideToPay: React.FC<SlideToPayProps> = ({ amount, onSuccess, disabled = false }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const x = useMotionValue(0);
  
  // Plage de glissement utile (en px)
  const dragRange = 220; 

  // Transformations visuelles pendant le glissement
  const textOpacity = useTransform(x, [0, dragRange / 2], [1, 0]);
  const bgProgress = useTransform(x, [0, dragRange], ["0%", "100%"]);

  const handleDragEnd = () => {
    if (x.get() >= dragRange - 10 && !disabled) {
      setIsCompleted(true);
      onSuccess();
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto h-16 bg-slate-900 rounded-full p-1.5 overflow-hidden select-none border border-slate-800 shadow-xl">
      {/* Fond dynamique d'avancement */}
      <motion.div 
        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
        style={{ width: bgProgress }}
      />

      {/* Texte d'instruction */}
      <motion.span 
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-300 uppercase tracking-widest pointer-events-none pl-6"
      >
        Glisser pour valider
      </motion.span>

      {/* Curseur glissant */}
      <motion.div
        drag={isCompleted || disabled ? false : "x"}
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