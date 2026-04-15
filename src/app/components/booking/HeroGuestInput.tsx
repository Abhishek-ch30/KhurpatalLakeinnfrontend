"use client";

import * as React from "react";
import { Users } from "lucide-react";

interface HeroGuestInputProps {
  value: number;
  onSelect: (value: number) => void;
}

export function HeroGuestInput({ value, onSelect }: HeroGuestInputProps) {
  return (
    <div className="bg-[#FBF6EE] rounded-full px-10 py-4 flex flex-col items-center group w-full border border-amber-500/10 shadow-sm">
      <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
        <Users size={10} className="group-hover:scale-110 transition-transform" /> TOTAL EXPLORERS
      </span>
      <div className="flex items-center w-full">
        <input
          type="number"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onSelect(parseInt(e.target.value) || 1)}
          className="bg-transparent border-none text-black font-bold text-base focus:outline-none w-full text-center"
          placeholder="People"
        />
      </div>
    </div>
  );
}
