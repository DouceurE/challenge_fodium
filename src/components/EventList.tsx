"use client";

import React from "react";
import EventCard, { EventType } from "@/components/EventCard";

/**
 * Liste unifiée des événements fictifs (Mock Data).
 * Source de vérité unique pour les événements de l'application Fodium.
 *
 * @type {EventType[]}
 */
export const MOCK_EVENTS: EventType[] = [
  {
    id: "1",
    title: "Dakar Music Festival 2026",
    category: "Concert",
    date: "Ven. 24 Nov. • 20:00",
    location: "Monument de la Renaissance, Dakar",
    ticketPrice: 15000,
    shuttlePrice: 3500,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    description: `Le rendez-vous incontournable des musiques actuelles au Sénégal est de retour pour une édition exceptionnelle au pied du Monument de la Renaissance.

Venez vivre une expérience immersive unique célébrant la richesse culturelle et les sonorités contemporaines africaines.

📍 **Lieu :** Esplanade du Monument de la Renaissance, Dakar
📅 **Date & Heure :** Vendredi 24 Novembre 2026 à partir de 20h00 GMT
🎟️ **Accès :** Billet Seul ou Pass Combiné avec Navette Express Fodium

**Au programme de la soirée :**
• Prestations en direct de grands noms de la scène Mbalax, Afrobeat et Hip-Hop
• DJ Sets exclusifs et animations visuelles haute technologie
• Village gastronomique et espaces de restauration locale
• Dispositif de sécurité renforcé et contrôle d'accès fluide par QR Code

**Transport & Accessibilité :**
Pour profiter de la fête sans le stress du stationnement et des embouteillages, choisissez le **Pass Combiné**. Nos navettes officielles assureront des départs réguliers depuis Dakar et sa banlieue avec un retour garanti en fin d'événement.`,
  },
  {
    id: "2",
    title: "Gala Stand-Up & Rire",
    category: "Humour",
    date: "Sam. 02 Déc. • 19:30",
    location: "Théâtre National Daniel Sorano, Dakar",
    ticketPrice: 10000,
    shuttlePrice: 2500,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: `Préparez-vous à une soirée inoubliable sous le signe du rire et de la détente ! La scène légendaire du Théâtre National Daniel Sorano accueille la crème des humoristes régionaux et internationaux pour un plateau stand-up d'exception.

📍 **Lieu :** Théâtre National Daniel Sorano, Dakar
📅 **Date & Heure :** Samedi 02 Décembre 2026 à 19h30 GMT
🎟️ **Accès :** Entrée sur réservation (Places limitées)

**Ce qui vous attend :**
• Plus de 2 heures de sketchs inédits abordant le quotidien, la culture et l'actualité avec subtilité
• Présence exceptionnelle d'invités surprises de la scène comique ouest-africaine
• Ambiance chaleureuse et conviviale idéale en famille ou entre amis

**Informations pratiques :**
• Ouverture des portes dès 18h30 pour un placement en salle en toute sérénité
• Service de navette Fodium disponible au départ des principaux points de ralliement de la ville`,
  },
  {
    id: "3",
    title: "Match Sénégal vs Égypte",
    category: "Sport",
    date: "Jeu. 14 Déc. • 17:00",
    location: "Stade Abdoulaye Wade, Diamniadio",
    ticketPrice: 5000,
    shuttlePrice: 3000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    description: `Un choc au sommet à ne manquer sous aucun prétexte ! Les Lions de la Teranga accueillent les Pharaons d'Égypte dans l'enceinte ultramoderne du Stade Abdoulaye Wade pour une affiche décisive.

Venez pousser notre équipe nationale vers la victoire dans une ambiance survoltée !

📍 **Lieu :** Stade Abdoulaye Wade, Diamniadio
📅 **Date & Heure :** Jeudi 14 Décembre 2026 à 17h00 GMT
🎟️ **Tarif :** À partir de 5 000 FCFA

**Déroulement de la journée :**
• 13h00 : Ouverture de la Fan Zone extérieure et animations
• 14h30 : Ouverture des portes du stade
• 17h00 : Coup d'envoi de la rencontre

**Transport Fodium Transport (Fortement Recommandé) :**
Compte tenu de l'affluence vers Diamniadio, optez pour le **Pass Combiné Billet + Navette**.
• Départs coordonnés depuis plusieurs arrêts stratégiques (Point E, Keur Massar, VDN, Pikine, etc.)
• Trajet direct via l'autoroute à péage
• Navette retour garantie immédiatement après le coup de sifflé final`,
  },
];

/**
 * Propriétés du composant EventList.
 * 
 * @interface EventListProps
 * @property {string} searchQuery - Terme de recherche saisi par l'utilisateur pour filtrer la liste.
 */
interface EventListProps {
  searchQuery: string;
}

/**
 * Composant de grille d'affichage et de filtrage des événements.
 * 
 * Filtre dynamiquement les événements du tableau `MOCK_EVENTS` en fonction du titre, 
 * du lieu ou de la catégorie recherchée, puis affiche les cartes correspondantes ou un état vide.
 *
 * @component
 * @param {EventListProps} props - Propriétés du composant.
 * @returns {JSX.Element} La section d'affichage des événements.
 */
export default function EventList({ searchQuery }: EventListProps) {
  /**
   * Événements filtrés selon la valeur insensible à la casse de `searchQuery`.
   */
  const filteredEvents = MOCK_EVENTS.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="space-y-4">
      {/* EN-TÊTE DE LA GRILLE */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Événements à venir</h2>
        <span className="text-xs text-slate-500">{filteredEvents.length} disponible(s)</span>
      </div>

      {/* GRILLE D'ÉVÉNEMENTS OU ÉTAT VIDE */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-sm">Aucun événement ne correspond à votre recherche.</p>
        </div>
      )}
    </section>
  );
}