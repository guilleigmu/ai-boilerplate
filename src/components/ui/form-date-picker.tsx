"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
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

interface FormDatePickerProps {
  // biome-ignore lint/suspicious/noExplicitAny: todo
  field: ControllerRenderProps<any, any>;
  label: string;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
}

export function FormDatePicker({
  field,
  label,
  placeholder = "Selecciona una fecha",
  disabled = (date: Date) => date > new Date() || date < new Date("1900-01-01"),
}: FormDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between font-normal",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value ? (
                format(field.value, "dd/MM/yyyy", { locale: es })
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              field.onChange(date);
              if (date) {
                setIsOpen(false);
              }
            }}
            disabled={disabled}
            locale={es}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
