import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  _id?: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
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
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Insecticides",
        "Fungicides",
        "Herbicides",
        "PGR",
        "Fertilizers",
        "Biological",
      ],
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
      required: [true, "Active ingredient is required"],
    },
    targetPests: {
      type: [String],
      required: [true, "Target pests are required"],
      default: [],
    },
    applicableCrops: {
      type: [String],
      required: [true, "Applicable crops are required"],
      default: [],
    },
    dosage: {
      type: String,
      required: [true, "Dosage information is required"],
    },
    applicationMethod: {
      type: String,
      required: [true, "Application method is required"],
    },
    packSizes: {
      type: [String],
      required: [true, "Pack sizes are required"],
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
      required: [true, "About product information is required"],
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
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
