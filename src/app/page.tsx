"use client";

import React, { useState } from "react";
import HeroSearch from "@/components/HeroSearch";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-10">
      {/* SECTION HERO ET RECHERCHE */}
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}