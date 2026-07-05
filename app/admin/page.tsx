import { redirect } from "next/navigation";

// The admin home moved to the console dashboard. Old bookmarks (and the
// post-login redirect in auth.config.ts) land here and get forwarded.
export default function AdminIndex() {
  redirect("/admin/dashboard");
}
