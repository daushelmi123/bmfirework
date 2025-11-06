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

const PDF_SERVICE_URL =
  import.meta.env.VITE_BMF_PDF_ENDPOINT ?? '/api-proxy.php';

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
  // Festival type
  festivalType: 'raya-2026' | 'cny-2026' | '';

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

  // Company info (pemohon's company)
  companyName: string;

  // Business premises address (tapak/gerai) - same as company address
  businessAddressLine1: string;
  businessAddressLine2: string;
  businessAddressLine3: string;
  businessState: string; // State for filtering IPD

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

// Validation functions
const validateIC = (ic: string): boolean => {
  // Format: YYMMDD-PB-NNNN or YYMMDDPBNNNN (12 digits)
  const icClean = ic.replace(/-/g, '');
  if (icClean.length !== 12 || !/^\d{12}$/.test(icClean)) {
    return false;
  }

  // Validate date part (YYMMDD)
  const year = parseInt(icClean.substring(0, 2));
  const month = parseInt(icClean.substring(2, 4));
  const day = parseInt(icClean.substring(4, 6));

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  return true;
};

const validatePhone = (phone: string): boolean => {
  // Malaysian phone: accept any format, just need 9-11 digits
  const phoneClean = phone.replace(/\D/g, '');
  // After removing non-digits, should have 9-11 digits (we'll format it later)
  return phoneClean.length >= 9 && phoneClean.length <= 11;
};

const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

