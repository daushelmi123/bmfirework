
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Package, FileText, Star, Moon, Play, Factory, MapPin, ShieldCheck, CalendarDays, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { fireworksData } from '@/data/products';

const PENINSULAR_STATES = [
  'johor',
  'kedah',
  'kelantan',
  'melaka',
  'negeriSembilan',
  'pahang',
  'perak',
  'perlis',
  'pulauPinang',
  'selangor',
  'terengganu',
  'wilayahPersekutuanKualaLumpur',
  'wilayahPersekutuanPutrajaya',
] as const;

const PRICE_PDF_URL = 'https://bmfirework.com/BMFireworks_Deepavali_Combined.pdf';
const PRICE_WEBHOOK_URL = 'https://hook.integrator.boost.space/vvsyhhw9jtw2ocvsj6ccb8uaouf1882t';

const FACTORY_KEYS = ['seelong', 'muar', 'simpangRenggam', 'ipoh'] as const;
const PEAK_SEASON_KEYS = ['deepavali', 'aidilfitri', 'cny', 'christmas'] as const;

type PriceStateKey = typeof PENINSULAR_STATES[number];
type FactoryKey = typeof FACTORY_KEYS[number];
type PeakSeasonKey = typeof PEAK_SEASON_KEYS[number];

type FactoryInfo = {
  location: string;
  role: string;
  description: string;
  strength: string;
};

type PeakSeasonInfo = {
  festival: string;
  period: string;
  description: string;
  opportunity: string;
};

type FactorySectionCopy = {
  badge: string;
  title: string;
  description: string;
  cta: string;
  note: string;
};

type PeakSeasonSectionCopy = {
  badge: string;
  title: string;
  description: string;
  note: string;
};

type PriceRequestCopy = {
  sectionTitle: string;
  sectionDescription: string;
  buttonLabel: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  stateLabel: string;
  statePlaceholder: string;
  submitLabel: string;
  processingLabel: string;
  note: string;
  downloadFilename: string;
  errors: {
    name: string;
    phone: string;
    state: string;
    technical: string;
  };
};

