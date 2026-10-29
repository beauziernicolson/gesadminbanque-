import { AccessGate } from "@/components/access-gate";
import { InterfaceStateGallery } from "@/components/interface-state-gallery";
import { isLocalDesignPreview } from "@/lib/supabase/admin-access";

export const dynamic = "force-dynamic";

export default function InterfaceStatesPage() {
  if (!isLocalDesignPreview()) return <AccessGate reason="La galerie d’états est réservée à l’aperçu local." />;
  return <InterfaceStateGallery/>;
}
