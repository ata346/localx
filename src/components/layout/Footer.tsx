import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import logoImage from '@/assets/logo.png';
import founderhuntBadge from '@/assets/founderhunt-badge.png';
import founderhuntLogo from '@/assets/founderhunt-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Electrician', path: '/services/electrician' },
      { name: 'Plumber', path: '/services/plumber' },
      { name: 'Mechanic', path: '/services/mechanic' },
      { name: 'Technician', path: '/services/technician' },
      { name: 'Barber & Salon', path: '/services/barber' },
      { name: 'Freelancers', path: '/services/freelancer' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Partner with Us', path: '/auth?mode=register&role=provider' },
      { name: 'Contact', path: '/contact' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Safety', path: '/safety' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  };

  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/919876543210?text=Hi! I need help with LOCAL X', '_blank');
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src={logoImage} alt="LOCAL X" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-background/70 text-sm mb-6 max-w-sm">
              Your trusted local service marketplace. Book verified professionals for all your home and personal service needs.
            </p>
            {/* WhatsApp Support */}
            <button
              onClick={handleWhatsAppSupport}
              className="inline-flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-lg hover:bg-success/90 transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </button>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-10 pt-6">
          <div className="flex flex-col items-center gap-6">
            {/* FounderHunt AI Branding */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://founderhuntai.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={founderhuntLogo} 
                    alt="FounderHunt AI" 
                    className="h-8 w-auto"
                  />
                </a>
                <p className="text-background/70 text-sm">
                  This MVP was developed by{' '}
                  <a
                    href="https://founderhuntai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    FounderHunt AI
                  </a>{' '}
                  — Turning startup ideas into MVPs
                </p>
              </div>
            </div>
            {/* Copyright */}
            <p className="text-background/60 text-sm">
              © {currentYear} LOCAL X. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
