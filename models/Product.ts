import mongoose, { Schema, Model } from "mongoose";

export type ProductType = "formulation" | "technical" | "solvent";

export interface IProduct {
  _id?: string;
  slug: string;
  name: string;
  /** Which business line this product belongs to. Drives layout + which fields apply. */
  productType: ProductType;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
  /** When "mode_of_action", frontend shows "Mode of Action" instead of "Target Pests" */
  targetPestsLabelType?: "target_pests" | "mode_of_action";
  targetPests: string[];
  applicableCrops: string[];
  dosage: string;
  applicationMethod: string;
  packSizes: string[];
  keyFeatures: string[];
  benefits: string[];
  aboutProduct: string;
  safetyInformation: string[];
  safetyNote: string;
  // --- B2B spec fields (technicals & solvents) ---
  casNumber?: string;
  purity?: string;
  appearance?: string;
  molecularFormula?: string;
  hsnCode?: string;
  packing: string[];
  applications: string[];
  moq?: string;
  // --- Pricing / MRP (optional for every line) ---
  /** Single price = priceMin (priceMax empty/equal). Range = priceMin..priceMax. Empty = "Price on request". */
  priceMin?: number;
  priceMax?: number;
  currency: string;
  isActive: boolean;
  isFeatured: boolean;
  /** Admin attribution — set server-side from the session on create/update. */
  createdBy?: { name?: string; email?: string };
  updatedBy?: { name?: string; email?: string };
  createdAt?: Date;
  updatedAt?: Date;
}

/** Required only for finished formulations — technicals/solvents don't carry these. */
function requiredForFormulation(this: { productType?: ProductType }): boolean {
  return this.productType === "formulation";
}

/** Category applies to formulations and technicals (by AI class), not to solvents. */
function requiredUnlessSolvent(this: { productType?: ProductType }): boolean {
  return this.productType !== "solvent";
}

const ProductSchema = new Schema<IProduct>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productType: {
      type: String,
      enum: ["formulation", "technical", "solvent"],
      default: "formulation",
      index: true,
    },
    category: {
      type: String,
      required: [requiredUnlessSolvent, "Category is required"],
      enum: {
        values: [
          "Insecticides",
          "Fungicides",
          "Herbicides",
          "PGR",
          "Fertilizers",
          "Biological",
        ],
        // Allow an unset category (solvents); only validate when a value is present.
        message: "{VALUE} is not a valid category",
      },
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    activeIngredient: {
      type: String,
      required: [requiredForFormulation, "Active ingredient is required"],
    },
    targetPestsLabelType: {
      type: String,
      enum: ["target_pests", "mode_of_action"],
      default: "target_pests",
    },
    targetPests: {
      type: [String],
      default: [],
    },
    applicableCrops: {
      type: [String],
      default: [],
    },
    dosage: {
      type: String,
      required: [requiredForFormulation, "Dosage information is required"],
    },
    applicationMethod: {
      type: String,
      required: [requiredForFormulation, "Application method is required"],
    },
    packSizes: {
      type: [String],
      default: [],
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    aboutProduct: {
      type: String,
      required: [requiredForFormulation, "About product information is required"],
    },
    safetyInformation: {
      type: [String],
      default: [],
    },
    safetyNote: {
      type: String,
      default:
        "Always read the product label carefully before use. Follow all safety precautions and local regulations.",
    },
    // --- B2B spec fields (technicals & solvents) ---
    casNumber: { type: String, trim: true },
    purity: { type: String, trim: true },
    appearance: { type: String, trim: true },
    molecularFormula: { type: String, trim: true },
    hsnCode: { type: String, trim: true },
    packing: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    moq: { type: String, trim: true },
    // --- Pricing / MRP ---
    priceMin: { type: Number, min: 0 },
    priceMax: { type: Number, min: 0 },
    currency: { type: String, default: "INR", trim: true },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // Admin attribution — written by the API routes, never by client payloads.
    createdBy: {
      name: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
    updatedBy: {
      name: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Prevent model recompilation in development
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
