import './globals.css';

export const metadata = {
  title: 'Dr. Atena Muresan — Chirurgie Estetică',
  description: 'Precizie chirurgicală, rezultate naturale',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  )
}
