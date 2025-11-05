import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, PhoneCall, CheckCircle2, Truck, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fireworksData } from '@/data/products';

const WA_NUMBER = '60137340415';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hi%20BMFireworks!%20Saya%20berminat%20dengan%20program%20rakan%20niaga.`;

const Sales = () => {
  const demoItems = fireworksData.filter(i => i.videoUrl && i.videoUrl.trim() !== '').slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* 1) HERO */}
      <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_55%)] pointer-events-none" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <img
              src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1762139873/bearboom_x_bmfireworks_1_ec7aua.png"
              alt="Bearboom × BMFireworks"
              className="h-16 w-auto mb-6 drop-shadow-lg"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-300 leading-tight">
              Mercun Harga Kilang • Tak Perlu Beli Banyak
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-yellow-100">
              Terus dari kilang BM Fireworks — stok sah, siap bantu urus permit.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-yellow-200 text-sm">
              <span className="px-2 py-1 border border-yellow-400/60 rounded">Licensed & Legal</span>
              <span className="px-2 py-1 border border-yellow-400/60 rounded">Fast Response</span>
              <span className="px-2 py-1 border border-yellow-400/60 rounded">Nationwide Delivery</span>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold">
                <Link to="/products">Lihat Senarai Harga</Link>
              </Button>
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold">
                <a href={WA_URL} target="_blank" rel="noreferrer">WhatsApp Sekarang</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2) KENAPA PILIH KAMI */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">Kenapa Pilih Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold">✅ Harga Kilang Asli</h3>
              <p className="text-slate-600 mt-2">Terus dari BM Fireworks — bukan reseller biasa.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold">🚫 Tiada MOQ</h3>
              <p className="text-slate-600 mt-2">Boleh mula kecil-kecilan. Fleksibel ikut bajet.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold">📜 Bimbingan Permit</h3>
              <p className="text-slate-600 mt-2">Kami guide proses PDRM sampai lulus.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold">🚚 Hantar Seluruh Malaysia</h3>
              <p className="text-slate-600 mt-2">Pilihan lori / courier khas mengikut stok.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) PROGRAM RAKAN NIAGA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 text-center mb-8">Kami Bantu Semua Jenis Peniaga Mercun</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-sm">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="text-xl font-semibold">Starter Reseller</h3>
              <p className="text-slate-600 mt-1">Baru nak mula? Boleh start 1 karton, harga fleksibel.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-sm">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-xl font-semibold">Event & Wedding Planner</h3>
              <p className="text-slate-600 mt-1">Mercun premium, sparklers, dengan panduan keselamatan.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-sm">
              <div className="text-3xl mb-2">🚛</div>
              <h3 className="text-xl font-semibold">Dealer Tetap</h3>
              <p className="text-slate-600 mt-1">Volume tinggi? Diskaun khas & stok priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) PROSES URUSAN */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">Proses Urusan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <PhoneCall className="h-6 w-6 text-slate-700" />
              <h3 className="mt-3 text-lg font-semibold">Isi Borang / WhatsApp</h3>
              <p className="text-slate-600 mt-1">Hubungi kami, kami akan cadangkan item sesuai.</p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-slate-700" />
              <h3 className="mt-3 text-lg font-semibold">Pilih Stok & Jadual</h3>
              <p className="text-slate-600 mt-1">Sahkan pilihan & tetapkan penghantaran.</p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <Truck className="h-6 w-6 text-slate-700" />
              <h3 className="mt-3 text-lg font-semibold">Barang Dihantar</h3>
              <p className="text-slate-600 mt-1">Support lepas jualan sentiasa tersedia.</p>
            </div>
          </div>

          {/* Video proses placeholder */}
          <div className="mt-8">
            <div className="aspect-video w-full border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-sm uppercase tracking-wide">
              Video Proses Warehouse Placeholder
            </div>
            <p className="text-sm text-slate-500 mt-2">Letak video proses gudang Bearboom × BM Fireworks di sini.</p>
          </div>
        </div>
      </section>

      {/* 5) PRODUK & VIDEO DEMO */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6">Produk & Video Demo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoItems.map(item => (
              <div key={item.id} className="bg-white/5 rounded-xl border border-yellow-400/30 overflow-hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full aspect-video relative cursor-pointer">
                      <img src={item.image} alt={item.name.en} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-yellow-400 text-slate-900 p-3 rounded-full shadow-lg"><Play className="h-6 w-6" /></div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                    <DialogHeader>
                      <DialogTitle className="text-lg sm:text-xl font-bold text-left text-slate-900">{item.name.en}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full">
                      {item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={item.videoUrl.replace('watch?v=', 'embed/')}
                          title={item.name.en}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      ) : (
                        <video
                          src={item.videoUrl}
                          title={item.name.en}
                          className="w-full h-full rounded-lg"
                          controls
                          preload="metadata"
                          controlsList="nodownload"
                          disablePictureInPicture
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="p-3">
                  <h3 className="text-yellow-200 font-semibold text-sm line-clamp-1">{item.name.en}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-yellow-400 text-slate-900 hover:bg-yellow-300"><Link to="/products">Lihat Semua Video</Link></Button>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-white"><a href={WA_URL} target="_blank" rel="noreferrer">Minta Senarai Produk</a></Button>
          </div>
        </div>
      </section>

      {/* 6) TESTIMONI */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">Testimoni Rakan Niaga</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-semibold">Pelanggan #{i}</p>
                    <p className="text-sm text-slate-500">Peniaga Bazar</p>
                  </div>
                </div>
                <p className="mt-3 text-slate-700">“Tak sangka senang urus permit bila join Bearboom. Harga pun betul-betul kilang!”</p>
                <div className="mt-2 text-amber-400">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) FAQ + PERMIT SUPPORT */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center">FAQ & Permit Support</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>Perlu lesen ke?</AccordionTrigger>
              <AccordionContent>Kami hanya bekalkan produk sah & berlesen. Kami juga boleh bimbing proses permit PDRM.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Berapa lama penghantaran?</AccordionTrigger>
              <AccordionContent>Biasanya 2–5 hari bekerja bergantung pada lokasi & kuantiti.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Cara bayaran?</AccordionTrigger>
              <AccordionContent>Online banking / tunai semasa pickup (untuk volum tertentu). Resit rasmi disediakan.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Produk apa yang ada?</AccordionTrigger>
              <AccordionContent>Pop-Pop, Sparkle, Fountain, Rocket, One Shot, Cake 49/88/138/… dan lain-lain.</AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 p-5 rounded-xl border-2 border-yellow-300 bg-yellow-50 text-slate-800 text-center">
            <p className="font-semibold">Nak Mohon Permit PDRM? Kami Boleh Bantu.</p>
            <div className="mt-3 flex justify-center">
              <Button asChild className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold"><a href={WA_URL} target="_blank" rel="noreferrer">Dapatkan Bantuan Permit</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8) CSR / KOMUNITI */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Sokongan Komuniti</h2>
          <p className="text-slate-700 max-w-3xl">Bearboom × BM Fireworks bangga menyokong aktiviti komuniti & perayaan tempatan — meraikan tradisi Malaysia dengan cara yang sah & selamat.</p>
          <div className="mt-6 h-44 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
            Ruang gambar sponsor/event komuniti (placeholder)
          </div>
        </div>
      </section>

      {/* 9) CTA AKHIR */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506968430777-bf7784a87f23?q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300">Sedia Jadi Rakan Niaga Bearboom? Dapatkan Harga Kilang Sekarang!</h2>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold"><Link to="/products">Isi Borang Borong</Link></Button>
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold"><a href={WA_URL} target="_blank" rel="noreferrer">WhatsApp Sekarang</a></Button>
          </div>
          <p className="mt-4 text-yellow-100/90 text-sm">📞 WhatsApp • ✉️ Emel • ⏰ Isnin–Sabtu 9AM–6PM • 📜 Licensed by Malaysian Govt</p>
        </div>
      </section>
    </div>
  );
};

export default Sales;


