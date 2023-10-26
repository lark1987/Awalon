
export const metadata = {
  title: 'Awalon',
  description: 'Welcome to Awalon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
