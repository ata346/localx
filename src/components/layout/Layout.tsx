import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
