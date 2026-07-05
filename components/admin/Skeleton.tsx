"use client";

import { cn } from "@/lib/cn";
import { Card } from "./ui";

/** Base shimmer block. Size it with width/height utilities. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-admin-border/60", className)} />;
}

/** Products-style table: filter bar + header + rows. */
export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-9 min-w-52 flex-1" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-28" />
      </div>
      <Card className="overflow-hidden">
        <div className="border-b border-admin-border bg-admin-bg/60 px-4 py-3">
          <Skeleton className="h-3.5 w-2/5" />
        </div>
        <div className="divide-y divide-admin-border">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <Skeleton className="h-10 w-10 flex-shrink-0 rounded-md" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
              <Skeleton className="hidden h-5 w-24 rounded-full md:block" />
              <Skeleton className="h-7 w-20" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/** Dashboard: stat tiles + activity/side panels. */
export function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="mt-3 h-7 w-14" />
            <Skeleton className="mt-2 h-3 w-28" />
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="border-b border-admin-border px-5 py-4">
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="divide-y divide-admin-border">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <Skeleton className="h-9 w-9 flex-shrink-0 rounded-md" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-2/5" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-5">
          <Card className="p-5">
            <Skeleton className="mb-4 h-4 w-28" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="py-2">
                <div className="mb-1.5 flex justify-between">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3.5 w-8" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/** Simple list card (admins). */
export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <Card>
      <div className="divide-y divide-admin-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-4">
            <Skeleton className="h-9 w-9 flex-shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </Card>
  );
}

/** Sectioned form (product edit) with a side rail. */
export function FormSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <div className="border-b border-admin-border px-5 py-4">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="space-y-5">
        <Card>
          <div className="border-b border-admin-border px-5 py-4">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="p-5">
            <Skeleton className="h-36 w-full" />
          </div>
        </Card>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

/** Profile card. */
export function ProfileSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3.5 w-52" />
        </div>
      </div>
      <div className="mt-6 space-y-3 border-t border-admin-border pt-5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-9 w-28" />
      </div>
    </Card>
  );
}
