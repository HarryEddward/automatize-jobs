"use client";

import { useState, useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import Loader from "./loader";

type DebouncedTextEditorProps = {
  /** Valor inicial del editor */
  initialValue: string;
  /** Función que ejecuta la query de actualización */
  onSave: (value: string) => Promise<void>;
  /** Tiempo de debounce en ms (default 5000 = 5s) */
  debounceTime?: number;
  /** Placeholder cuando el editor está vacío */
  placeholder?: string;
  /** Altura del editor (default "300px") */
  height?: string;
  /** Lenguaje del editor (default "markdown") */
  language?: string;
};

export function DebouncedTextEditor({
  initialValue,
  onSave,
  debounceTime = 2500,
  placeholder,
  height = "300px",
  language = "markdown",
}: DebouncedTextEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const lastSavedRef = useRef(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  // Sync if initialValue changes externally (e.g. section switch)
  useEffect(() => {
    setValue(initialValue);
    lastSavedRef.current = initialValue;
    setStatus("idle");
  }, [initialValue]);

  useEffect(() => {
    if (value === lastSavedRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setStatus("saving");
        await onSave(value);
        lastSavedRef.current = value;
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        console.error("Error saving editor:", err);
        setStatus("error");
      }
    }, debounceTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, onSave, debounceTime]);

  // Placeholder via Monaco decoration
  const handleMount: OnMount = (editor) => {
    if (!placeholder) return;

    const updatePlaceholder = () => {
      const model = editor.getModel();
      const isEmpty = !model || model.getValue() === "";
      const el = document.getElementById("monaco-placeholder");
      if (el) el.style.display = isEmpty ? "block" : "none";
    };

    const disposable = editor.onDidChangeModelContent(updatePlaceholder);
    updatePlaceholder();

    editor.onDidDispose(() => disposable.dispose());
  };



  return (
    <div className="w-full h-full overflow-y-hidden w-96">
      <div className="w-full h-full">
        {/* Placeholder overlay */}
        <div className="w-full relative">
          {placeholder && (
            <div
              id="monaco-placeholder"
              className="absolute top-4 left-14 text-sm text-white/20 pointer-events-none z-10 select-none"
              style={{ display: value ? "none" : "block" }}
            >
              {placeholder}
            </div>
          )}

        </div>
        

        <Editor
          height={"100%"}
           className="border-2"
          language={language}

          loading={<Loader />}
          value={value}
          onChange={(val) => setValue(val ?? "")}
          onMount={handleMount}
          theme="light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "off",
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            renderLineHighlight: "none",
            overviewRulerLanes: 0,
            folding: false,
            contextmenu: false,
            automaticLayout: true
          }}
        />
      </div>

      {/* Status indicator — mirrors DebouncedTextarea */}
      <div className="h-4">
        {status === "saving" && (
          <span className="text-xs text-white/40 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400/60 animate-pulse" />
            Guardando...
          </span>
        )}
        {status === "saved" && (
          <span className="text-xs text-green-500 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            Guardado ✓
          </span>
        )}
        {status === "error" && (
          <span className="text-xs text-red-400 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
            Error al guardar
          </span>
        )}
      </div>
    </div>
  );
}