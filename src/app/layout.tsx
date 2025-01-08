import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kusina de Amadeo",
  description: "Your favorite Filipino restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.className} dark text-foreground bg-background`}>
        <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black">
          <div className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" style={{ background: "radial-gradient(600px at 0px 0px, rgba(234, 88, 12, 0.15), transparent 80%)" }} />
          <Navbar />
          <main className="relative z-10 mx-auto min-h-screen max-w-screen-2xl px-2.5 md:px-20 pt-16">
            {children}
          </main>
          <Footer />
          <div className="fixed inset-0 z-0 bg-[url(/images/pattern.svg)] opacity-5" />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "linear-gradient(to right, #1f2937, #111827)",
              color: "#fff",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
            },
            className: "font-medium",
          }}
        />
      </body>
    </html>
  );
}
