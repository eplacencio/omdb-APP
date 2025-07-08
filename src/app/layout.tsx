import { Metadata } from "next"
import ReactQueryProvider from "../providers/ReactQueryProvider"
import "./globals.css"

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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400600700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
