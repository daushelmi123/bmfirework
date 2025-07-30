
import { FileText, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PermitGuide = () => {
  const handleWhatsAppConsultation = () => {
    const message = "Hi! I need help with fireworks permit application. Can you provide consultation?";
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden">
      {/* Berlesen decorative elements */}
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">📄</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">🔍</div>
      
      {/* Document pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 gap-8 h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="border border-slate-400 w-8 h-8"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">📄🌙</div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Panduan Permit Bunga Api
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Nak main mercun Berlesen dengan selamat & sah? Ikut panduan ni step by step! 🎆
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-red-50 to-yellow-50 border-2 border-red-300 rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Penting Untuk Diingat!</h3>
              <p className="text-red-700">
                Main mercun tanpa permit adalah salah di sisi undang-undang Malaysia. Boleh kena denda atau penjara tau! 
                Pastikan ada permit sebelum beli atau main mercun.
              </p>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Cara Mohon Permit Step-by-Step
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-100 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Check Kelayakan</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>✨ Warganegara Malaysia atau penduduk tetap</li>
                  <li>✨ Umur minimum: 21 tahun</li>
                  <li>✨ Tiada rekod jenayah berkaitan letupan</li>
                  <li>✨ Ada sebab munasabah (sambutan Berlesen, majlis, etc.)</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-slate-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Sediakan Dokumen</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>🌙 Salinan IC (depan & belakang)</li>
                  <li>🌙 Borang permohonan lengkap (Borang PDRM)</li>
                  <li>🌙 Detail majlis & peta lokasi</li>
                  <li>🌙 Pelan keselamatan</li>
                  <li>🌙 Bukti insurans (kalau perlu)</li>
                  <li>🌙 Resit bayaran yuran permohonan</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-slate-600 to-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Hantar Permohonan</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>🚓 Pergi balai polis (PDRM) terdekat</li>
                  <li>🚓 Serahkan semua dokumen</li>
                  <li>🚓 Bayar yuran (RM 50 - RM 200)</li>
                  <li>🚓 Ambil resit pengakuan</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-yellow-600 to-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Proses & Kelulusan</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>✅ Masa proses: 7-14 hari bekerja</li>
                  <li>✅ Polis mungkin buat pemeriksaan lokasi</li>
                  <li>✅ Ada syarat-syarat kelulusan</li>
                  <li>✅ Ambil permit bila dah lulus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Safety Requirements */}
          <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <CheckCircle className="mr-3 h-6 w-6 text-slate-600" />
              Syarat Keselamatan
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>🎆 Minimum 50m dari bangunan</li>
              <li>🎆 Ada alat pemadam api</li>
              <li>🎆 Ada pengendali terlatih</li>
              <li>🎆 Laluan kecemasan jelas</li>
              <li>🎆 Check cuaca dulu</li>
              <li>🎆 Kawalan orang ramai</li>
            </ul>
          </div>

          {/* Restricted Areas */}
          <div className="bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
              Kawasan Larangan
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>⛔ Dekat lapangan terbang</li>
              <li>⛔ Hospital & klinik</li>
              <li>⛔ Sekolah & institusi pendidikan</li>
              <li>⛔ Stesen minyak & gas</li>
              <li>⛔ Hutan simpan & taman</li>
              <li>⛔ Kawasan perumahan (tanpa kebenaran)</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-slate-100 to-yellow-100 rounded-xl p-8 text-center shadow-xl">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Nak Bantuan Mohon Permit?</h2>
          
          <div className="flex justify-center mb-6">
            <Button
              onClick={handleWhatsAppConsultation}
              className="bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-100 hover:from-slate-600 hover:to-slate-700 shadow-lg"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Konsultasi
            </Button>
          </div>

          <p className="text-slate-700 max-w-2xl mx-auto">
            Team kami ada pengalaman bantu customer buat permohonan permit. 
            WhatsApp je untuk panduan lengkap supaya permohonan lulus dengan mudah!
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gradient-to-br from-yellow-50 to-slate-50 border-2 border-slate-300 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Info Tambahan</h3>
          <div className="text-slate-700 space-y-2">
            <p>🌙 Permit untuk satu majlis sahaja, tak boleh transfer</p>
            <p>🌙 Mercun tertentu perlu lesen khas</p>
            <p>🌙 Display profesional perlu pyrotechnician bertauliah</p>
            <p>🌙 Insurans mungkin wajib untuk majlis besar</p>
            <p>🌙 Mungkin perlu kelulusan majlis tempatan juga</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermitGuide;
