import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
    title: "Mediva Clinic",
    description: "MEDIVA CLINIC - Клиника эстетической медицины в Ташкенте",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className="antialiased min-h-screen flex flex-col relative overflow-x-hidden" suppressHydrationWarning>
                <Navbar />
                <main className="flex-1 relative z-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
