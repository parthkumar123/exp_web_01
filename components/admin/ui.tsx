"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

/* ---------------------------------------------------------------------------
   Senso Console UI primitives — small hand-rolled pieces sharing the admin
   token palette (see globals.css). Kept in one file: these are styling
   wrappers, not behavior-heavy components.
--------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "danger" | "dangerOutline" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-admin-primary text-white hover:bg-admin-primary-hover disabled:hover:bg-admin-primary",
  secondary:
    "border border-admin-border bg-admin-surface text-admin-body hover:bg-admin-hover",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600",
  dangerOutline:
    "border border-red-200 bg-admin-surface text-red-600 hover:bg-red-50",
  ghost: "text-admin-body hover:bg-admin-hover",
};

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }
>(function Button({ variant = "primary", className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        buttonStyles[variant],
        className
      )}
      {...props}
    />
  );
});

/** Link styled as a button (for "New product" etc.). */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
        buttonStyles[variant],
        className
      )}
      {...props}
    />
  );
}

const fieldStyles =
  "w-full rounded-lg border border-admin-border bg-admin-surface px-3 py-2 text-sm text-admin-ink placeholder:text-admin-faint focus:outline-none focus:ring-2 focus:ring-admin-primary/40 focus:border-admin-primary disabled:cursor-not-allowed disabled:bg-admin-hover";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(fieldStyles, className)} {...props} />;
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(fieldStyles, className)} {...props} />;
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={cn(fieldStyles, "pr-8", className)} {...props} />;
});

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-admin-ink", className)}
      {...props}
    />
  );
}

export function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-admin-muted">{children}</p>;
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-red-600">{children}</p>;
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-admin-border bg-admin-surface shadow-sm",
        className
      )}
      {...props}
    />
  );
}

/** Card with a titled header — the building block of sectioned forms. */
export function SectionCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="border-b border-admin-border px-5 py-4">
        <h2 className="text-sm font-semibold text-admin-ink">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-admin-muted">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </Card>
  );
}

type BadgeTone = "green" | "amber" | "red" | "blue" | "slate";

const badgeTones: Record<BadgeTone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  slate: "bg-slate-50 text-slate-600 ring-slate-500/20",
};

export function Badge({
  tone = "slate",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        badgeTones[tone],
        className
      )}
      {...props}
    />
  );
}

export function PageHeader({
  title,
  description,
  actions,
  icon,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  /** Optional brand/app mark rendered before the title (e.g. an app logo). */
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-admin-border bg-admin-surface p-1.5">
            {icon}
          </span>
        )}
        <div>
          <h1 className="text-lg font-semibold text-admin-ink">{title}</h1>
          {description && <p className="mt-0.5 text-sm text-admin-muted">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export type StatTone = "emerald" | "blue" | "amber" | "rose" | "violet" | "slate";

const statTones: Record<StatTone, string> = {
  emerald: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
  slate: "bg-slate-100 text-slate-600",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = "emerald",
  href,
}: {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  hint?: string;
  tone?: StatTone;
  /** Makes the whole card a link (e.g. to a pre-filtered products view). */
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-admin-muted">{label}</p>
        {Icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              statTones[tone]
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-admin-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-admin-faint">{hint}</p>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-xl border border-admin-border bg-admin-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-admin-primary/40 hover:shadow-md"
      >
        {body}
      </Link>
    );
  }
  return <Card className="p-5">{body}</Card>;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {Icon && (
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-admin-hover text-admin-muted">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <p className="text-sm font-semibold text-admin-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-admin-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-admin-primary border-t-transparent",
        className
      )}
    />
  );
}

/** Accessible on/off switch used for Active/Featured toggles. */
export function Toggle({
  checked,
  onChange,
  label,
  hint,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
  id: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-admin-border bg-admin-surface px-4 py-3"
    >
      <span>
        <span className="block text-sm font-medium text-admin-ink">{label}</span>
        {hint && <span className="block text-xs text-admin-muted">{hint}</span>}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors",
          checked ? "bg-admin-primary" : "bg-admin-border"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[22px]" : "left-0.5"
          )}
        />
      </button>
    </label>
  );
}
