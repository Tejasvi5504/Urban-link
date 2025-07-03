import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/authContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Urban Link - Smart Collaboration for Smart Cities",
  description: "Streamlining interdepartmental cooperation for efficient urban governance",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
