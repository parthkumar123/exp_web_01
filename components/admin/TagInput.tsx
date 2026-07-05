"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input, Button } from "./ui";

/**
 * Array-of-strings field: type a value, press Enter (or Add) to append a chip.
 * Replaces the old per-field tempInput plumbing in the product form.
 */
export function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="secondary" onClick={add}>
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {value.map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-1 rounded-full bg-admin-primary/10 py-1 pl-3 pr-1.5 text-xs font-medium text-admin-primary"
            >
              {item}
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== idx))}
                className="rounded-full p-0.5 hover:bg-admin-primary/20"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
