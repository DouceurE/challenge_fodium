"use client";

import { useState, use } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { AnimatedPrice } from "@/components/AnimatedPrice";
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  AlignLeft, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { MOCK_EVENTS } from "@/components/EventList";
import ShuttleRouteWidget from "@/components/ShuttleRouteWidget";
import { PassSelection, ShuttleStop } from "@/components/PassSelection";
import { CheckoutModal } from "@/components/CheckoutModal";
import SocialProofToast from "@/components/SocialProofToast";
import SeatAvailabilityGauge from "@/components/SeatAvailabilityGauge";

/**
 * Liste des arrêts stratégiques desservis par les navettes Fodium Transport.
 */
const SHUTTLE_STOPS: ShuttleStop[] = [
  { id: "1", name: "Rond-point Point E (Dakar)", price: 0 },
  { id: "2", name: "Station Elton Keur Massar", price: 0 },
  { id: "3", name: "Rond-point VDN2 / Yoff", price: 0 },
  { id: "4", name: "Pikine Technopole", price: 0 },
  { id: "5", name: "Gare des Baux Maraîchers", price: 0 },
];

interface EventPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Page de détails dynamique d'un événement (`/events/[id]`).
 */
export default function EventPage({ params }: EventPageProps) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id || "1";
  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  // --- ÉTATS REACT LOCAUX ---
  const [passType, setPassType] = useState<"single" | "combo">("combo");
  const [selectedStop, setSelectedStop] = useState<ShuttleStop>(SHUTTLE_STOPS[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // État pour contrôler l'ouverture de la modale CheckoutModal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // --- CALCUL DU PRIX TOTAL ---
  const basePrice = event.ticketPrice;
  const shuttlePrice = passType === "combo" ? event.shuttlePrice : 0;
  const unitPrice = basePrice + shuttlePrice;
  const totalPrice = unitPrice * quantity;

  const descriptionText = (event as any).description || 
    "Rejoignez-nous pour cet événement exceptionnel. Profitez d'une expérience unique avec un accès privilégié et la possibilité d'utiliser la navette officielle Fodium Transport pour un trajet aller-retour en toute sérénité.";

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8 py-6">
      {/* BOUTON DE RETOUR */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors"
      >
        ← Retour aux événements
      </Link>

      {/* BANNIÈRE VISUELLE DE L'ÉVÉNEMENT */}
      <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
        <Image 
          src={event.image} 
          alt={event.title} 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white space-y-2">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/20 w-fit px-3 py-1 rounded-full border border-orange-500/30">
            {event.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <AlignLeft className="w-5 h-5 text-orange-500" />
          <span>À propos de l'événement</span>
        </h2>

        <div className="relative">
          <div 
            className={`text-sm text-slate-600 leading-relaxed transition-all duration-300 overflow-hidden ${
              !isExpanded ? "max-h-28 line-clamp-3" : "max-h-full"
            }`}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 whitespace-pre-line">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>,
                li: ({ children }) => <li className="text-slate-700">{children}</li>,
              }}
            >
              {descriptionText}
            </ReactMarkdown>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-500 hover:text-orange-600 transition-colors pt-1 cursor-pointer"
        >
          <span>{isExpanded ? "Lire moins" : "Lire plus"}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </section>

      {/* SÉLECTION DU PASS ET NAVETTE */}
      <PassSelection
        ticketPrice={event.ticketPrice}
        shuttlePrice={event.shuttlePrice}
        passType={passType}
        setPassType={setPassType}
        selectedStop={selectedStop}
        setSelectedStop={setSelectedStop}
        shuttleStops={SHUTTLE_STOPS}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* WIDGET ITINÉRAIRE ET JAUGE DE DISPONIBILITÉ */}
      {passType === "combo" && (
        <div className="space-y-4">
          <ShuttleRouteWidget 
            pickupStop={selectedStop.name} 
            destination={event.location} 
          />
          <SeatAvailabilityGauge stopName={selectedStop.name} />
        </div>
      )}

      {/* Toast de preuve sociale global sur la page */}
      <SocialProofToast />

      {/* BANDEAU RÉCAPITULATIF AVEC BOUTON QUI OUVRE LA MODALE */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left w-full md:w-auto">
          <span className="text-xs text-slate-400 font-medium block">
            Récapitulatif ({quantity} {quantity > 1 ? "places" : "place"})
          </span>
          <div className="text-2xl font-black text-orange-400">
            <AnimatedPrice value={totalPrice} />
          </div>
          <p className="text-[11px] text-slate-400">
            {passType === "combo" 
              ? `Billet + Navette depuis ${selectedStop.name}` 
              : "Billet seul sans transport"}
          </p>
        </div>

        {/* Remplacement du <Link> par un <button> déclenchant la modale */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
        >
          <span>Continuer vers le paiement</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* INTÉGRATION DE LA MODALE DE PAIEMENT */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
        ticketType={passType === "combo" ? "Pass Combiné (Billet + Navette)" : "Billet Seul"}
        shuttleStop={passType === "combo" ? selectedStop.name : undefined}
        totalPrice={totalPrice}
      />
    </div>
  );
}