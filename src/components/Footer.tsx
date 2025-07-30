
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-yellow-50 py-8 sm:py-12 relative overflow-hidden">
      {/* Berlesen decorative elements */}
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
              <span className="text-xl sm:text-2xl">🌙</span>
              <span className="text-lg sm:text-xl font-bold text-yellow-100">MercunBerlesen.com</span>
            </div>
            <p className="text-yellow-100 mb-4 text-sm sm:text-base">
              Kedai mercun berlesen online terbaik Malaysia dengan 100+ jenis bunga api. 
              Pakej majlis & konsultasi permit tersedia.
            </p>
            <p className="text-yellow-200 text-sm sm:text-base">
              Distributor mercun berlesen di Malaysia 🎆
            </p>
          </div>

          {/* Quick Links - Mobile optimized */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-yellow-100">Link Pantas</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">Mercun Berlesen</Link></li>
              <li><Link to="/packages" className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">Pakej Majlis</Link></li>
              <li><Link to="/permit-guide" className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">Panduan Permit</Link></li>
              <li><Link to="/safety-guide" className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">Panduan Keselamatan</Link></li>
              <li><Link to="/testimonials" className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">Testimoni</Link></li>
              <li><Link to="/contact" className="text-yellow-200 hover:text-yellow-100 transition-colors text-sm sm:text-base">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info - Mobile optimized */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-yellow-100">Hubungi</h3>
            <div className="space-y-2 text-yellow-200 text-sm sm:text-base">
              <p>📱 WhatsApp: +60 13-734 0415</p>
              <p>📧 Email: info@mercunberlesen.com</p>
              <p>🕒 Isnin-Sabtu: 9AM-6PM</p>
              <p>📍 Kuala Lumpur, Malaysia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-yellow-200">
          <p className="text-sm sm:text-base">&copy; 2024 MercunBerlesen.com. Mercun Berlesen Terbaik! 🌙✨</p>
          <p className="mt-2 text-xs sm:text-sm">Distributor mercun berlesen. Sila patuhi peraturan tempatan & dapatkan permit.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
