import Modal from './componenst/modals/Modal'
import Navbar from './componenst/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal isOpen title="Hello world" actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
