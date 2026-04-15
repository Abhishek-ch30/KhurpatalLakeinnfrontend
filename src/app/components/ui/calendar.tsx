"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-8",
        month: "flex flex-col gap-6",
        caption: "flex justify-center pt-2 relative items-center w-full mb-4",
        caption_label: "text-lg font-bold text-[#434021]",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 bg-[#FBF6EE] p-0 opacity-70 hover:opacity-100 rounded-full transition-all border border-[#434021]/5",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex justify-around mb-2",
        head_cell:
          "text-[#C6A75E] w-10 font-black text-[10px] uppercase tracking-[0.2em]",
        row: "flex w-full mt-1 justify-around",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full"
            : "[&:has([aria-selected])]:rounded-full",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-10 p-0 font-bold aria-selected:opacity-100 rounded-full transition-all hover:bg-[#FBF6EE] hover:text-[#434021]",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-[#C6A75E] aria-selected:text-white rounded-l-full",
        day_range_end:
          "day-range-end aria-selected:bg-[#C6A75E] aria-selected:text-white rounded-r-full",
        day_selected:
          "bg-[#C6A75E] text-white hover:bg-[#434021] hover:text-white focus:bg-[#434021] focus:text-white rounded-full shadow-lg shadow-[#C6A75E]/20",
        day_today: "bg-[#FBF6EE] text-[#434021] border-2 border-[#C6A75E] rounded-full",
        day_outside:
          "day-outside text-muted-foreground opacity-20 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-10 cursor-not-allowed line-through",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
