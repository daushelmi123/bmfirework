
import { Shield, AlertTriangle, CheckCircle, Eye, Users, Flame } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SafetyGuide = () => {
  const { t } = useLanguage();

  const safetyTips = [
    {
      icon: Shield,
      title: t('safety.tip1.title'),
      description: t('safety.tip1.desc'),
    },
    {
      icon: Eye,
      title: t('safety.tip2.title'),
      description: t('safety.tip2.desc'),
    },
    {
      icon: Users,
      title: t('safety.tip3.title'),
      description: t('safety.tip3.desc'),
    },
    {
      icon: Flame,
      title: t('safety.tip4.title'),
      description: t('safety.tip4.desc'),
    },
  ];

  const beforeSteps = [
    t('safety.before.step1'),
    t('safety.before.step2'),
    t('safety.before.step3'),
    t('safety.before.step4'),
    t('safety.before.step5'),
  ];

  const duringSteps = [
    t('safety.during.step1'),
    t('safety.during.step2'),
    t('safety.during.step3'),
    t('safety.during.step4'),
    t('safety.during.step5'),
  ];

  const afterSteps = [
    t('safety.after.step1'),
    t('safety.after.step2'),
    t('safety.after.step3'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 relative overflow-hidden">
      {/* Berlesen decorative elements */}
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">🛫</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">🔥</div>
      
      {/* Safety pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-6 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-slate-400 rounded-full w-6 h-6 transform rotate-45"></div>
          ))}
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 to-yellow-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-400 text-slate-800 p-4 rounded-full shadow-2xl">
                <Shield className="h-16 w-16" />
              </div>
            </div>
            <div className="text-6xl mb-4">🛫🌙</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-yellow-100 drop-shadow-lg">
              {t('safety.hero.title')}
            </h1>
            <p className="text-xl text-yellow-50 max-w-3xl mx-auto drop-shadow">
              {t('safety.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="relative py-8 bg-gradient-to-r from-red-50 to-yellow-50 border-l-4 border-red-500 shadow-lg mx-4 lg:mx-auto lg:max-w-7xl mt-8 rounded-r-xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1 animate-pulse" />
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                {t('safety.warning.title')}
              </h2>
              <p className="text-red-700 text-lg">
                {t('safety.warning.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4">
              {t('safety.tips.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyTips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-slate-200 hover:shadow-2xl hover:border-yellow-400 transition-all hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-100 p-3 rounded-full shadow-lg">
                    <tip.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{tip.title}</h3>
                    <p className="text-slate-700">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4">
              {t('safety.steps.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Before */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-300 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                {t('safety.before.title')}
              </h3>
              <ul className="space-y-3">
                {beforeSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* During */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-300 shadow-lg">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center">
                {t('safety.during.title')}
              </h3>
              <ul className="space-y-3">
                {duringSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-yellow-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-slate-50 to-yellow-50 p-6 rounded-xl border-2 border-slate-300 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                {t('safety.after.title')}
              </h3>
              <ul className="space-y-3">
                {afterSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-white rounded-full w-8 h-8"></div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="bg-white text-red-600 p-4 rounded-full inline-block mb-6 shadow-2xl">
            <AlertTriangle className="h-16 w-16" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-yellow-100 drop-shadow-lg">
            {t('safety.emergency.title')}
          </h2>
          <p className="text-xl mb-6 text-yellow-50">
            {t('safety.emergency.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Emergency Numbers */}
            <div className="bg-gradient-to-br from-white to-yellow-50 text-black p-6 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-red-800">{t('safety.emergency.numbers')}</h3>
              <div className="space-y-2 text-lg text-red-700">
                <p><strong>999</strong> - {t('safety.emergency.fire')}</p>
                <p><strong>999</strong> - {t('safety.emergency.police')}</p>
                <p><strong>999</strong> - {t('safety.emergency.ambulance')}</p>
              </div>
            </div>
            
            {/* Our Contact */}
            <div className="bg-gradient-to-br from-yellow-50 to-slate-50 text-black p-6 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Hubungi Kami / Contact Us</h3>
              <div className="space-y-2 text-lg">
                <p className="text-slate-700"><strong>+60 13-734 0415</strong></p>
                <p className="text-sm text-slate-600">Untuk bantuan segera / For immediate assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyGuide;
