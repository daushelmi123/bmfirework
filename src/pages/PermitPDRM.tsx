import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Download, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Malaysian states
const states = [
  { value: 'johor', label: 'Johor' },
  { value: 'kedah', label: 'Kedah' },
  { value: 'kelantan', label: 'Kelantan' },
  { value: 'melaka', label: 'Melaka' },
  { value: 'negeri_sembilan', label: 'Negeri Sembilan' },
  { value: 'pahang', label: 'Pahang' },
  { value: 'penang', label: 'Pulau Pinang' },
  { value: 'perak', label: 'Perak' },
  { value: 'perlis', label: 'Perlis' },
  { value: 'sabah', label: 'Sabah' },
  { value: 'sarawak', label: 'Sarawak' },
  { value: 'selangor', label: 'Selangor' },
  { value: 'terengganu', label: 'Terengganu' },
  { value: 'wp_kuala_lumpur', label: 'WP Kuala Lumpur' },
  { value: 'wp_labuan', label: 'WP Labuan' },
  { value: 'wp_putrajaya', label: 'WP Putrajaya' },
];

// Country codes
const countryCodes = [
  { value: '60', label: '+60 (MY)' },
  { value: '65', label: '+65 (SG)' },
  { value: '62', label: '+62 (ID)' },
  { value: '66', label: '+66 (TH)' },
];

// Application types
const applicationTypes = [
  { value: 'deepavali', label: 'Deepavali' },
  { value: 'cny', label: 'Chinese New Year' },
  { value: 'raya', label: 'Hari Raya' },
  { value: 'merdeka', label: 'Hari Merdeka' },
  { value: 'wedding', label: 'Majlis Kahwin' },
  { value: 'corporate', label: 'Acara Korporat' },
  { value: 'other', label: 'Lain-lain' },
];

interface FormData {
  // Application type
  applicationType: string;

  // Personal info
  fullName: string;
  icNumber: string;
  occupation: string;
  countryCode: string;
  phone: string;

  // Home address
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  state: string;

  // Company info
  companyName: string;
  companySsm: string;
  applicationDate: Date | undefined;

  // Business location
  businessLocation: string;
  businessAddress1: string;
  businessAddress2: string;
  businessState: string;
  ipdName: string;
}

