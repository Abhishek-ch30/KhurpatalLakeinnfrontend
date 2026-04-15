"use client";

import * as React from "react";
import { format } from "date-fns";
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="bg-[#FBF6EE] rounded-full px-10 py-4 flex flex-col items-center transition-all cursor-pointer group w-full shadow-sm border border-amber-500/10">
          <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <CalendarIcon size={10} className="group-hover:scale-110 transition-transform" /> {label}
          </span>
          <div className={cn(
            "text-black font-bold text-base text-center",
            !date && "text-slate-500"
          )}>
            {selectedDate ? format(selectedDate, "dd-MMM-yyyy") : "Select Date"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-[2rem] border-none shadow-2xl bg-white/95 backdrop-blur-xl" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              onSelect(date.toISOString().split('T')[0]);
              setOpen(false);
            }
          }}
          disabled={(date) => 
            date < (minDate || new Date(new Date().setHours(0, 0, 0, 0)))
          }
          initialFocus
          className="rounded-[2rem]"
        />
      </PopoverContent>
    </Popover>
  );
}
