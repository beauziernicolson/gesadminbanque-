import { LoginForm } from "@/components/login-form";
import { isLocalDesignPreview } from "@/lib/supabase/admin-access";

export default function LoginPage() {
  return <main className="gate"><LoginForm localPreviewEnabled={isLocalDesignPreview()}/></main>;
}