const PermitPDRM = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    applicationType: '',
    fullName: '',
    icNumber: '',
    occupation: '',
    countryCode: '60',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postcode: '',
    state: '',
    companyName: '',
    companySsm: '',
    applicationDate: undefined,
    businessLocation: '',
    businessAddress1: '',
    businessAddress2: '',
    businessState: '',
    ipdName: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.applicationType || !formData.fullName || !formData.icNumber ||
        !formData.phone || !formData.companyName || !formData.companySsm ||
        !formData.applicationDate) {
      toast.error('Sila lengkapkan semua medan wajib (*)');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number
      const fullPhone = `${formData.countryCode}${formData.phone.replace(/^0+/, '')}`;

      // Format date
      const formattedDate = formData.applicationDate
        ? format(formData.applicationDate, 'dd/MM/yyyy')
        : '';

      // Prepare payload for PDF service
      const payload = {
        applicationType: formData.applicationType,
        fullName: formData.fullName,
        icNumber: formData.icNumber,
        occupation: formData.occupation,
        phone: fullPhone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        postcode: formData.postcode,
        state: formData.state,
        companyName: formData.companyName,
        companySsm: formData.companySsm,
        applicationDate: formattedDate,
        businessLocation: formData.businessLocation,
        businessAddress1: formData.businessAddress1,
        // Add trailing space to fix concatenation spacing in PDF output
        businessAddress2: formData.businessAddress2 ? formData.businessAddress2.trim() + ' ' : '',
        businessState: formData.businessState,
        ipdName: formData.ipdName,
      };

      // Call backend proxy (secure - API key hidden server-side)
      const response = await fetch('https://bmfirework.com:3001/api/generate-permit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Gagal menjana dokumen permit');
      }

      const result = await response.json();

      // Download PDF
      if (result.pdfUrl) {
        window.open(result.pdfUrl, '_blank');
        toast.success('Dokumen permit berjaya dijana!');
      }

      // Redirect to WhatsApp with PDF link
      setTimeout(() => {
        const stateLabel = states.find(s => s.value === formData.state)?.label || formData.state;
        const message = `Hi BMFireworks! Saya ${formData.fullName} dari ${stateLabel}. Saya dah isi borang permohonan permit untuk ${formData.applicationType}. Boleh bantu proses? No telefon: ${fullPhone}`;
        const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
      }, 1000);

      // Reset form
      setFormData({
        applicationType: '',
        fullName: '',
        icNumber: '',
        occupation: '',
        countryCode: '60',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postcode: '',
        state: '',
        companyName: '',
        companySsm: '',
        applicationDate: undefined,
        businessLocation: '',
        businessAddress1: '',
        businessAddress2: '',
        businessState: '',
        ipdName: '',
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Maaf, ada masalah semasa hantar borang. Sila cuba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-amber-50 via-green-50 to-amber-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold border border-green-300">
            Surat Lantikan Agent
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 via-green-700 to-amber-700 bg-clip-text text-transparent">
            Satu Borang Untuk Semua Dokumen PDRM
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto">
            Isi maklumat perniagaan anda sekali sahaja. Sistem BMFireworks akan auto isi 3-5 dokumen wajib
            (Surat Lantikan Agent, Borang IPD, Borang PBT) dan simpan dengan selamat.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-green-300 bg-white shadow-2xl">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-green-200 bg-gradient-to-r from-green-50 to-amber-50">
            <h3 className="text-xl font-semibold text-amber-900">
              Maklumat Pemohon &amp; Perniagaan
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-10">
              {/* Application Type Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Jenis Permohonan</h2>
                  <p className="text-sm text-slate-600">
                    Pilih jenis permohonan berdasarkan perayaan yang anda mohon.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationType">Permohonan Untuk *</Label>
                  <Select
                    value={formData.applicationType}
                    onValueChange={(value) => handleInputChange('applicationType', value)}
                  >
                    <SelectTrigger id="applicationType">
                      <SelectValue placeholder="Pilih jenis permohonan" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-600">
                    Sistem akan auto isi Surat Lantikan Agent yang bersesuaian dengan jenis permohonan.
                  </p>
                </div>
              </section>

              <div className="h-[1px] w-full bg-green-200" />

              {/* Personal Info Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Maklumat Pemohon</h2>
                  <p className="text-sm text-slate-600">
                    Pastikan maklumat sama seperti dalam IC untuk elak permohonan ditolak.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Penuh *</Label>
                    <Input
                      id="fullName"
                      placeholder="contoh: Ahmad bin Ali"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icNumber">No. Kad Pengenalan *</Label>
                    <Input
                      id="icNumber"
                      placeholder="900101-14-1234"
                      value={formData.icNumber}
                      onChange={(e) => handleInputChange('icNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Pekerjaan *</Label>
                    <Input
                      id="occupation"
                      placeholder="contoh: Usahawan"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-[140px_minmax(0,1fr)]">
                    <div className="space-y-2">
                      <Label htmlFor="countryCode">Kod Negara</Label>
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) => handleInputChange('countryCode', value)}
                      >
                        <SelectTrigger id="countryCode">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">No. Telefon *</Label>
                      <Input
                        id="phone"
                        placeholder="0123456789 (tanpa +60)"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                      <p className="text-sm text-slate-600">
                        Taip nombor tanpa kod negara. Sistem akan simpan sebagai 60XXXXXXXXX.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-[1px] w-full bg-green-200" />

              {/* Home Address Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Alamat Kediaman</h2>
                  <p className="text-sm text-slate-600">
                    Digunakan untuk tujuan rujukan dan verifikasi PDRM.
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Alamat Rumah 1 *</Label>
                    <Input
                      id="addressLine1"
                      placeholder="No 12, Jalan Bunga Api"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Alamat Rumah 2</Label>
                    <Input
                      id="addressLine2"
                      placeholder="Taman Harmoni, Mukim Tebrau"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Bandar *</Label>
                      <Input
                        id="city"
                        placeholder="Johor Bahru"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Poskod *</Label>
                      <Input
                        id="postcode"
                        placeholder="81100"
                        maxLength={5}
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Negeri *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => handleInputChange('state', value)}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Pilih negeri" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-[1px] w-full bg-green-200" />

              {/* Company Info Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Maklumat Syarikat</h2>
                  <p className="text-sm text-slate-600">
                    Maklumat ini digunakan untuk surat lantikan dan dokumen sokongan.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nama Syarikat (SSM) *</Label>
                    <Input
                      id="companyName"
                      placeholder="BMFireworks Enterprise"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySsm">No. SSM *</Label>
                    <Input
                      id="companySsm"
                      placeholder="202401234567"
                      value={formData.companySsm}
                      onChange={(e) => handleInputChange('companySsm', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2 max-w-sm">
                  <Label>Tarikh Permohonan *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !formData.applicationDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.applicationDate ? (
                          format(formData.applicationDate, 'PPP')
                        ) : (
                          <span>Pilih tarikh</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.applicationDate}
                        onSelect={(date) => handleInputChange('applicationDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </section>

              <div className="h-[1px] w-full bg-green-200" />

              {/* Business Location Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Maklumat Tapak Perniagaan</h2>
                  <p className="text-sm text-slate-600">
                    Pilih negeri tapak berniaga dan IPD yang menjaga kawasan tersebut.
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessLocation">Tempat Berniaga *</Label>
                    <Input
                      id="businessLocation"
                      placeholder="cth: Tapak Pasaraya Lotus, Desa Cemerlang"
                      value={formData.businessLocation}
                      onChange={(e) => handleInputChange('businessLocation', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress1">Alamat Berniaga 1 *</Label>
                    <Input
                      id="businessAddress1"
                      placeholder="No Lot / Gerai"
                      value={formData.businessAddress1}
                      onChange={(e) => handleInputChange('businessAddress1', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress2">Alamat Berniaga 2</Label>
                    <Textarea
                      id="businessAddress2"
                      placeholder="Tambahan alamat seperti taman, landmark, atau maklumat lokasi"
                      rows={3}
                      value={formData.businessAddress2}
                      onChange={(e) => handleInputChange('businessAddress2', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessState">Negeri Tapak *</Label>
                      <Select
                        value={formData.businessState}
                        onValueChange={(value) => handleInputChange('businessState', value)}
                      >
                        <SelectTrigger id="businessState">
                          <SelectValue placeholder="Pilih negeri" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ipdName">Nama IPD *</Label>
                      <Input
                        id="ipdName"
                        placeholder="cth: IPD Johor Bahru Selatan"
                        value={formData.ipdName}
                        onChange={(e) => handleInputChange('ipdName', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sedang Proses...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Jana Surat Lantikan Agent
                    </>
                  )}
                </Button>
                <p className="text-sm text-slate-600 text-center mt-4">
                  Dengan klik butang di atas, Surat Lantikan Agent akan dijana dan anda akan dihubungkan ke WhatsApp kami.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-br from-amber-50 to-green-50 border border-green-300 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
            <MessageCircle className="mr-3 h-6 w-6 text-green-600" />
            Nak Bantuan?
          </h3>
          <p className="text-slate-700 mb-4">
            Team BMFireworks ada pengalaman bantu customer buat Surat Lantikan Agent.
            WhatsApp je untuk panduan lengkap supaya permohonan lulus dengan mudah!
          </p>
          <Button
            onClick={() => {
              const message = 'Hi BMFireworks! Saya nak tanya tentang Surat Lantikan Agent untuk mercun.';
              const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(message)}`;
              window.open(waUrl, '_blank');
            }}
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp Konsultasi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PermitPDRM;
