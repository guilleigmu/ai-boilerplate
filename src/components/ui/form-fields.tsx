"use client";

import type { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";

interface BaseFormFieldProps {
  // biome-ignore lint/suspicious/noExplicitAny: todo
  field: ControllerRenderProps<any, any>;
  label: string;
  className?: string;
}

interface TextFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
  type?: "text" | "email";
}

interface PhoneFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
}

export function TextFormField({
  field,
  label,
  placeholder,
  type = "text",
  className = "mb-auto",
}: TextFormFieldProps) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...field} type={type} placeholder={placeholder} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export function EmailFormField({
  field,
  label,
  placeholder = "ejemplo@correo.com",
  className = "mb-auto",
}: Omit<TextFormFieldProps, "type">) {
  return (
    <TextFormField
      field={field}
      label={label}
      placeholder={placeholder}
      type="email"
      className={className}
    />
  );
}

export function PhoneFormField({
  field,
  label,
  placeholder = "Entra tu teléfono",
  className = "mb-auto",
}: PhoneFormFieldProps) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <PhoneInput {...field} placeholder={placeholder} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
