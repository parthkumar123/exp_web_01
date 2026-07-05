"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

export interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn>(() => Promise.resolve(false));

/** Themed replacement for the native `confirm()`. Returns a promise<boolean>. */
export function useConfirm(): ConfirmFn {
  return useContext(ConfirmContext);
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    options: ConfirmOptions;
    resolve: (v: boolean) => void;
  } | null>(null);

  const confirm = useCallback<ConfirmFn>(
    (options) => new Promise<boolean>((resolve) => setState({ options, resolve })),
    []
  );

  const settle = useCallback((result: boolean) => {
    setState((s) => {
      s?.resolve(result);
      return null;
    });
  }, []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") settle(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, settle]);

  const o = state?.options;
  const destructive = o?.destructive;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => settle(false)}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-xl border border-admin-border bg-admin-surface p-5 shadow-xl"
          >
            <div className="flex gap-3">
              {destructive && (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </span>
              )}
              <div className="min-w-0">
                <h2 className="font-semibold text-admin-ink">{o?.title || "Are you sure?"}</h2>
                {o?.description && (
                  <p className="mt-1 text-sm leading-relaxed text-admin-muted">{o.description}</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => settle(false)}
                className="rounded-lg border border-admin-border px-3.5 py-2 text-sm font-medium text-admin-body transition-colors hover:bg-admin-hover"
              >
                {o?.cancelText || "Cancel"}
              </button>
              <button
                autoFocus
                onClick={() => settle(true)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium text-white transition-colors ${
                  destructive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-admin-primary hover:bg-admin-primary-hover"
                }`}
              >
                {o?.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
