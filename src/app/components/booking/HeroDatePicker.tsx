"use client";

import * as React from "react";
import { format, startOfDay, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

interface HeroDatePickerProps {
  date?: string;
  onSelect: (date: string) => void;
  label: string;
  minDate?: Date;
}

export function HeroDatePicker({ date, onSelect, label, minDate }: HeroDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = date ? new Date(date) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <button 
          type="button"
          className="bg-[#FBF6EE] rounded-[2rem] px-8 py-4 flex flex-col items-center transition-all cursor-pointer group w-full shadow-sm border border-amber-500/10 hover:border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        >
          <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <CalendarIcon size={10} className="group-hover:scale-110 transition-transform" /> {label}
          </span>
          <div className={cn(
            "text-[#434021] font-bold text-base text-center",
            !date && "text-slate-500 font-medium"
          )}>
            {selectedDate ? format(selectedDate, "dd MMM yyyy") : "Select Date"}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 rounded-[2.5rem] border border-[#434021]/10 shadow-2xl bg-white/95 backdrop-blur-3xl z-[2000]" 
        align="center" 
        side="bottom"
        sideOffset={10}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              onSelect(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }
          }}
          disabled={(date) => 
            isBefore(startOfDay(date), startOfDay(minDate || new Date()))
          }
          initialFocus
          className="rounded-[2.5rem]"
        />
      </PopoverContent>
    </Popover>
  );
}
