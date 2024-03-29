import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import AuthContaxt from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "massenger",
    description: "massemger clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContaxt>
                    <ToasterContext />
                    <ActiveStatus />
                    {children}
                </AuthContaxt>
            </body>
        </html>
    );
}
