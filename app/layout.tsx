import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GES Admin",
  description: "Espace d’administration GES",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
