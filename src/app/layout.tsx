import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LearningProvider } from "@/context/LearningContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export const metadata: Metadata = {
  title: "Clarivio Learn",
  description: "La piattaforma della community Clarivio: corsi interattivi, webinar, toolkit e risorse per padroneggiare l'AI generativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <LearningProvider>{children}</LearningProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
