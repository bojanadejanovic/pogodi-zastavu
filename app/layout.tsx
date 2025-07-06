import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pogodi Zastavu - Flag Guessing Game',
  description: 'Test your knowledge of world flags with this interactive guessing game!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col pt-8 md:pt-12">
            {/* Desktop scaling wrapper */}
            <div className="hidden md:flex fixed top-0 left-0 w-full h-full overflow-hidden justify-center items-start z-10">
              <div
                style={{
                  transform: 'scale(1.0)',
                  transformOrigin: 'top center',
                  width: '125vw',
                  height: '125vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '30px',
                }}
              >
                {/* ...main content here... */}
                {children}
              </div>
            </div>
            {/* Mobile fallback */}
            <div className="block md:hidden">
              {/* ...main content here... */}
            </div>
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
} 