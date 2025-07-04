import { ThemeProvider } from "@/components/theme-provider";
import "leaflet/dist/leaflet.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No authentication check needed anymore
  
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider defaultTheme="system" attribute="class">
        {children}
      </ThemeProvider>
    </div>
  );
}