const PermitPDRM = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<GeneratedPdf | null>(null);
  const [lastSubmission, setLastSubmission] = useState<SubmissionMeta | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    festivalType: '',
    fullName: '',
    icNumber: '',
    occupation: '',
    countryCode: '60',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    companyName: '',
    businessAddressLine1: '',
    businessAddressLine2: '',
    businessAddressLine3: '',
    businessState: '',
    selectedIpdId: '',
    ipdLine1: '',
    ipdLine2: '',
    ipdLine3: '',
    ipdLine4: '',
    ipdLine5: '',
    applicationDate: undefined,
  });

  // Filter IPD list based on selected business state
  const filteredIpdList = formData.businessState
    ? ipdList.filter((ipd) => ipd.state === formData.businessState)
    : ipdList;

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

  // Handle state selection - reset IPD when state changes
  const handleStateSelect = (state: string) => {
    setFormData((prev) => ({
      ...prev,
      businessState: state,
      // Reset IPD selection when state changes
      selectedIpdId: '',
      ipdLine1: '',
      ipdLine2: '',
      ipdLine3: '',
      ipdLine4: '',
      ipdLine5: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors: Record<string, boolean> = {};

    // Comprehensive Validation
    if (!formData.festivalType) {
      newErrors.festivalType = true;
      toast.error('Sila pilih jenis perayaan (Raya atau CNY)');
    }

    if (!validateRequired(formData.fullName)) {
      newErrors.fullName = true;
      toast.error('Nama Penuh diperlukan');
    }

    if (!validateRequired(formData.icNumber)) {
      newErrors.icNumber = true;
      toast.error('No. Kad Pengenalan diperlukan');
    } else if (!validateIC(formData.icNumber)) {
      newErrors.icNumber = true;
      toast.error('Format No. Kad Pengenalan tidak sah. Format: YYMMDD-PB-NNNN (contoh: 900101-10-1234)');
    }

    if (!validateRequired(formData.occupation)) {
      newErrors.occupation = true;
      toast.error('Pekerjaan diperlukan');
    }

    if (!validateRequired(formData.phone)) {
      newErrors.phone = true;
      toast.error('No. Telefon diperlukan');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = true;
      toast.error('No. Telefon tidak sah. Masukkan 9-11 digit nombor telefon Malaysia');
    }

    if (!validateRequired(formData.addressLine1)) {
      newErrors.addressLine1 = true;
      toast.error('Alamat Rumah (Baris 1) diperlukan');
    }

    if (!validateRequired(formData.companyName)) {
      newErrors.companyName = true;
      toast.error('Nama Syarikat diperlukan');
    }

    if (!validateRequired(formData.businessAddressLine1)) {
      newErrors.businessAddressLine1 = true;
      toast.error('Alamat Premis Perniagaan (Baris 1) diperlukan');
    }

    if (!validateRequired(formData.businessState)) {
      newErrors.businessState = true;
      toast.error('Sila pilih Negeri Premis Perniagaan');
    }

    if (!validateRequired(formData.ipdLine1)) {
      newErrors.selectedIpdId = true;
      toast.error('Sila pilih IPD');
    }

    if (!formData.applicationDate) {
      newErrors.applicationDate = true;
      toast.error('Tarikh Permohonan diperlukan');
    }

    // If there are any errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setGeneratedPdf(null);
    setLastSubmission(null);

    try {
      // Format phone number - auto normalize to 60 format
      let phoneDigits = formData.phone.replace(/\D/g, ''); // Remove all non-digits

      // Remove leading zeros
      phoneDigits = phoneDigits.replace(/^0+/, '');

      // If starts with 60, keep as is. Otherwise add 60 prefix
      const fullPhone = phoneDigits.startsWith('60') ? phoneDigits : `60${phoneDigits}`;

      // Format date for backend (YYYY-MM-DD)
      const backendDate = formData.applicationDate
        ? format(formData.applicationDate, 'yyyy-MM-dd')
        : '';

      // Combine address lines for backend
      const addressLine23 = [formData.addressLine2, formData.addressLine3]
        .filter(line => line.trim())
        .join(', ');

      const businessAddressLine23 = [formData.businessAddressLine2, formData.businessAddressLine3]
        .filter(line => line.trim())
        .join(', ');

      // Prepare payload for PDF service
      const payload = {
        // Personal info
        fullName: formData.fullName,
        icNumber: formData.icNumber,
        occupation: formData.occupation,
        phone: fullPhone,
        countryCode: formData.countryCode,

        // Home address
        addressLine1: formData.addressLine1,
        addressLine23, // Combined lines 2+3

        // Company info (pemohon's company)
        companyName: formData.companyName,

        // Business premises (tapak/gerai) - same as company address
        businessAddressLine1: formData.businessAddressLine1,
        businessAddressLine23, // Combined business lines 2+3

        // IPD info
        ipd: formData.ipdLine1,
        ipdLine1: formData.ipdLine1,
        ipdLine2: formData.ipdLine2,
        ipdLine3: formData.ipdLine3,
        ipdLine4: formData.ipdLine4,
        ipdLine5: formData.ipdLine5,

        // Application date
        applicationDate: backendDate, // YYYY-MM-DD format for backend

        // Festival type
        festivalType: formData.festivalType,
      };

      // Determine templates based on festival type
      const templates = formData.festivalType === 'raya-2026'
        ? [
            'bmfireworks-borang-ipd',
            'bmfireworks-surat-lantikan-raya',
            'bmfireworks-borang-c',
            'bmfireworks-borang-e',
            'bmfireworks-lampiran-a',
            'bmfireworks-surat-kdn',
            'bmfireworks-borang-a',
            'bmfireworks-borang-a-2',
            'bmfireworks-lampiran-a-3',
            'bmfireworks-lampiran-a-4',
            'amflex-surat-lantikan-raya',
            'amflex-borang-c',
            'amflex-borang-e',
            'amflex-lampiran-a',
            'amflex-borang-a',
            'amflex-lampiran-a-1',
            'amflex-lampiran-a2',
            'amflex-lampiran-a3'
          ]
        : [
            'bmfireworks-borang-ipd',
            'bmfireworks-surat-lantikan-cny',
            'bmfireworks-borang-c',
            'bmfireworks-borang-e',
            'bmfireworks-lampiran-a',
            'bmfireworks-surat-kdn',
            'bmfireworks-borang-a',
            'bmfireworks-borang-a-2',
            'bmfireworks-lampiran-a-3',
            'bmfireworks-lampiran-a-4',
            'amflex-surat-lantikan-cny',
            'amflex-borang-c',
            'amflex-borang-e',
            'amflex-lampiran-a',
            'amflex-borang-a',
            'amflex-lampiran-a-1',
            'amflex-lampiran-a2',
            'amflex-lampiran-a3'
          ];

      // Call PDF service via PHP proxy
      const response = await fetch(PDF_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          templates,
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
        festivalType: '',
        fullName: '',
        icNumber: '',
        occupation: '',
        countryCode: '60',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        companyName: '',
        businessState: '',
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

              {/* Festival Type Selection */}
              <section className="space-y-4">
                <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-amber-900">Jenis Perayaan *</h2>
                      <p className="text-sm text-slate-600 mt-1">
                        Pilih jenis perayaan untuk surat lantikan yang sesuai
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="festivalType" className="text-base font-medium">
                        Permohonan untuk Perayaan
                      </Label>
                      <select
                        id="festivalType"
                        value={formData.festivalType}
                        onChange={(e) => handleInputChange('festivalType', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                      >
                        <option value="">-- Sila Pilih Jenis Perayaan --</option>
                        <option value="raya-2026">Hari Raya Aidilfitri 2026</option>
                        <option value="cny-2026">Tahun Baru Cina (CNY) 2026</option>
                      </select>
                      {formData.festivalType && (
                        <p className="text-xs text-green-700 font-medium mt-2">
                          ✓ {formData.festivalType === 'raya-2026'
                            ? 'Surat lantikan untuk Hari Raya Aidilfitri 2026'
                            : 'Surat lantikan untuk Tahun Baru Cina 2026'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

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
                      className={cn(errors.fullName && "border-red-500 focus-visible:ring-red-500")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icNumber">No. Kad Pengenalan *</Label>
                    <Input
                      id="icNumber"
                      placeholder="900101-14-1234"
                      value={formData.icNumber}
                      onChange={(e) => handleInputChange('icNumber', e.target.value)}
                      className={cn(errors.icNumber && "border-red-500 focus-visible:ring-red-500")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Pekerjaan *</Label>
                    <Input
                      id="occupation"
                      placeholder="contoh: Usahawan"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className={cn(errors.occupation && "border-red-500 focus-visible:ring-red-500")}
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
                        className={cn(errors.phone && "border-red-500 focus-visible:ring-red-500")}
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
                      className={cn(errors.addressLine1 && "border-red-500 focus-visible:ring-red-500")}
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
                  <h2 className="text-2xl font-semibold text-amber-900">Maklumat Syarikat Pemohon</h2>
                  <p className="text-sm text-slate-600">
                    Nama syarikat anda yang akan membeli/menjual mercun.
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="companyName">Nama Syarikat *</Label>
                    <Input
                      id="companyName"
                      placeholder="contoh: KEDAI RUNCIT ALI SDN BHD"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className={cn(errors.companyName && "border-red-500 focus-visible:ring-red-500")}
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

              {/* Business Address Section */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-900">Alamat Syarikat / Premis Perniagaan</h2>
                  <p className="text-sm text-slate-600">
                    Alamat syarikat/tapak/gerai yang akan digunakan untuk berniaga mercun.
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="businessState">Negeri Premis Perniagaan *</Label>
                    <Select
                      value={formData.businessState}
                      onValueChange={handleStateSelect}
                    >
                      <SelectTrigger id="businessState" className={cn(errors.businessState && "border-red-500 focus:ring-red-500")}>
                        <SelectValue placeholder="Pilih Negeri" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(new Set(ipdList.map(ipd => ipd.state))).sort().map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-600">
                      Pilih negeri premis perniagaan untuk menapis senarai IPD.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddressLine1">Alamat Premis (Baris 1) *</Label>
                    <Input
                      id="businessAddressLine1"
                      placeholder="No Lot/Gerai, Nama Tapak"
                      value={formData.businessAddressLine1}
                      onChange={(e) => handleInputChange('businessAddressLine1', e.target.value)}
                      className={cn(errors.businessAddressLine1 && "border-red-500 focus-visible:ring-red-500")}
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
                      disabled={!formData.businessState}
                    >
                      <SelectTrigger id="selectedIpd" className={cn(errors.selectedIpdId && "border-red-500 focus:ring-red-500")}>
                        <SelectValue placeholder={formData.businessState ? "Pilih IPD dari senarai" : "Sila pilih Negeri dahulu"} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {filteredIpdList.map((ipd, index) => {
                          // Need to get original index from full ipdList
                          const originalIndex = ipdList.findIndex(
                            item => item.name === ipd.name && item.state === ipd.state
                          );
                          return (
                            <SelectItem key={originalIndex} value={originalIndex.toString()}>
                              {ipd.name} - {ipd.city}, {ipd.state}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-600">
                      {formData.businessState
                        ? `${filteredIpdList.length} IPD di ${formData.businessState}. Maklumat akan auto diisi.`
                        : `Pilih negeri premis perniagaan terlebih dahulu.`
                      }
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
