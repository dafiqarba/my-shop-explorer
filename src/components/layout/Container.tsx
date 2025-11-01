import { Outlet } from 'react-router'

import Footer from './Footer'
import { Header } from './Header'

const Container = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <main id="content" className="grow container max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Container
