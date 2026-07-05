import { v2 as cloudinary } from "cloudinary";
import { getCloudinarySettings } from "./settings";

/**
 * Cloudinary client configured from the dynamic Apps settings (console-managed,
 * env vars as fallback — see lib/settings.ts). Config is resolved per call
 * instead of at import time so credential changes in the console apply
 * immediately, without a redeploy.
 */
export async function getCloudinary() {
  const { cloudName, apiKey, apiSecret } = await getCloudinarySettings();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Add credentials under Apps → Cloudinary in the admin console (or set the CLOUDINARY_* env vars)."
    );
  }
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
  return cloudinary;
}
