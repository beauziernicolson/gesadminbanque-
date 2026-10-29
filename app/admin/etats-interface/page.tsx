import { AccessGate } from "@/components/access-gate";
import { AdminShell } from "@/components/admin-shell";
import { checkAdminAccess, isLocalDesignPreview } from "@/lib/supabase/admin-access";

export const dynamic = "force-dynamic";

export default async function InterfaceStatesPage() {
  if (isLocalDesignPreview()) return <AdminShell section="etats-interface"/>;
  const access = await checkAdminAccess();
  if (!access.allowed) return <AccessGate reason={access.reason} login={access.login}/>;
  return <AdminShell section="etats-interface"/>;
}
