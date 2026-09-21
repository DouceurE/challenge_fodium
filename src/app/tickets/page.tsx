"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TicketCard, { TicketItem } from "./TicketCard";
import TicketModal from "./TicketModal";

const MOCK_TICKETS: TicketItem[] = [
  {
    id: "t1",
    code: "FD-2026-9821-SN",
    eventTitle: "Dakar Music Festival 2026",
    category: "Concert",
    date: "Ven. 24 Nov. • 20:00",
    location: "Monument de la Renaissance, Dakar",
    passType: "combo",
    shuttleStop: "Rond-point Point E (Dakar)",
    status: "valid",
    totalPrice: 18500,
  },
  {
    id: "t2",
    code: "FD-2026-4410-SN",
    eventTitle: "Match Sénégal vs Égypte",
    category: "Sport",
    date: "Jeu. 14 Déc. • 17:00",
    location: "Stade Abdoulaye Wade, Diamniadio",
    passType: "single",
    status: "valid",
    totalPrice: 5000,
  },
  {
    id: "t3",
    code: "FD-2025-1102-SN",
    eventTitle: "Gala Stand-Up & Rire",
    category: "Humour",
    date: "Sam. 02 Déc. • 19:30",
    location: "Théâtre National Daniel Sorano, Dakar",
    passType: "combo",
    shuttleStop: "Rond-point VDN2 / Yoff",
    status: "used",
    totalPrice: 12500,
  },
];

/**
 * Page "Mes Billets" (/tickets).
 * Découpée en sous-composants modulaires (TicketCard, TicketModal) pour respecter la SRP.
 */
export default function TicketsPage() {
  const [filter, setFilter] = useState<"valid" | "used">("valid");
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  const filteredTickets = MOCK_TICKETS.filter((t) => t.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8 py-6 pb-24 md:pb-12">
      <div className="space-y-2">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          Portefeuille Digital
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 pt-1">
          Mes Billets & Pass Navettes
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Retrouvez vos titres d'accès sécurisés et vos QR codes de validation.
        </p>
      </div>

      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-xs">
        <button
          type="button"
          onClick={() => setFilter("valid")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            filter === "valid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          À venir ({MOCK_TICKETS.filter((t) => t.status === "valid").length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("used")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            filter === "used" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          Historique ({MOCK_TICKETS.filter((t) => t.status === "used").length})
        </button>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <TicketCard ticket={ticket} onSelect={setSelectedTicket} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 space-y-4">
          <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400">
            <Ticket className="w-8 h-8" />
          </div>
          <p className="text-xs text-slate-500">
            {filter === "valid" ? "Vous n'avez pas de réservations à venir." : "Votre historique est vide."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors"
          >
            <span>Découvrir les événements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* MODAL QR CODE */}
      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
}