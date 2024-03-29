import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const V10LET = localFont({
  src: "../public/fonts/V1OLET-Regular.otf",
  display: "swap",
  variable: "--font-violet",
});

const inter = Inter({ subsets: ["latin"] });

const jetmono = JetBrains_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetmono",
});

export const metadata: Metadata = {
  title: "0x054",
  description: "note embeddings experimentations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
    >
      <body
        className={`${V10LET.variable} ${inter.className} ${jetmono.variable}`}
      >
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
              disableTransitionOnChange={true}
              storageKey="theme"
            >
              <Toaster
                className="font-mono dark:bg-char-400"
                closeButton
                position="bottom-right"
              />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
