import { ThemeProvider } from "@/components/theme-provider";
import "leaflet/dist/leaflet.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
