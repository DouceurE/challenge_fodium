"use client";

import React, { useState } from "react";
import { Home, Calendar, Bus, Ticket, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:top-0 md:bottom-auto md:left-0 md:right-0 md:rounded-none">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md text-slate-900 rounded-full md:rounded-b-2xl px-6 py-2.5 shadow-xl border border-slate-200/80 flex items-center justify-between">
        
        {/* LOGO FODIUM (OPTION 1 : Image depuis le dossier public/) */}
        <div className="hidden md:flex items-center gap-2">
          <img 
            src="/logo.jpg" 
            alt="Fodium Logo" 
            className="h-9 w-auto object-contain"
          />
        </div>

        {/* LIENS DE NAVIGATION */}
        <div className="flex items-center justify-around w-full md:w-auto md:gap-8">
          
          {/* ACCUEIL */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              activeTab === "home" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Accueil</span>
          </button>

          {/* ÉVÉNEMENTS */}
          <button
            onClick={() => setActiveTab("events")}
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              activeTab === "events" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Événements</span>
          </button>

          {/* TRANSPORT (Badge Bientôt Orange Fodium) */}
          <div className="relative flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold text-slate-400 cursor-not-allowed">
            <motion.span
              animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-3 -right-2 md:-top-2 md:-right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-md"
            >
              bientôt
            </motion.span>
            <Bus className="w-5 h-5" />
            <span>Transport</span>
          </div>

          {/* MES BILLETS */}
          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              activeTab === "tickets" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span>Billets</span>
          </button>

          {/* PROFIL */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col md:flex-row items-center gap-1 text-xs md:text-sm font-semibold transition-colors ${
              activeTab === "profile" ? "text-orange-500" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profil</span>
          </button>

        </div>
      </div>
    </nav>
  );
}