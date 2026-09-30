import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orange Open — Le monde se joue ici",
  description:
    "Dans deux mois, les meilleurs joueurs de billard américain se retrouvent à Orange, dans le Vaucluse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
