import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Configuration de la police principale (Inter) chargée via Next.js Google Fonts.
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * Métadonnées globales de l'application pour le référencement (SEO).
 * 
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Fodium - Billetterie & Transports",
  description: "Plate-forme de billetterie d'événements et réservation de navettes au Sénégal.",
};

/**
 * Props du composant RootLayout.
 * 
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - Contenu React injecté au sein des pages.
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout racine de l'application Next.js (App Router).
 * 
 * Définit la structure HTML de base, applique la langue française, la typographie globale,
 * ainsi que l'agencement flexbox incluant la barre de navigation supérieure (`Navbar`)
 * et le pied de page (`Footer`).
 *
 * @component
 * @param {RootLayoutProps} props - Propriétés du composant.
 * @returns {JSX.Element} L'arborescence HTML globale de l'application.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col pt-20`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}