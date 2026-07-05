"use client";

import { useRef, useState } from "react";
import { ImagePlus, Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { useConfirm } from "./ConfirmDialog";
import { Input, Spinner } from "./ui";

const VALID_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // matches /api/upload's limit

/**
 * Product image field: drag-drop / click to upload to Cloudinary via
 * /api/upload, or paste an image URL directly. `value` is the final URL.
 */
export function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const confirm = useConfirm();
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const removeImage = async () => {
    const ok = await confirm({
      title: "Remove this image?",
      description:
        "The image is cleared from the form. Nothing changes on the product until you save.",
      confirmText: "Remove",
      destructive: true,
    });
    if (ok) onChange("");
  };

  async function upload(file: File) {
    if (!VALID_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Upload a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("File too large — max 5MB.");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        onChange(data.data.url);
        toast.success("Image uploaded");
      } else {
        toast.error(data.error || "Failed to upload image");
      }
    } catch {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative rounded-lg border border-admin-border bg-admin-bg/60 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Product preview"
            className="mx-auto max-h-44 max-w-full rounded object-contain"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute right-2 top-2 rounded-md bg-white/90 p-1.5 text-red-500 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Remove image"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) upload(file);
          }}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 transition-colors",
            dragging
              ? "border-admin-primary bg-admin-primary/5"
              : "border-admin-border hover:border-admin-primary/50 hover:bg-admin-hover/50"
          )}
        >
          {uploading ? (
            <>
              <Spinner />
              <span className="text-sm text-admin-muted">Uploading…</span>
            </>
          ) : (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-admin-primary/10 text-admin-primary">
                <ImagePlus className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-admin-ink">
                Click to upload or drag &amp; drop
              </span>
              <span className="text-xs text-admin-faint">JPEG, PNG or WebP · max 5MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={VALID_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />

      <div className="relative">
        <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-faint" />
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL directly"
          className="pl-9"
        />
      </div>
    </div>
  );
}
