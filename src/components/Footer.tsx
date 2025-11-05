
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/products', label: t('footer.links.catalogue') },
    { to: '/packages', label: t('footer.links.packages') },
    { to: '/permit-guide', label: t('footer.links.permit') },
    { to: '/safety-guide', label: t('footer.links.safety') },
    { to: '/testimonials', label: t('footer.links.testimonials') },
    { to: '/contact', label: t('footer.links.contact') },
  ];

  const contactInfo = [
    t('footer.contact.phone'),
    t('footer.contact.email'),
    t('footer.contact.hours'),
    t('footer.contact.location'),
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-yellow-50 py-8 sm:py-12 relative overflow-hidden">
      {/* celebrasi decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 gap-8 h-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-yellow-300 rounded-full w-8 h-8"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info - Mobile optimized */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1762139873/bearboom_x_bmfireworks_1_ec7aua.png"
                alt="Bearboom × BMFireworks"
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-yellow-100 mb-4 text-sm sm:text-base">
              {t('footer.description')}
            </p>
            <p className="text-yellow-200 text-sm sm:text-base">
              {t('footer.partnership')}
            </p>
          </div>

          {/* Quick Links - Mobile optimized */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-yellow-100">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Mobile optimized */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-yellow-100">{t('footer.contact.title')}</h3>
            <div className="space-y-2 text-yellow-200 text-sm sm:text-base">
              {contactInfo.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-yellow-200">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} BMFireworks. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">{t('footer.legalNote')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
