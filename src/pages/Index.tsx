
import { Link } from 'react-router-dom';
import { Sparkles, Package, FileText, Star, Moon, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const Index = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium Authority */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-12 sm:py-20 lg:py-32 overflow-hidden">
        {/* Animated Premium decorations */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-10 left-10 animate-pulse">
            <Moon className="h-8 w-8 text-yellow-400 opacity-70" />
          </div>
          <div className="absolute top-20 right-20 animate-bounce">
            <Star className="h-6 w-6 text-yellow-400 opacity-60" />
          </div>
          <div className="absolute bottom-20 left-20 animate-pulse">
            <Star className="h-4 w-4 text-yellow-300 opacity-80" />
          </div>
          <div className="absolute bottom-32 right-16 animate-bounce">
            <Moon className="h-6 w-6 text-yellow-400 opacity-70" />
          </div>
          
          {/* Premium pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-yellow-400 transform rotate-45 w-6 h-6"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000')"
          }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center mx-auto">
            <div className="mb-6 text-6xl">🌙✨</div>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-yellow-300 drop-shadow-2xl">
              {t('home.hero.title')}
              <span className="block text-lg sm:text-2xl lg:text-3xl text-yellow-400 mt-2">
                {t('home.hero.subtitle')}
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-yellow-100 mb-6 sm:mb-8 drop-shadow-lg">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 hover:from-yellow-300 hover:to-yellow-400 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-bold shadow-2xl border-2 border-yellow-400"
              >
                <Link to="/products">
                  <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {t('home.hero.viewFireworks')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Merdeka Products Showcase */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-yellow-50 via-slate-50 to-yellow-50 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">🎆</div>
        <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
        <div className="absolute bottom-20 left-16 text-2xl opacity-10 animate-pulse">✨</div>
        <div className="absolute bottom-32 right-20 text-3xl opacity-15 animate-bounce">🎇</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent mb-4">
              ✨ Koleksi Mercun Merdeka Berlesen ✨
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">
              Produk istimewa untuk sambutan Merdeka yang meriah dan selamat!
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {/* Product 1: 4 138 Shot Merdeka */}
            <div className="group relative bg-white rounded-2xl shadow-lg border-3 border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square p-3 relative cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199058/fireworks_400x400/fireworks_400x400/resized_framed_product_91_4_138_Shoot_Cake_4_138.jpg"
                      alt="4 138 Shot Merdeka"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 no-select no-drag no-context"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-yellow-400 text-slate-800 p-3 rounded-full shadow-lg">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      4 138 Shot Merdeka
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      src="https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077619/HunterBoom/cm4shk2s0000g03ju9jme3n1g_wrp2hg.mp4"
                      title="4 138 Shot Merdeka"
                      className="w-full h-full rounded-lg no-select no-drag no-context"
                      controls
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-800 text-sm mb-1">4 138 Shot Merdeka</h3>
                <p className="text-yellow-600 font-bold text-lg">RM 100</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Play className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Click picture to play video</span>
                </div>
                <Link to="/products?category=MERDEKA FIREWORKS&product=97" className="inline-block mt-2">
                  <Button size="sm" className="bg-slate-600 text-yellow-100 hover:bg-slate-700 text-xs">
                    View in Store
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Product 2: 5138 Shoot Cake ABC */}
            <div className="group relative bg-white rounded-2xl shadow-lg border-3 border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square p-3 relative cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1753198938/fireworks_400x400/fireworks_400x400/resized_framed_product_0_5138_Shoot_Cake_28ABC29.jpg"
                      alt="5138 Shoot Cake ABC"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 no-select no-drag no-context"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-yellow-400 text-slate-800 p-3 rounded-full shadow-lg">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      5138 Shoot Cake (ABC)
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      src="https://res.cloudinary.com/de8w3ykvy/video/upload/v1753076871/HunterBoom/cm4l31g5200010cmq8qeahfje_gjzsmh.mp4"
                      title="5138 Shoot Cake ABC"
                      className="w-full h-full rounded-lg no-select no-drag no-context"
                      controls
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-800 text-sm mb-1">5138 Shoot Cake (ABC)</h3>
                <p className="text-yellow-600 font-bold text-lg">RM 250</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Play className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Click picture to play video</span>
                </div>
                <Link to="/products?category=MERDEKA FIREWORKS&product=901" className="inline-block mt-2">
                  <Button size="sm" className="bg-slate-600 text-yellow-100 hover:bg-slate-700 text-xs">
                    View in Store
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Product 3: 8 Shoot Roma Candle */}
            <div className="group relative bg-white rounded-2xl shadow-lg border-3 border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square p-3 relative cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199013/fireworks_400x400/fireworks_400x400/resized_framed_product_87_8_Shoot_Roma_Candle_280.jpg"
                      alt="8 Shoot Roma Candle"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 no-select no-drag no-context"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-yellow-400 text-slate-800 p-3 rounded-full shadow-lg">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      8 Shoot Roma Candle
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      src="https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077577/HunterBoom/cm3hcscy400070cle9y0fc0qv_n2ni5r.mp4"
                      title="8 Shoot Roma Candle"
                      className="w-full h-full rounded-lg no-select no-drag no-context"
                      controls
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-800 text-sm mb-1">8 Shoot Roma Candle</h3>
                <p className="text-yellow-600 font-bold text-lg">RM 45</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Play className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Click picture to play video</span>
                </div>
                <Link to="/products?category=MERDEKA FIREWORKS&product=988" className="inline-block mt-2">
                  <Button size="sm" className="bg-slate-600 text-yellow-100 hover:bg-slate-700 text-xs">
                    View in Store
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Product 4: 5414 Shoot Cake Thor */}
            <div className="group relative bg-white rounded-2xl shadow-lg border-3 border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square p-3 relative cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199101/fireworks_400x400/fireworks_400x400/resized_framed_5414_Shoot_Cake_Thor_V_Shape_5414.jpg"
                      alt="5414 Shoot Cake Thor"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 no-select no-drag no-context"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-yellow-400 text-slate-800 p-3 rounded-full shadow-lg">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      5414 Shoot Cake Thor
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      src="https://storage.googleapis.com/takeapp/media/cm3m7ak5r000g0ckwaav6fnq0.mp4"
                      title="5414 Shoot Cake Thor"
                      className="w-full h-full rounded-lg no-select no-drag no-context"
                      controls
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-800 text-sm mb-1">5414 Shoot Cake Thor</h3>
                <p className="text-yellow-600 font-bold text-lg">RM 450</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Play className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Click picture to play video</span>
                </div>
                <Link to="/products?category=MERDEKA FIREWORKS&product=999" className="inline-block mt-2">
                  <Button size="sm" className="bg-slate-600 text-yellow-100 hover:bg-slate-700 text-xs">
                    View in Store
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Product 5: 9138 Shoot Cake */}
            <div className="group relative bg-white rounded-2xl shadow-lg border-3 border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square p-3 relative cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199016/fireworks_400x400/fireworks_400x400/resized_framed_product_117_9138_Shoot_Cake.jpg"
                      alt="9138 Shoot Cake"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 no-select no-drag no-context"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-yellow-400 text-slate-800 p-3 rounded-full shadow-lg">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      9138 Shoot Cake
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      src="https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077868/HunterBoom/cm598lsfi000003l55pwdcx4b_j0398m.mp4"
                      title="9138 Shoot Cake"
                      className="w-full h-full rounded-lg no-select no-drag no-context"
                      controls
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-800 text-sm mb-1">9138 Shoot Cake</h3>
                <p className="text-yellow-600 font-bold text-lg">RM 450</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Play className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Click picture to play video</span>
                </div>
                <Link to="/products?category=MERDEKA FIREWORKS&product=1008" className="inline-block mt-2">
                  <Button size="sm" className="bg-slate-600 text-yellow-100 hover:bg-slate-700 text-xs">
                    View in Store
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Product 6: Double Shoot Banana Besar */}
            <div className="group relative bg-white rounded-2xl shadow-lg border-3 border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square p-3 relative cursor-pointer">
                    <img
                      src="https://res.cloudinary.com/de8w3ykvy/image/upload/v1753199108/fireworks_400x400/fireworks_400x400/resized_framed_product_85_Double_Shoot_Banana_Besar_281.jpg"
                      alt="Double Shoot Banana Besar"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 no-select no-drag no-context"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-yellow-400 text-slate-800 p-3 rounded-full shadow-lg">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-left">
                      Double Shoot Banana Besar
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <video
                      src="https://res.cloudinary.com/de8w3ykvy/video/upload/v1753077556/HunterBoom/cm3hcptvc00030cjwacdy2wid_ize2rw.mp4"
                      title="Double Shoot Banana Besar"
                      className="w-full h-full rounded-lg no-select no-drag no-context"
                      controls
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-800 text-sm mb-1">Double Shoot Banana</h3>
                <p className="text-yellow-600 font-bold text-lg">RM 75</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Play className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Click picture to play video</span>
                </div>
                <Link to="/products?category=MERDEKA FIREWORKS&product=986" className="inline-block mt-2">
                  <Button size="sm" className="bg-slate-600 text-yellow-100 hover:bg-slate-700 text-xs">
                    View in Store
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500 text-lg px-8 py-4 font-bold shadow-2xl border-2 border-yellow-500"
            >
              <Link to="/products?category=MERDEKA FIREWORKS">
                <Sparkles className="mr-2 h-5 w-5" />
                Lihat Semua Produk Merdeka
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main CTAs Section - Premium Style */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white relative">
        {/* Premium decorative elements */}
        <div className="absolute top-4 left-4 text-3xl opacity-20">🌙</div>
        <div className="absolute top-4 right-4 text-3xl opacity-20">✨</div>
        <div className="absolute bottom-4 left-8 text-2xl opacity-15">🎆</div>
        <div className="absolute bottom-4 right-8 text-2xl opacity-15">🌟</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4">
              {t('home.section.title')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto px-4">
              {t('home.section.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* View All Fireworks */}
            <div className="bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400">
              <div className="bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{t('home.card.fireworks.title')}</h3>
              <p className="text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base">
                {t('home.card.fireworks.description')}
              </p>
              <Button asChild className="bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 hover:from-slate-700 hover:to-slate-800 w-full shadow-lg">
                <Link to="/products">{t('home.hero.viewFireworks')}</Link>
              </Button>
            </div>

            {/* View Packages */}
            <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-yellow-200 rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-400">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-slate-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Package className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{t('home.card.packages.title')}</h3>
              <p className="text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base">
                {t('home.card.packages.description')}
              </p>
              <Button asChild className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-800 hover:from-yellow-600 hover:to-yellow-700 w-full shadow-lg">
                <Link to="/packages">{t('nav.packages')}</Link>
              </Button>
            </div>

            {/* Permit Guide */}
            <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-600 to-yellow-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{t('home.card.permit.title')}</h3>
              <p className="text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base">
                {t('home.card.permit.description')}
              </p>
              <Button asChild className="bg-gradient-to-r from-slate-600 to-yellow-600 text-white hover:from-slate-700 hover:to-yellow-700 w-full shadow-lg">
                <Link to="/permit-guide">{t('nav.permitGuide')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Berlesen Celebration */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-100 via-yellow-50 to-slate-100 relative overflow-hidden">
        {/* Berlesen pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-8 h-full transform rotate-12">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border-2 border-slate-400 rounded-full w-12 h-12"></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-yellow-700 bg-clip-text text-transparent mb-4">
              {t('home.why.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg">🏆</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{t('home.why.licensed')}</h3>
              <p className="text-slate-700 text-sm sm:text-base">{t('home.why.licensed.desc')}</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg">🎯</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{t('home.why.products')}</h3>
              <p className="text-slate-700 text-sm sm:text-base">{t('home.why.products.desc')}</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-yellow-500 to-slate-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg">📋</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{t('home.why.permit')}</h3>
              <p className="text-slate-700 text-sm sm:text-base">{t('home.why.permit.desc')}</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 bg-gradient-to-br from-slate-600 to-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg">💬</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{t('home.why.support')}</h3>
              <p className="text-slate-700 text-sm sm:text-base">{t('home.why.support.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
