"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import type { ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FormDateRangePickerProps {
  // biome-ignore lint/suspicious/noExplicitAny: todo
  field: ControllerRenderProps<any, any>;
  label: string;
  placeholder?: string;
}

export function FormDateRangePicker({
  field,
  label,
  placeholder = "Selecciona un rango",
}: FormDateRangePickerProps) {
  const dateRange = field.value as DateRange | undefined | null;

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between font-normal",
                !dateRange?.from && "text-muted-foreground",
              )}
            >
              <span className="truncate">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy", { locale: es })}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy", { locale: es })
                  )
                ) : (
                  placeholder
                )}
              </span>
              <CalendarIcon className="h-4 w-4 shrink-0" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange ?? undefined}
            onSelect={(range) => {
              field.onChange(range);
              console.log("range", range);
            }}
            locale={es}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
