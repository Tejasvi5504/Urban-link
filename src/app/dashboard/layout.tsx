import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: 'Dashboard - UrbanLink',
  description: 'Urban Planning Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider defaultTheme="system" attribute="class">
        {children}
      </ThemeProvider>
    </div>
  );
}
