import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './componenst/modals/LoginModal'
import RegisterModal from './componenst/modals/RegisterModal'
import Navbar from './componenst/navbar/Navbar'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './componenst/modals/RentModal'
import ClientOnly from './componenst/ClientOnly'
import SearchModal from './componenst/modals/SearchModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ClientOnly> */}
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {/* </ClientOnly> */}
        <div className="pb-20  pt-28">{children}</div>
      </body>
    </html>
  )
}
