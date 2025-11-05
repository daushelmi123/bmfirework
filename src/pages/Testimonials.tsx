
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ahmad Rahman",
    event: "Majlis Tunang celebrasi",
    rating: 5,
    text: "Mercun untuk majlis tunang masa celebrasi memang terbaik! Team Mercuncelebrasi tolong settle permit semua. Tetamu puji habis display mercun malam tu!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    event: "Sambutan Hari celebrasi",
    rating: 5,
    text: "Perfect untuk sambutan celebrasi! Pakej keluarga memang best, selamat dan semua suka. Anak-anak excited gila tengok bunga api. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
  },
  {
    id: 3,
    name: "David Lim",
    event: "Open House celebrasi Company",
    rating: 5,
    text: "Service memang professional! Diorang handle semua permit untuk open house celebrasi company. Display mercun malam tu memang spectacular!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
  },
  {
    id: 4,
    name: "Priya Sharma",
    event: "Majlis Doa Selamat celebrasi",
    rating: 5,
    text: "Buat surprise untuk family masa majlis doa selamat celebrasi. Pakej yang ambil memang cantik - warna-warni dan selamat. Terima kasih Mercuncelebrasi!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150"
  },
  {
    id: 5,
    name: "Raj Kumar",
    event: "Majlis Reunion celebrasi",
    rating: 5,
    text: "Kualiti mercun memang top! WhatsApp support dia laju je reply. Next celebrasi confirm order lagi untuk reunion family!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
  },
  {
    id: 6,
    name: "Lisa Wong",
    event: "Majlis Akad Nikah Syawal",
    rating: 5,
    text: "Surprise untuk majlis akad nikah bulan Syawal dengan mercun. Display romantik sangat! Senang je nak order dan team bantu untuk permit.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden">
      {/* celebrasi decorative elements */}
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">🎆</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">⭐</div>
      
      {/* Testimonial pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 gap-8 h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="border border-slate-400 rounded-lg w-8 h-8 transform rotate-12"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🌟🌙</div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Testimoni Pelanggan celebrasi
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Dengar sendiri cerita best dari customer yang dah meriah celebrasi dengan mercun kami! 🎉
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-slate-200 shadow-lg">
            <div className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-slate-700">Pelanggan Gembira</div>
          </div>
          <div className="text-center bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl border-2 border-yellow-200 shadow-lg">
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-slate-700 bg-clip-text text-transparent mb-2">1000+</div>
            <div className="text-slate-700">Majlis celebrasi Meriah</div>
          </div>
          <div className="text-center bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-slate-200 shadow-lg">
            <div className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-2">4.9/5</div>
            <div className="text-slate-700">Rating Terbaik</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-slate-100 to-yellow-100 p-3 rounded-full">
                  <Quote className="h-8 w-8 text-slate-600" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 text-center mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-center">
                  <div className="font-bold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-slate-700 to-yellow-600 text-white rounded-xl p-8 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-2xl opacity-30">🌙</div>
          <div className="absolute top-4 right-4 text-2xl opacity-30">✨</div>
          <div className="absolute bottom-4 left-6 text-xl opacity-20">🎆</div>
          <div className="absolute bottom-4 right-6 text-xl opacity-20">🎉</div>
          
          <div className="relative">
            <div className="text-4xl mb-4">🎆</div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-100">Nak celebrasi Meriah Macam Ni Juga?</h2>
            <p className="text-xl text-yellow-50 mb-6 max-w-2xl mx-auto">
              Join ratusan pelanggan yang dah percaya kami untuk majlis celebrasi diorang. 
              Jom buat celebrasi tahun ni paling memorable dengan mercun premium kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-yellow-400 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
              >
                Tengok Mercun
              </a>
              <a
                href="/packages"
                className="border-2 border-yellow-400 text-yellow-100 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-slate-800 transition-colors duration-200 shadow-lg"
              >
                Lihat Pakej
              </a>
            </div>
          </div>
        </div>

        {/* Review Submission */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-slate-50 rounded-xl p-8 text-center border-2 border-slate-200 shadow-lg">
          <div className="text-3xl mb-4">💬</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">celebrasi Best Dengan Mercuncelebrasi?</h3>
          <p className="text-slate-700 mb-6">
            Share la pengalaman & gambar celebrasi korang! Kami nak dengar cerita best korang.
          </p>
          <button
            onClick={() => {
              const message = "Hi! Nak share testimoni pasal mercun celebrasi dari Mercuncelebrasi.";
              const whatsappNumber = "+60137340415";
              const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
            }}
            className="bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-100 px-6 py-3 rounded-lg font-semibold hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-lg"
          >
            Share Review Anda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
