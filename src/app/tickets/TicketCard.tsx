"use client";

import React from "react";
import { Calendar, MapPin, Bus, Ticket } from "lucide-react";
import { QRCodeSVG as QRCode } from "qrcode.react";

export interface TicketItem {
  id: string;
  code: string;
  eventTitle: string;
  category: string;
  date: string;
  location: string;
  passType: "combo" | "single";
  shuttleStop?: string;
  status: "valid" | "used";
  totalPrice: number;
}

interface TicketCardProps {
  /** Billet à afficher */
  ticket: TicketItem;
  /** Action de sélection pour ouvrir la modale QR Code */
  onSelect: (ticket: TicketItem) => void;
}

/**
 * Composant unitaire d'affichage d'un pass/billet dans le portefeuille.
 */
export default function TicketCard({ ticket, onSelect }: TicketCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-3 flex-grow">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full uppercase">
            {ticket.category}
          </span>
          <span
            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
              ticket.status === "valid"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {ticket.status === "valid" ? "Valide" : "Utilisé"}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-slate-900">{ticket.eventTitle}</h3>

        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{ticket.location}</span>
          </div>
          {ticket.passType === "combo" && (
            <div className="flex items-center gap-2 font-semibold text-orange-600 bg-orange-50 w-fit px-2.5 py-1 rounded-lg border border-orange-100 mt-1">
              <Bus className="w-4 h-4 shrink-0" />
              <span>Navette : {ticket.shuttleStop}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 shrink-0">
        <div
          onClick={() => onSelect(ticket)}
          className="bg-slate-950 p-3 rounded-2xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-1 shadow-md"
        >
          <div className="p-1 bg-white rounded-lg">
            <QRCode
              value={`https://fodium.kanzey.co/verify-ticket?code=${ticket.code}`}
              size={64}
              level="M"
            />
          </div>
          <span className="text-[9px] text-slate-400 font-mono tracking-widest pt-0.5">
            {ticket.code}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(ticket)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <Ticket className="w-4 h-4 text-orange-400" />
          <span>Afficher le Pass</span>
        </button>
      </div>
    </div>
  );
}