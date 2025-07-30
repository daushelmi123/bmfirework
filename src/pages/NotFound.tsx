import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 relative overflow-hidden">
      {/* Berlesen decorative elements */}
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">🔍</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">❓</div>
      
      {/* 404 pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-8 h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="border-2 border-slate-400 rounded-full w-12 h-12"></div>
          ))}
        </div>
      </div>
      
      <div className="text-center relative bg-gradient-to-br from-white to-yellow-50 p-12 rounded-2xl shadow-2xl border-2 border-slate-200">
        <div className="text-6xl mb-6">🌙❓</div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4">404</h1>
        <p className="text-2xl text-slate-700 mb-6">Alamak! Halaman tak jumpa la!</p>
        <p className="text-lg text-slate-600 mb-8">Mungkin mercun dah habis terjual atau link salah? 😅</p>
        <a 
          href="/" 
          className="inline-block bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 px-8 py-4 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          🏠 Balik Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
