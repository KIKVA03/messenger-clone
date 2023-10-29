"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface AuthContaxtProps {
    children: React.ReactNode;
}

export default function AuthContaxt({ children }: AuthContaxtProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
