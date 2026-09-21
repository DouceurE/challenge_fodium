"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import PaymentForm from "./PaymentForm";
import SuccessTicketCard from "./SuccessTicketCard";

/**
 * Sous-composant isolant la lecture des paramètres d'URL sous un fallback Suspense.
 */
function CheckoutContent() {
  const searchParams = useSearchParams();

  // RECUPERATION DES DONNEES PROVENANT DE LA SELECTION
  const eventId = searchParams.get("event") || "1";
  const passType = searchParams.get("type") || "combo";
  const stop = searchParams.get("stop") || "Rond-point Point E";
  const total = searchParams.get("total") || "18500";

  // ETATS DE GESTION DU PAIEMENT
  const [paymentMethod, setPaymentMethod] = useState<"wave" | "om" | "card">("wave");
  const [phoneNumber, setPhoneNumber] = useState("77 000 00 00");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // SIMULATION DE TRANSACTION RESEAU
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-8 py-6">
      {!isSuccess && (
        <Link
          href={`/events/${eventId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors"
        >
          ← Modifier ma sélection
        </Link>
      )}

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <PaymentForm
            passType={passType}
            stop={stop}
            total={total}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            isProcessing={isProcessing}
            onSubmit={handlePayment}
          />
        ) : (
          <SuccessTicketCard
            passType={passType}
            stop={stop}
            paymentMethod={paymentMethod}
            eventId={eventId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Page principale Checkout (`/checkout`).
 * Emballe le contenu dynamique dans un composant Suspense pour la compatibilité SSR / App Router Next.js.
 */
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12 text-slate-500 text-sm">
          Chargement du module de paiement...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}