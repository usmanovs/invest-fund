import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geologica";
import "@fontsource-variable/golos-text";
import "./globals.css";

export const metadata: Metadata = {
  title: "Тамчы — инвестиции в индексные фонды США для Кыргызстана (концепция)",
  description:
    "Проверяем идею: простой способ постепенно инвестировать в индексные фонды США из Кыргызстана. Проект на стадии концепции, деньги не принимаются.",
};

export const viewport: Viewport = {
  themeColor: "#0a1f44",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
