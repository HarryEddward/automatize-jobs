"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./input";

type DebouncedInputProps<T> = {
  /** Valor inicial del input */
  initialValue: T;
  /** Función que ejecuta la query de actualización. Debe recibir el valor actual */
  onSave: (value: T) => Promise<void>;
  /** Tiempo de debounce en ms (default 3000 = 3s) */
  debounceTime?: number;
  /** Placeholder opcional */
  placeholder?: string;
};

export function DebouncedInput<T extends string | number>({
  initialValue,
  onSave,
  debounceTime = 3000,
  placeholder,
}: DebouncedInputProps<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const lastSavedRef = useRef<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Si no cambió, no hace nada
    if (value === lastSavedRef.current) return;

    // Limpiar timeout previo
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setStatus("saving");
        await onSave(value); // ejecuta la función que tú pases
        lastSavedRef.current = value;
        setStatus("saved");

        // Opcional: resetear a idle después de 2s
        setTimeout(() => setStatus("idle"), 2000);

      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }, debounceTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, onSave, debounceTime]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value as T)}
        placeholder={placeholder}
        className="border p-2 rounded"
      />
      {status === "saving" && <span className="text-xs text-muted-foreground">Guardando...</span>}
      {status === "saved" && <span className="text-xs text-green-600">Guardado ✓</span>}
      {status === "error" && <span className="text-xs text-red-600">Error al guardar</span>}
    </div>
  );
}