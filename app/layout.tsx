import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roma1990 - Pomodoro Timer",
  description: "A retro flip clock Pomodoro timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
