"use client";

import { useState, useEffect, useRef } from "react";

type DebouncedTextareaProps = {
  /** Valor inicial del textarea */
  initialValue: string;
  /** Función que ejecuta la query de actualización. Debe recibir el valor actual */
  onSave: (value: string) => Promise<void>;
  /** Tiempo de debounce en ms (default 3000 = 3s) */
  debounceTime?: number;
  /** Placeholder opcional */
  placeholder?: string;
  /** Número de filas del textarea */
  rows?: number;
};

export function DebouncedTextarea({
  initialValue,
  onSave,
  debounceTime = 5000,
  placeholder,
  rows = 6,
}: DebouncedTextareaProps) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const lastSavedRef = useRef(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // No guardar si no cambió
    if (value === lastSavedRef.current) return;

    // Limpiar timeout previo
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setStatus("saving");
        await onSave(value);
        lastSavedRef.current = value;
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        console.error("Error saving textarea:", err);
        setStatus("error");
      }
    }, debounceTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, onSave, debounceTime]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      {status === "saving" && (
        <span className="text-xs text-muted-foreground">Guardando...</span>
      )}
      {status === "saved" && <span className="text-xs text-green-600">Guardado ✓</span>}
      {status === "error" && <span className="text-xs text-red-600">Error al guardar</span>}
    </div>
  );
}