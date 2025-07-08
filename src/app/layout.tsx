import { Metadata } from "next"
import ReactQueryProvider from "../providers/ReactQueryProvider"
import "./globals.css"
import { Bebas_Neue, Poppins } from 'next/font/google'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "OMDb APP",
  description:
    "An aplication to look for information about movies or series using the OMDB API",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
