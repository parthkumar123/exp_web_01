import { Toaster } from "sonner";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { ConfirmProvider } from "@/components/admin/ConfirmDialog";
import { AdminShell } from "@/components/admin/AdminShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <ConfirmProvider>
        <AdminShell>{children}</AdminShell>
        <Toaster position="bottom-right" richColors />
      </ConfirmProvider>
    </AdminGuard>
  );
}
