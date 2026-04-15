"use client";

import * as React from "react";
import { Users, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface HeroGuestSelectProps {
  value: number;
  onSelect: (value: number) => void;
}

export function HeroGuestSelect({ value, onSelect }: HeroGuestSelectProps) {
  return (
    <Select value={value.toString()} onValueChange={(val) => onSelect(parseInt(val))}>
      <SelectTrigger className="bg-[#FBF6EE]/30 rounded-full px-10 py-4 h-auto border-none flex flex-col items-center md:items-start hover:bg-[#FBF6EE] transition-all cursor-pointer group shadow-none ring-0 focus:ring-0 w-full outline-none">
        <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
          <Users size={10} className="group-hover:scale-110 transition-transform" /> GUESTS
        </span>
        <div className="text-black font-bold text-base flex items-center gap-2">
          <User size={16} className="text-amber-500 shrink-0" />
          <span>{value} Explorer{value > 1 ? 's' : ''}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-[2rem] border-none shadow-2xl bg-white/95 backdrop-blur-xl p-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <SelectItem 
            key={n} 
            value={n.toString()}
            className="rounded-xl focus:bg-amber-500 focus:text-white py-3 px-4"
          >
            <div className="flex items-center gap-3">
              <Users size={14} className="opacity-50" />
              <span className="font-bold">{n} {n === 1 ? 'Explorer' : 'Explorers'}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
