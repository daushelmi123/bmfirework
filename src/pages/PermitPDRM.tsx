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
import ipdList from '@/data/ipd-list.json';

type GeneratedPdf = {
  url: string;
  name: string;
};

type SubmissionMeta = {
  fullName: string;
  fullPhone: string;
  message: string;
};

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
  // Personal info
  fullName: string;
  icNumber: string;
  occupation: string;
  countryCode: string;
  phone: string;

  // Home address
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;

  // Company info (pre-filled for BM Fireworks)
  companyName: string;

  // Business address
  businessAddressLine1: string;
  businessAddressLine2: string;
  businessAddressLine3: string;

  // IPD Information
  selectedIpdId: string; // For dropdown selection
  ipdLine1: string; // IPD Name
  ipdLine2: string; // IPD Address
  ipdLine3: string; // Postcode + City
  ipdLine4: string; // State
  ipdLine5: string; // Extra info (optional)

  // Application date
  applicationDate: Date | undefined;
}

const PermitPDRM = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<GeneratedPdf | null>(null);
  const [lastSubmission, setLastSubmission] = useState<SubmissionMeta | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    icNumber: '',
    occupation: '',
    countryCode: '60',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    companyName: 'BM FIREWORKS SDN. BHD.', // Pre-filled
    businessAddressLine1: '',
    businessAddressLine2: '',
    businessAddressLine3: '',
    selectedIpdId: '',
    ipdLine1: '',
    ipdLine2: '',
    ipdLine3: '',
    ipdLine4: '',
    ipdLine5: '',
    applicationDate: undefined,
  });

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle IPD selection from dropdown
  const handleIpdSelect = (ipdId: string) => {
    const selectedIpd = ipdList.find((ipd, index) => index.toString() === ipdId);

    if (selectedIpd) {
      setFormData((prev) => ({
        ...prev,
        selectedIpdId: ipdId,
        ipdLine1: selectedIpd.name,
        ipdLine2: selectedIpd.address,
        ipdLine3: `${selectedIpd.postcode} ${selectedIpd.city}`,
        ipdLine4: selectedIpd.state,
        ipdLine5: '', // Optional extra line
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.icNumber || !formData.phone ||
        !formData.addressLine1 || !formData.ipdLine1 || !formData.applicationDate) {
      toast.error('Sila lengkapkan semua medan wajib (*)');
      return;
    }

    setIsSubmitting(true);
    setGeneratedPdf(null);
    setLastSubmission(null);

    try {
      // Format phone number
      const fullPhone = `${formData.countryCode}${formData.phone.replace(/^0+/, '')}`;

      // Format date for backend (YYYY-MM-DD)
      const backendDate = formData.applicationDate
        ? format(formData.applicationDate, 'yyyy-MM-dd')
        : '';

      // Combine address lines for backend
      const addressLine23 = [formData.addressLine2, formData.addressLine3]
        .filter(line => line.trim())
        .join(' ');

      const businessAddressLine23 = [formData.businessAddressLine2, formData.businessAddressLine3]
        .filter(line => line.trim())
        .join(' ');

      // Prepare payload for PDF service
      // Backend validation expects GRK fields, but template will use BM fields
      const payload = {
        // BM Fireworks specific fields (will be used by template)
        fullName: formData.fullName,
        icNumber: formData.icNumber,
        occupation: formData.occupation,
        phone: fullPhone,
        addressLine1: formData.addressLine1,
        addressLine23, // Combined lines 2+3
        companyName: formData.companyName,
        businessAddressLine1: formData.businessAddressLine1,
        businessAddressLine23, // Combined lines 2+3
        ipdLine1: formData.ipdLine1,
        ipdLine2: formData.ipdLine2,
        ipdLine3: formData.ipdLine3,
        ipdLine4: formData.ipdLine4,
        ipdLine5: formData.ipdLine5,
        applicationDate: backendDate, // YYYY-MM-DD format for backend

        // Required GRK fields for validation (use proper values)
        addressLine2: '',
        city: formData.ipdLine4 || 'Johor', // Use IPD state as city fallback
        postcode: formData.ipdLine3?.match(/\d{5}/)?.[0] || '80000', // Extract postcode from ipdLine3
        state: formData.ipdLine4 || 'Johor',
        companySsm: '202300000000', // Dummy SSM for validation
        businessLocation: formData.businessAddressLine1 || 'Tapak Perniagaan',
        businessAddress1: formData.businessAddressLine1 || 'Tapak Perniagaan',
        businessAddress2: '',
        businessState: formData.ipdLine4 || 'Johor',
        ipd: formData.ipdLine1, // Use IPD name
        countryCode: formData.countryCode,
      };

      // Call BMFireworks dedicated PDF service (port 4001)
      const response = await fetch('http://84.247.150.90:4001/api/pdf-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'bmf_prod_7UWZO8xLyEPLjj5+VPT2KuuS4vWi247VVzfvvfHvqIc=',
        },
        body: JSON.stringify({
          ...payload,
          templates: ['bmfireworks-surat-lantikan-cny', 'bmfireworks-borang-ipd'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Backend error:', errorData);
        throw new Error('Gagal menjana dokumen PDF');
      }

      const result = await response.json();

      // Open merged PDF in new tab
      if (result.status === 'success' && result.files && result.files.length > 0) {
        const mergedPdf = result.files.find((f: any) => f.name.includes('merged')) || result.files[0];
        const submissionMessage = `Hi BMFireworks! Saya ${formData.fullName}. Saya dah download Surat Lantikan Agent dan Borang IPD. Nak proceed dengan permohonan. No telefon: ${fullPhone}`;
        setGeneratedPdf({ url: mergedPdf.url, name: mergedPdf.name });
        setLastSubmission({ fullName: formData.fullName, fullPhone, message: submissionMessage });
        toast.success('Dokumen berjaya dijana. Muat turun PDF dan hubungi kami melalui WhatsApp.');
      }

      // Reset form
      setFormData({
        fullName: '',
        icNumber: '',
        occupation: '',
        countryCode: '60',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        companyName: 'BM FIREWORKS SDN. BHD.',
        businessAddressLine1: '',
        businessAddressLine2: '',
        businessAddressLine3: '',
        selectedIpdId: '',
        ipdLine1: '',
        ipdLine2: '',
        ipdLine3: '',
        ipdLine4: '',
        ipdLine5: '',
        applicationDate: undefined,
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Maaf, ada masalah semasa jana dokumen. Sila cuba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!generatedPdf) return;
    window.open(generatedPdf.url, '_blank', 'noopener');
  };

  const handleOpenWhatsApp = () => {
    if (!lastSubmission) return;
    const messageLines = [
      lastSubmission.message,
      generatedPdf ? `Dokumen: ${generatedPdf.url}` : '',
    ].filter(Boolean);
    const waUrl = `https://wa.me/60137340415?text=${encodeURIComponent(messageLines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener');
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-amber-50 via-green-50 to-amber-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold border border-green-300">
            Surat Lantikan Agent CNY 2026
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 via-green-700 to-amber-700 bg-clip-text text-transparent">
            Auto Jana Surat Lantikan + Borang IPD
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto">
            Isi maklumat sekali, dapat 2 dokumen lengkap siap diisi. Surat Lantikan Agent dan Borang Permohonan IPD
            untuk permohonan permit mercun Chinese New Year 2026.
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
                    <Label htmlFor="addressLine1">Alamat Rumah (Baris 1) *</Label>
                    <Input
                      id="addressLine1"
                      placeholder="No 12, Jalan Bunga Api"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Alamat Rumah (Baris 2)</Label>
                    <Input
                      id="addressLine2"
                      placeholder="Taman Harmoni"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine3">Alamat Rumah (Baris 3)</Label>
                    <Input
                      id="addressLine3"
                      placeholder="81100 Johor Bahru, Johor"
                      value={formData.addressLine3}
                      onChange={(e) => handleInputChange('addressLine3', e.target.value)}
                    />
                    <p className="text-sm text-slate-600">
                      Baris 2 dan 3 akan digabungkan secara automatik dalam PDF.
                    </p>
                  </div>
                </div>
              </section>

              <div className="h-[1px] w-full bg-green-200" />

              {/* Company Info Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Maklumat Syarikat</h2>
                  <p className="text-sm text-slate-600">
                    Nama syarikat pembekal mercun (auto diisi untuk BM Fireworks).
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nama Syarikat Pembekal *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    disabled
                    className="bg-slate-100"
                  />
                  <p className="text-sm text-slate-600">
                    Syarikat pembekal telah ditetapkan sebagai BM FIREWORKS SDN. BHD.
                  </p>
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

              {/* Business Address Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Alamat Premis Perniagaan</h2>
                  <p className="text-sm text-slate-600">
                    Alamat tapak/gerai yang akan digunakan untuk berniaga mercun.
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessAddressLine1">Alamat Premis (Baris 1) *</Label>
                    <Input
                      id="businessAddressLine1"
                      placeholder="No Lot/Gerai, Nama Tapak"
                      value={formData.businessAddressLine1}
                      onChange={(e) => handleInputChange('businessAddressLine1', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddressLine2">Alamat Premis (Baris 2)</Label>
                    <Input
                      id="businessAddressLine2"
                      placeholder="Jalan/Taman"
                      value={formData.businessAddressLine2}
                      onChange={(e) => handleInputChange('businessAddressLine2', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddressLine3">Alamat Premis (Baris 3)</Label>
                    <Input
                      id="businessAddressLine3"
                      placeholder="Poskod, Bandar, Negeri"
                      value={formData.businessAddressLine3}
                      onChange={(e) => handleInputChange('businessAddressLine3', e.target.value)}
                    />
                    <p className="text-sm text-slate-600">
                      Baris 2 dan 3 akan digabungkan secara automatik dalam PDF.
                    </p>
                  </div>
                </div>
              </section>

              <div className="h-[1px] w-full bg-green-200" />

              {/* IPD Information Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Maklumat IPD</h2>
                  <p className="text-sm text-slate-600">
                    Pilih Ibu Pejabat Polis Daerah (IPD) yang menjaga kawasan premis perniagaan anda.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="selectedIpd">Pilih IPD *</Label>
                    <Select
                      value={formData.selectedIpdId}
                      onValueChange={handleIpdSelect}
                    >
                      <SelectTrigger id="selectedIpd">
                        <SelectValue placeholder="Pilih IPD dari senarai" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {ipdList.map((ipd, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {ipd.name} - {ipd.city}, {ipd.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-600">
                      Pilih dari senarai {ipdList.length} IPD di Semenanjung Malaysia. Maklumat akan auto diisi.
                    </p>
                  </div>

                  {/* Auto-filled IPD fields */}
                  {formData.ipdLine1 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                      <p className="text-sm font-semibold text-green-800">Maklumat IPD (Auto Diisi):</p>
                      <div className="grid gap-2 text-sm">
                        <div><span className="font-medium">Nama:</span> {formData.ipdLine1}</div>
                        <div><span className="font-medium">Alamat:</span> {formData.ipdLine2}</div>
                        <div><span className="font-medium">Poskod/Bandar:</span> {formData.ipdLine3}</div>
                        <div><span className="font-medium">Negeri:</span> {formData.ipdLine4}</div>
                      </div>
                    </div>
                  )}
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
                      Sedang Jana PDF...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Jana Surat Lantikan + Borang IPD
                    </>
                  )}
                </Button>
                <p className="text-sm text-slate-600 text-center mt-4">
                  Klik butang untuk auto jana 2 dokumen: Surat Lantikan Agent dan Borang Permohonan IPD.
                  Selepas siap, butang muat turun dan WhatsApp akan muncul di bawah.
                </p>
              </div>

              {generatedPdf && lastSubmission && (
                <div className="mt-8 border border-green-200 bg-green-50 rounded-lg p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Dokumen Sedia Dimuat Turun</h3>
                    <p className="text-sm text-green-800">
                      Surat Lantikan Agent dan Borang IPD untuk {lastSubmission.fullName} berjaya dijana. Sila muat turun PDF dan hubungi kami untuk proses seterusnya.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleDownloadPdf} className="bg-green-600 hover:bg-green-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Muat Turun PDF
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleOpenWhatsApp}
                      className="border-green-600 text-green-700 hover:bg-green-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp BMFireworks
                    </Button>
                  </div>
                  <p className="text-xs text-green-700">
                    Nota: Salin link dokumen ini jika perlu simpan atau kongsikan: <span className="underline break-all">{generatedPdf.url}</span>
                  </p>
                </div>
              )}
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
