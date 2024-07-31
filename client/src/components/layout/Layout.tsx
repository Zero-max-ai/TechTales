import React from 'react';
import Navbar from '../Navbar'
import Footer from '../Footer'

type LayoutProps = {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;
