# 🚍 Fodium — Billetterie Intelligente & Navettes Écologiques (Dakar 2026)

> Application web immersive développée pour le **Challenge Fodium**, réinventant la mobilité urbaine et l'accès événementiel au Sénégal à travers un parcours in-app unifié, des micro-interactions de preuve sociale et un simulateur de transport dynamique.

---

## 🌟 Aperçu du Concept & Innovations

Fodium résout la fracture entre la billetterie événementielle et la logistique de transport en proposant :

1. **Le Pass Combiné (Billet + Navette)** : Sélection en un clic d'un trajet inclus depuis les principaux pôles de Dakar (Point E, Keur Massar, Baux Maraîchers, Yoff, Pikine).
2. **Paiement In-App Réinventé (SlideToPay)** : Remplacement du formulaire classique par un geste de glissement fluide et intuitif, inspiré des standards modernes de l'expérience utilisateur mobile.
3. **Micro-interactions UX & FOMO** : Jauge de remplissage dynamique des navettes en temps réel, toasts de preuve sociale contextuels et calcul d'impact carbone.
4. **Billet Numérique Sécurisé** : Génération instantanée d'un QR code de confirmation avec récapitulatif complet du trajet.

---

## 🛠️ Stack Technique & Justifications

Conformément aux exigences du challenge, chaque technologie a été choisie pour apporter un gain direct en termes d'expérience utilisateur, de performance et de fluidité visuelle :

* **Next.js (App Router)** :
  * *Pourquoi* : Offre une architecture modulaire par composants, un rendu ultra-rapide et une gestion fluide des routes dynamiques pour les pages d'événements.
* **Tailwind CSS** :
  * *Pourquoi* : Imposé par le brief, il permet d'itérer rapidement sur un design system moderne et soigné (tons ardoise, orange Fodium et émeraude), garantissant une compatibilité *mobile-first* irréprochable.
* **Framer Motion** :
  * *Pourquoi* : Répond à l'exigence d'une interface vivante et animée. Contrairement à du CSS pur, Framer Motion gère des transitions fluides basées sur l'état, des modales dynamiques et des micro-animations à 60 FPS (comme la jauge de disponibilité et les toasts), créant l'effet "Wow" recherché.
* **Lucide React** :
  * *Pourquoi* : Fournit des icônes vectorielles légères et expressives pour renforcer la lisibilité des points de ramassage et des fonctionnalités de transport.

💡 *Note qualité : L'intégralité du code source est rigoureusement documentée via des normes **JSDoc** standardisées, facilitant la maintenabilité et la génération automatique de la documentation technique.*

---

## 📂 Architecture du Projet

```text
src/
├── app/
│   ├── events/[id]/      # Page dynamique de détail d'événement et billetterie unifiée
│   ├── tickets/          # Gestion et affichage des billets réservés
│   ├── layout.tsx        # Structure globale de l'application
│   └── page.tsx          # Accueil de la plateforme
└── components/
    ├── AnimatedPrice.tsx         # Animation fluide des montants en FCFA
    ├── CheckoutModal.tsx         # Modale de paiement unifiée in-app
    ├── PassSelection.tsx         # Sélecteur de formules (Billet seul / Combo) & arrêts
    ├── SeatAvailabilityGauge.tsx # Jauge de remplissage dynamique et score d'urgence
    ├── ShuttleRouteWidget.tsx    # Simulateur de trajet et calcul de trafic en direct
    ├── SlideToPay.tsx            # Composant interactif de validation de paiement par glissement
    ├── SocialProofToast.tsx      # Notifications contextuelles de preuve sociale en temps réel
    └── SuccessTicketCard.tsx     # Carte de confirmation du billet avec QR Code numérique
```

---

## 🚀 Installation & Lancement en Local

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/DouceurE/challenge_fodium.git
   cd challenge_fodium
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Accéder à l'application** :
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📋 Contexte & Perspectives

* **Priorisation** : L'accent a été mis sur le parcours utilisateur mobile-first, l'ergonomie du pass combiné et l'interactivité des widgets de transport (simulateur et jauge).
* **Avec plus de temps** : Nous aurions pu intégrer une authentification complète par numéro de téléphone (très ancrée au Sénégal) et connecter une API de cartographie interactive (Mapbox / Leaflet) pour visualiser le trajet réel des navettes en temps réel.
* **Projet** : Soumission officielle pour le Challenge Fodium (Septembre 2026).
