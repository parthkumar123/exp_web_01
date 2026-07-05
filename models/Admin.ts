import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  role: "admin" | "superadmin";
  name?: string;
  image?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// The Admin collection IS the sign-in allowlist: a Google account can access
// the panel only if a document with its email exists here. Admins are managed
// from /admin/admins (superadmin) — no env vars, no redeploy needed.
const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
    name: String,
    image: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
