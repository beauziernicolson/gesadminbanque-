import { AdminShell } from "@/components/admin-shell";
import { AccessGate } from "@/components/access-gate";
import { checkAdminAccess, isLocalDesignPreview } from "@/lib/supabase/admin-access";

export default async function AdminPage({ params }: { params: Promise<{ section?: string[] }> }) {
  const { section = [] } = await params;
  if (isLocalDesignPreview()) return <AdminShell section={section.join("/")} />;
  const access = await checkAdminAccess();
  if (!access.allowed) return <AccessGate reason={access.reason} login={access.login} />;
  return <AdminShell section={section.join("/")} />;
}
