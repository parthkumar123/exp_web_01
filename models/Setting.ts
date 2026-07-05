import mongoose, { Schema, Document } from "mongoose";

/**
 * Dynamic, admin-managed configuration. One document per namespace — today
 * only "cloudinary" (the Apps section), but any future third-party integration
 * gets its own namespace with zero migrations. Secret fields inside `data`
 * are encrypted at rest by the settings service (see lib/settings.ts);
 * this model stays schema-light on purpose.
 *
 * Collection name: `settings`.
 */
export interface ISetting extends Document {
  namespace: string;
  data: Record<string, unknown>;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    namespace: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      default: {},
    },
    updatedBy: { type: String },
  },
  { timestamps: true, minimize: false }
);

const Setting =
  mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);

export default Setting;
