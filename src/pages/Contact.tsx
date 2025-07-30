
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would submit to your backend or email service
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleWhatsAppDirect = () => {
    const message = `Hi! I'm interested in your fireworks. Here are my details:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappNumber = "+60137340415";
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-25 to-slate-100 py-8 relative overflow-hidden">
      {/* Berlesen decorative elements */}
      <div className="absolute top-8 left-8 text-4xl opacity-20 animate-pulse">💬</div>
      <div className="absolute top-16 right-12 text-3xl opacity-15 animate-bounce">🌙</div>
      <div className="absolute bottom-20 left-16 text-2xl opacity-10">✨</div>
      <div className="absolute bottom-32 right-20 text-3xl opacity-15">📧</div>
      
      {/* Contact pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-6 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-slate-400 rounded-full w-6 h-6"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">💬🌙</div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-yellow-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Hubungi Kami
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Ada soalan mercun Berlesen? Nak buat order besar-besaran? WhatsApp je terus - kami sedia membantu! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="bg-slate-500 text-white p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">WhatsApp (Recommended)</h3>
                  <p className="text-slate-700">+60 13-734 0415</p>
                  <p className="text-sm text-slate-600">Reply pantas masa office hours</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Phone</h3>
                  <p className="text-slate-700">+60 13-734 0415</p>
                  <p className="text-sm text-slate-600">Isnin-Sabtu: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Email</h3>
                  <p className="text-slate-700">info@mercunberlesen.com</p>
                  <p className="text-sm text-slate-600">Reply dalam 24 jam</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Lokasi</h3>
                  <p className="text-slate-700">Kuala Lumpur, Malaysia</p>
                  <p className="text-sm text-slate-600">Penghantaran seluruh Malaysia</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Waktu Operasi</h3>
                  <div className="text-slate-700">
                    <p>Isnin - Sabtu: 9:00 AM - 6:00 PM</p>
                    <p>Ahad: Tutup (Berlesen tetap buka! 🎉)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 bg-gradient-to-br from-yellow-50 to-slate-50 border-2 border-yellow-300 rounded-xl p-6 shadow-lg">
              <div className="text-3xl text-center mb-3">🌙</div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nak Order Cepat?</h3>
              <p className="text-slate-700 mb-4">
                Untuk order urgent atau nak tanya harga borong, WhatsApp je terus!
              </p>
              <Button
                onClick={() => {
                  const message = "Hi! Nak tanya pasal mercun Berlesen. Boleh bantu?";
                  const whatsappNumber = "+60137340415";
                  const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                  window.open(url, '_blank');
                }}
                className="bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-100 hover:from-slate-600 hover:to-slate-700 w-full shadow-lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Sekarang!
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-white to-yellow-50 border-2 border-slate-200 rounded-xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Hantar Mesej</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-800 mb-2">
                    Nama Penuh *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama penuh anda"
                    className="border-2 border-gray-300 focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-800 mb-2">
                    No. Telefon *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="cth: +60 12-345 6789"
                    className="border-2 border-gray-300 focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-800 mb-2">
                    Mesej *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Bagitahu kami pasal majlis Berlesen, soalan, atau keperluan anda..."
                    rows={5}
                    className="border-2 border-gray-300 focus:border-black"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-slate-600 to-slate-700 text-yellow-100 hover:from-slate-700 hover:to-slate-800 w-full shadow-lg"
                  >
                    Hantar Mesej
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    variant="outline"
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-slate-800 w-full shadow-lg"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Hantar via WhatsApp
                  </Button>
                </div>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-gradient-to-br from-slate-50 to-yellow-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Soalan Lazim</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-800">S: Ada bantu buat permit PDRM tak?</p>
                  <p className="text-slate-700">J: Ada! Kami sedia bantu dari A-Z untuk permohonan permit PDRM.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">S: Hantar ke mana je?</p>
                  <p className="text-slate-700">J: Seluruh Malaysia! Klang Valley ada rate special untuk Berlesen.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">S: Boleh buat pakej custom?</p>
                  <p className="text-slate-700">J: Boleh! WhatsApp je untuk pakej Berlesen special ikut budget.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