const FactoryNetworkSection = ({ factories, waUrl, copy }: { factories: FactoryInfo[]; waUrl: string; copy: FactorySectionCopy }) => (
  <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-yellow-50 to-white relative overflow-hidden">
    <div className="absolute top-8 left-10 text-4xl opacity-10">🏭</div>
    <div className="absolute bottom-10 right-12 text-3xl opacity-10">🚛</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-12">
        <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-yellow-100 text-slate-700 mb-3">
          {copy.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          {copy.title}
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base">
          {copy.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {factories.map((factory) => (
          <div key={factory.location} className="bg-white rounded-2xl shadow-lg border border-yellow-200 p-6 sm:p-8 relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-yellow-400 to-slate-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <Factory className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">{factory.location}</h3>
                  <p className="text-sm text-slate-500">{factory.role}</p>
                </div>
              </div>
              <MapPin className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{factory.description}</p>
            <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4 text-yellow-500 mt-1" />
              <span>{factory.strength}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-slate-900 to-slate-700 text-yellow-200 hover:from-slate-700 hover:to-slate-600 font-semibold shadow-xl border border-yellow-400"
        >
          <a href={waUrl} target="_blank" rel="noreferrer">
            {copy.cta}
          </a>
        </Button>
        <p className="text-xs sm:text-sm text-slate-500 mt-3">
          {copy.note}
        </p>
      </div>
    </div>
  </section>
);

const PeakSeasonSection = ({ peakSeasons, copy }: { peakSeasons: PeakSeasonInfo[]; copy: PeakSeasonSectionCopy }) => (
  <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
    <div className="absolute top-8 left-10 text-4xl opacity-10">🎇</div>
    <div className="absolute bottom-12 right-12 text-3xl opacity-10">🎉</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-12">
        <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-yellow-300/20 text-yellow-200 mb-3">
          {copy.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-200 mb-4">
          {copy.title}
        </h2>
        <p className="text-base sm:text-lg text-yellow-100/90 max-w-3xl mx-auto">
          {copy.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {peakSeasons.map((season) => (
          <div key={season.festival} className="bg-white/10 border border-yellow-400/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:border-yellow-300/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 text-yellow-200 w-12 h-12 rounded-xl flex items-center justify-center">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200">{season.festival}</h3>
                <p className="text-sm text-yellow-100/80">{season.period}</p>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-slate-100 leading-relaxed">{season.description}</p>
            <div className="mt-4 flex items-start gap-2 text-sm text-yellow-200/90">
              <TrendingUp className="h-4 w-4 text-yellow-300 mt-1" />
              <span>{season.opportunity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-xs sm:text-sm text-yellow-200/80">
        {copy.note}
      </div>
    </div>
  </section>
);

type PriceRequestSectionProps = {
  states: readonly { value: PriceStateKey; label: string }[];
  pdfUrl: string;
  webhookUrl?: string;
  copy: PriceRequestCopy;
};

const PriceRequestSection = ({ states, pdfUrl, webhookUrl, copy }: PriceRequestSectionProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{ name: string; phone: string; state: PriceStateKey | '' }>({ name: '', phone: '', state: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; state?: string; global?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({ name: '', phone: '', state: '' });
    setErrors({});
  };

  const redirectToWhatsApp = () => {
    const stateOption = states.find((item) => item.value === formData.state);
    const stateName = stateOption?.label ?? formData.state;
    const message = `Hi BMFireworks! Saya ${formData.name.trim()} dari ${stateName}, nak dapatkan katalog terbaru. No telefon: ${formData.phone.trim()}`;
    const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!formData.name.trim()) {
      nextErrors.name = copy.errors.name;
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = copy.errors.phone;
    } else if (!/^[0-9+][0-9\s()+-]{6,}$/.test(formData.phone.trim())) {
      nextErrors.phone = copy.errors.phone;
    }
    if (!formData.state) {
      nextErrors.state = copy.errors.state;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const stateOption = states.find((item) => item.value === formData.state);

    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            state: formData.state,
            stateLabel: stateOption?.label ?? formData.state,
            source: 'bmfireworks-price-download',
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (error) {
      console.error('Failed to send webhook payload', error);
      setErrors((prev) => ({ ...prev, global: copy.errors.technical }));
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.download = copy.downloadFilename || 'bmfireworks-price-list.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await new Promise((resolve) => setTimeout(resolve, 300));
      redirectToWhatsApp();
      resetForm();
      setOpen(false);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-yellow-400/30 transform rotate-45 w-6 h-6"></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-200 mb-3">
          {copy.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-yellow-100/90 mb-6">
          {copy.sectionDescription}
        </p>

        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold hover:from-yellow-300 hover:to-yellow-400 shadow-xl border border-yellow-400"
            >
              {copy.buttonLabel}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {copy.formTitle}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="price-name">
                  {copy.nameLabel}
                </label>
                <input
                  id="price-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  placeholder={copy.namePlaceholder}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="price-phone">
                  {copy.phoneLabel}
                </label>
                <input
                  id="price-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  placeholder={copy.phonePlaceholder}
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="price-state">
                  {copy.stateLabel}
                </label>
                <select
                  id="price-state"
                  value={formData.state}
                  onChange={(event) => setFormData((prev) => ({ ...prev, state: event.target.value as PriceStateKey | '' }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  disabled={isSubmitting}
                >
                  <option value="">{copy.statePlaceholder}</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
              </div>

              <div className="text-xs text-slate-500 bg-yellow-100/40 border border-yellow-200 rounded-md p-3 text-left">
                <p>{copy.note}</p>
              </div>

              {errors.global && <p className="text-xs text-red-500 text-left">{errors.global}</p>}

              <Button
                type="submit"
                className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? copy.processingLabel : copy.submitLabel}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const Index = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const videos = fireworksData.filter(item => item.videoUrl && item.videoUrl.trim() !== '').slice(0, 8);
  const WA_NUMBER = '60137340415';
  const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hi%20Bearboom%20x%20BMFireworks!%20Saya%20nak%20jadual%20lawatan%20gudang.`;
  const priceStates = PENINSULAR_STATES.map((stateKey) => ({
    value: stateKey,
    label: t(`states.${stateKey}`),
  }));

  const priceCopy: PriceRequestCopy = {
    sectionTitle: t('price.section.title'),
    sectionDescription: t('price.section.description'),
    buttonLabel: t('price.section.button'),
    formTitle: t('price.form.title'),
    nameLabel: t('price.form.nameLabel'),
    namePlaceholder: t('price.form.namePlaceholder'),
    phoneLabel: t('price.form.phoneLabel'),
    phonePlaceholder: t('price.form.phonePlaceholder'),
    stateLabel: t('price.form.stateLabel'),
    statePlaceholder: t('price.form.statePlaceholder'),
    submitLabel: t('price.form.submit'),
    processingLabel: t('price.form.processing'),
    note: t('price.form.note'),
    downloadFilename: t('price.downloadFilename'),
    errors: {
      name: t('price.form.error.name'),
      phone: t('price.form.error.phone'),
      state: t('price.form.error.state'),
      technical: t('price.form.error.technical'),
    },
  };

  const factories: FactoryInfo[] = FACTORY_KEYS.map((key) => ({
    location: t(`factory.cards.${key}.location`),
    role: t(`factory.cards.${key}.role`),
    description: t(`factory.cards.${key}.description`),
    strength: t(`factory.cards.${key}.strength`),
  }));

  const factoryCopy: FactorySectionCopy = {
    badge: t('factory.section.badge'),
    title: t('factory.section.title'),
    description: t('factory.section.description'),
    cta: t('factory.section.cta'),
    note: t('factory.section.note'),
  };

  const peakSeasons: PeakSeasonInfo[] = PEAK_SEASON_KEYS.map((key) => ({
    festival: t(`peak.cards.${key}.festival`),
    period: t(`peak.cards.${key}.period`),
    description: t(`peak.cards.${key}.description`),
    opportunity: t(`peak.cards.${key}.opportunity`),
  }));

  const peakCopy: PeakSeasonSectionCopy = {
    badge: t('peak.section.badge'),
    title: t('peak.section.title'),
    description: t('peak.section.description'),
    note: t('peak.section.note'),
  };

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
        
        <div className="absolute inset-0 border border-dashed border-yellow-100/20 rounded-3xl mx-4 my-6 pointer-events-none"></div>
        
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

      {/* Video Gallery Strip */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-yellow-400/40 transform rotate-45 w-6 h-6"></div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">Video Gallery</h2>
            <Link to="/products" className="text-yellow-300 hover:text-yellow-200 underline-offset-4 hover:underline">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {videos.map((v) => (
              <div key={v.id} className="group bg-white/5 rounded-xl border border-yellow-400/30 overflow-hidden hover:border-yellow-400/60 transition-all">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full aspect-video relative cursor-pointer">
                      <img
                        src={v.image}
                        alt={v.name.en}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-yellow-400 text-slate-900 p-3 rounded-full shadow-lg">
                          <Play className="h-6 w-6" />
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full max-h-[90vh] mx-2">
                    <DialogHeader>
                      <DialogTitle className="text-lg sm:text-xl font-bold text-left text-slate-900">{v.name.en}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full">
                      {v.videoUrl.includes('youtube.com') || v.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={v.videoUrl}
                          title={v.name.en}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      ) : (
                        <video
                          src={v.videoUrl}
                          title={v.name.en}
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
                  <h3 className="text-yellow-200 font-semibold text-sm line-clamp-1">{v.name.en}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PriceRequestSection states={priceStates} pdfUrl={PRICE_PDF_URL} webhookUrl={PRICE_WEBHOOK_URL} copy={priceCopy} />

      <FactoryNetworkSection factories={factories} waUrl={WA_URL} copy={factoryCopy} />
      <PeakSeasonSection peakSeasons={peakSeasons} copy={peakCopy} />

      {/* Featured Merdeka Products Showcase */}
      {false && (
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
      )}

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
