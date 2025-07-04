import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/authContext"
import './globals.css'
import ClientLayout from "@/components/ClientLayout"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Urban Link',
  description: 'Connect with your urban community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}