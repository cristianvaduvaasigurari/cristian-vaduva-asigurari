'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Lock, 
  Info, 
  HelpCircle,
  Laptop,
  Users,
  Briefcase,
  AlertCircle,
  Globe
} from 'lucide-react';
import { submitSmeRiskAuditLead } from '@/lib/actions';

interface AuditState {
  // Step 1: Company Profile
  companyName: string;
  industry: string;
  employeeCount: string;
  locationsCount: string;
  locationTypes: string[];
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
  preferredMethod: string;
  preferredTime: string;

  // Step 2: Property & Physical Assets
  propertyOwnership: 'rented' | 'owned' | 'mixed';
  hasHighValueEquipment: boolean;
  hasSignificantStock: boolean;
  declaredAssetsValue: string;
  hasExistingPropertyInsurance: 'yes' | 'no' | 'unconfirmed';
  propertyExposureTypes: string[];

  // Step 3: Liability & Contracts
  hasPublicLiabilityExposure: boolean;
  hasProfessionalLiabilityNeed: boolean;
  hasContractualLiabilityClauses: boolean;
  hasProductLiabilityExposure: boolean;
  hasExistingLiabilityInsurance: 'yes' | 'no' | 'unconfirmed';

  // Step 4: Cyber & Business Interruption
  itDependence: 'critical' | 'moderate' | 'low';
  processesSensitiveData: boolean;
  hasOfflineBackups: boolean;
  operationalBottleneck: boolean;
  hasExistingCyberOrBI: 'yes' | 'no' | 'unconfirmed';

  // Step 5: Employees & Management
  providesHealthBenefits: boolean;
  hasBusinessTravel: boolean;
  hasKeyPersonExposure: boolean;
  interestedInDO: boolean;

  // Step 6: Existing Policies & Priorities
  existingPolicies: string[];
  upcomingRenewalWindow: string;
  mainConcern: string;

  // Consent
  privacyConsent: boolean;
}

const INITIAL_AUDIT_STATE: AuditState = {
  companyName: '',
  industry: '',
  employeeCount: '1-10',
  locationsCount: '1',
  locationTypes: ['office'],
  contactName: '',
  contactRole: '',
  phone: '',
  email: '',
  preferredMethod: 'Telefon',
  preferredTime: '09:00 - 18:00',

  propertyOwnership: 'rented',
  hasHighValueEquipment: false,
  hasSignificantStock: false,
  declaredAssetsValue: 'sub-100k',
  hasExistingPropertyInsurance: 'unconfirmed',
  propertyExposureTypes: [],

  hasPublicLiabilityExposure: true,
  hasProfessionalLiabilityNeed: false,
  hasContractualLiabilityClauses: false,
  hasProductLiabilityExposure: false,
  hasExistingLiabilityInsurance: 'unconfirmed',

  itDependence: 'moderate',
  processesSensitiveData: true,
  hasOfflineBackups: false,
  operationalBottleneck: false,
  hasExistingCyberOrBI: 'unconfirmed',

  providesHealthBenefits: false,
  hasBusinessTravel: false,
  hasKeyPersonExposure: false,
  interestedInDO: false,

  existingPolicies: [],
  upcomingRenewalWindow: '1-3-luni',
  mainConcern: '',

  privacyConsent: false,
};

export function SmeRiskAudit() {
  const [language, setLanguage] = useState<'ro' | 'en'>('ro');
  const isEn = language === 'en';

  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<AuditState>(INITIAL_AUDIT_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const totalSteps = 7;

  const updateField = <K extends keyof AuditState>(field: K, value: AuditState[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'locationTypes' | 'propertyExposureTypes' | 'existingPolicies', item: string) => {
    setData((prev) => {
      const arr = prev[field] as string[];
      if (arr.includes(item)) {
        return { ...prev, [field]: arr.filter((x) => x !== item) };
      } else {
        return { ...prev, [field]: [...arr, item] };
      }
    });
  };

  // Deterministic synthesis of reported exposures, existing covers, and missing items
  const reportedExposures: string[] = [];
  if (data.hasHighValueEquipment) reportedExposures.push(isEn ? 'High-value equipment & machinery' : 'Echipamente și utilaje de mare valoare');
  if (data.hasSignificantStock) reportedExposures.push(isEn ? 'Commercial inventory / warehouse stock' : 'Stocuri comerciale și mărfuri depozitate');
  if (data.hasPublicLiabilityExposure) reportedExposures.push(isEn ? 'Public and third-party premises liability' : 'Răspundere civilă față de terți la locație');
  if (data.hasProfessionalLiabilityNeed) reportedExposures.push(isEn ? 'Professional advisory / Errors & Omissions' : 'Răspundere profesională / consultanță / servicii');
  if (data.hasContractualLiabilityClauses) reportedExposures.push(isEn ? 'Contractual customer insurance mandates' : 'Cerințe contractuale impuse de clienți sau finanțatori');
  if (data.itDependence === 'critical') reportedExposures.push(isEn ? 'Critical IT infrastructure dependence' : 'Dependență critică de sisteme IT și continuitate');
  if (data.operationalBottleneck) reportedExposures.push(isEn ? 'Single point of operational disruption' : 'Dependență de utilaj sau furnizor cheie (întrerupere activitate)');
  if (data.hasKeyPersonExposure) reportedExposures.push(isEn ? 'Key person / core specialist exposure' : 'Risc de persoană cheie / specialiști esențiali');

  const existingPoliciesReported: string[] = [];
  if (data.hasExistingPropertyInsurance === 'yes') existingPoliciesReported.push(isEn ? 'Property Insurance (Buildings/Stock)' : 'Asigurare Bunuri & Clădiri');
  if (data.hasExistingLiabilityInsurance === 'yes') existingPoliciesReported.push(isEn ? 'General / Professional Liability' : 'Răspundere Civilă / Profesională');
  if (data.hasExistingCyberOrBI === 'yes') existingPoliciesReported.push(isEn ? 'Cyber / Business Interruption Policy' : 'Poliță Cyber / Întreruperea Activității');
  if (data.providesHealthBenefits) existingPoliciesReported.push(isEn ? 'Employee Health / Medical Package' : 'Pachet Sănătate / Asigurare Angajați');

  const topicsForReview: string[] = [];
  if (data.hasExistingPropertyInsurance === 'no' || data.hasExistingPropertyInsurance === 'unconfirmed') {
    topicsForReview.push(isEn ? 'Audit physical asset valuation and underinsurance clauses' : 'Verificare sume asigurate active și clauze de proporționalitate');
  }
  if (data.itDependence === 'critical' && data.hasExistingCyberOrBI !== 'yes') {
    topicsForReview.push(isEn ? 'Evaluation of cyber risk, ransomware recovery & data breach liabilities' : 'Evaluare protecție atacuri cyber, costuri recuperare date și GDPR');
  }
  if (data.hasProfessionalLiabilityNeed && data.hasExistingLiabilityInsurance !== 'yes') {
    topicsForReview.push(isEn ? 'Review professional indemnity coverage limits and defense costs' : 'Stabilire limită de răspundere profesională și cheltuieli de judecată');
  }
  if (data.interestedInDO) {
    topicsForReview.push(isEn ? 'Directors & Officers (D&O) liability protection for managers' : 'Protecție patrimoniu administratori și directori (D&O)');
  }
  if (!data.providesHealthBenefits && parseInt(data.employeeCount) > 5) {
    topicsForReview.push(isEn ? 'Employee health benefit structuring & fiscal deductibility' : 'Structurare pachet sănătate angajați cu facilități fiscale');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.phone) {
      setSubmitError(isEn ? 'Please provide a valid phone number.' : 'Vă rugăm să introduceți un număr de telefon valid.');
      return;
    }
    if (!data.companyName) {
      setSubmitError(isEn ? 'Please provide your company name.' : 'Vă rugăm să introduceți numele companiei.');
      return;
    }
    if (!data.privacyConsent) {
      setSubmitError(isEn ? 'Please consent to the privacy policy to request consultation.' : 'Vă rugăm să confirmați acordul privind prelucrarea datelor pentru programare.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('companyName', data.companyName);
    formData.append('industry', data.industry);
    formData.append('employeeCount', data.employeeCount);
    formData.append('locationsCount', data.locationsCount);
    formData.append('contactName', data.contactName);
    formData.append('contactRole', data.contactRole);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('preferredMethod', data.preferredMethod);
    formData.append('preferredTime', data.preferredTime);
    formData.append('language', language);

    const auditSummary = {
      reportedExposures,
      existingPoliciesReported,
      topicsForReview,
      propertyOwnership: data.propertyOwnership,
      itDependence: data.itDependence,
      upcomingRenewalWindow: data.upcomingRenewalWindow,
      mainConcern: data.mainConcern,
    };
    formData.append('auditSummary', JSON.stringify(auditSummary));

    try {
      const res = await submitSmeRiskAuditLead(formData);
      if (res.success) {
        setSubmissionSuccess(true);
        setReferenceId(res.referenceId || null);
      } else {
        setSubmitError(res.error || (isEn ? 'Submission error. Please try again.' : 'Eroare la trimitere. Vă rugăm să încercați din nou.'));
      }
    } catch {
      setSubmitError(isEn ? 'Unexpected error. Please contact us directly.' : 'A apărut o eroare neprevăzută. Vă rugăm să ne contactați telefonic.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Clock className="w-3.5 h-3.5" />
              {isEn ? '30-Minute SME Risk Audit' : 'Audit Riscuri Companii în 30 de Minute'}
            </div>
            <div className="inline-flex rounded-lg bg-white p-0.5 border border-zinc-200">
              <button
                onClick={() => setLanguage('ro')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'ro' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {isEn ? 'Audit de Riscuri pentru Firma Ta în 30 de Minute' : 'Audit de Riscuri pentru Firma Ta în 30 de Minute'}
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            {isEn
              ? 'A structured preliminary assessment to identify corporate insurance exposures, unconfirmed clauses, and priorities for professional review.'
              : 'O discuție structurată preliminară pentru identificarea expunerilor de asigurare, a informațiilor lipsă și a priorităților de revizuire pentru afacerea ta.'}
          </p>
        </div>

        {/* Legal Disclaimer Pill */}
        <div className="p-4 bg-white/60 border border-zinc-200/60 rounded-xl text-xs text-zinc-500 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            {isEn
              ? 'This audit is a preliminary advisory organization tool. It is not an automated underwriting engine, binding quote, or guarantee that all risks are insurable. Complete terms depend on verified insurer underwriting.'
              : 'Acest audit este un instrument consultativ de cartografiere a expunerilor. Nu constituie o ofertă fermă sau o garanție de preluare a riscurilor. Condițiile definitive sunt stabilite exclusiv prin analiza de subscriere a asigurătorilor autorizați.'}
          </span>
        </div>

        {/* Progress Stepper Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <span>
              {isEn ? `Step ${step} of ${totalSteps}` : `Pasul ${step} din ${totalSteps}`}
            </span>
            <span>
              {step === 1 && (isEn ? 'Company Profile' : 'Profilul Companiei')}
              {step === 2 && (isEn ? 'Property & Assets' : 'Patrimoniu & Clădiri')}
              {step === 3 && (isEn ? 'Liability & Contracts' : 'Răspunderi & Contracte')}
              {step === 4 && (isEn ? 'Cyber & Continuity' : 'Cyber & Continuitate')}
              {step === 5 && (isEn ? 'Team & Management' : 'Echipă & Conducere')}
              {step === 6 && (isEn ? 'Existing Cover & Deadlines' : 'Polițe Curente & Termene')}
              {step === 7 && (isEn ? 'Summary & Consultation' : 'Sinteză & Solicitare Audit')}
            </span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Card Form */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          
          {/* STEP 1: Company Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  {isEn ? 'Step 1: Company Profile & Contact' : 'Pasul 1: Date de Identificare și Contact'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Tell us about your business profile and location.' : 'Informații de bază despre tipul companiei și persoana de legătură.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Company Name *' : 'Denumire Companie (SRL / SA) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={data.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    placeholder="ex. SC Global Logistics SRL"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Main Industry / Activity *' : 'Domeniu Principal de Activitate *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={data.industry}
                    onChange={(e) => updateField('industry', e.target.value)}
                    placeholder="ex. IT / Producție / Comerț / Logistică / Construcții"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Approximate Employee Count' : 'Număr Aproximativ Angajați'}
                  </label>
                  <select
                    value={data.employeeCount}
                    onChange={(e) => updateField('employeeCount', e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="1-5">1 - 5 angajați</option>
                    <option value="6-20">6 - 20 angajați</option>
                    <option value="21-50">21 - 50 angajați</option>
                    <option value="51-200">51 - 200 angajați</option>
                    <option value="200+">Peste 200 angajați</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Operating Locations Count' : 'Număr Locații Operaționale'}
                  </label>
                  <select
                    value={data.locationsCount}
                    onChange={(e) => updateField('locationsCount', e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="1">1 singură locație (sediu)</option>
                    <option value="2-3">2 - 3 locații</option>
                    <option value="4-10">4 - 10 locații / puncte de lucru</option>
                    <option value="10+">Peste 10 locații la nivel național</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Contact Person Name *' : 'Nume Persoană de Contact *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={data.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    placeholder="ex. Mihai Popescu"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Role in Company' : 'Rol în Companie'}
                  </label>
                  <input
                    type="text"
                    value={data.contactRole}
                    onChange={(e) => updateField('contactRole', e.target.value)}
                    placeholder="ex. Administrator / Director Financiar / HR Manager"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Business Phone Number *' : 'Telefon de Contact *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="ex. 0722 000 000"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Business Email' : 'Email Profesional'}
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="ex. contact@companie.ro"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Property & Physical Assets */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-400" />
                  {isEn ? 'Step 2: Property & Physical Assets' : 'Pasul 2: Patrimoniu, Clădiri și Bunuri'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Evaluate property exposures, lease conditions and equipment.' : 'Identifică riscurile legate de spații, stocuri și echipamente tehnologice.'}
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Premises Regime' : 'Regimul Imobilelor și Spațiilor Utilizate'}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'rented', labelRo: 'Chirie (Spații Închiriate)', labelEn: 'Rented Premises' },
                      { id: 'owned', labelRo: 'Proprietate (Deținute)', labelEn: 'Owned Property' },
                      { id: 'mixed', labelRo: 'Mixte (Proprietate + Chirie)', labelEn: 'Mixed Portfolio' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField('propertyOwnership', opt.id as 'rented' | 'owned' | 'mixed')}
                        className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          data.propertyOwnership === opt.id
                            ? 'bg-blue-600/30 border-blue-500 text-white'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        {isEn ? opt.labelEn : opt.labelRo}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                    <input
                      type="checkbox"
                      checked={data.hasHighValueEquipment}
                      onChange={(e) => updateField('hasHighValueEquipment', e.target.checked)}
                      className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm">
                      <span className="font-semibold text-white block">
                        {isEn ? 'High-Value Machinery & Tech Assets' : 'Utilaje, Echipamente și Linii de Producție'}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        {isEn ? 'Specialized equipment critical to operation' : 'Bunuri de valoare ridicată sau în leasing financiar'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                    <input
                      type="checkbox"
                      checked={data.hasSignificantStock}
                      onChange={(e) => updateField('hasSignificantStock', e.target.checked)}
                      className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm">
                      <span className="font-semibold text-white block">
                        {isEn ? 'Significant Inventory & Warehouse Stock' : 'Stocuri Semnificative de Mărfuri & Materii Prime'}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        {isEn ? 'Goods stored in warehouses or retail spaces' : 'Mărfuri cu fluctuații sezoniere de valoare'}
                      </span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Existing Property Insurance Status' : 'Statusul Asigurării de Bunuri Declarat de Utilizator'}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'yes', labelRo: 'Da, avem poliță activă', labelEn: 'Yes, policy in force' },
                      { id: 'no', labelRo: 'Nu deținem asigurare', labelEn: 'No current insurance' },
                      { id: 'unconfirmed', labelRo: 'Necesită verificare clauze', labelEn: 'Terms require review' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField('hasExistingPropertyInsurance', opt.id as 'yes' | 'no' | 'unconfirmed')}
                        className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          data.hasExistingPropertyInsurance === opt.id
                            ? 'bg-blue-600/30 border-blue-500 text-white'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        {isEn ? opt.labelEn : opt.labelRo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Liability & Contracts */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                  {isEn ? 'Step 3: Liability & Contractual Mandates' : 'Pasul 3: Răspundere Civilă și Cerințe Contractuale'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Identify potential claims from third parties, clients, or business partners.' : 'Analizează expunerile față de terți, răspunderea profesională și cerințele clienților.'}
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.hasPublicLiabilityExposure}
                    onChange={(e) => updateField('hasPublicLiabilityExposure', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Premises & Public Liability' : 'Răspundere Civilă Față de Terți la Sediu / Puncte de Lucru'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Visitors, clients or suppliers present on company premises' : 'Clienți, curieri sau vizitatori care intră în contact cu spațiul de lucru'}
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.hasProfessionalLiabilityNeed}
                    onChange={(e) => updateField('hasProfessionalLiabilityNeed', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Professional Indemnity / Advisory / Errors & Omissions' : 'Răspundere Profesională / Servicii Intelectuale / IT / Consultanță'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Losses caused to clients through advisory, coding or project errors' : 'Pretenții ale clienților pentru erori, omisiuni sau întârzieri contractuale'}
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.hasContractualLiabilityClauses}
                    onChange={(e) => updateField('hasContractualLiabilityClauses', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Mandatory Insurance Clauses in Commercial Contracts' : 'Clauze Obligatorii de Asigurare în Contractele cu Clienții'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Partners requiring certificate of insurance with specific limits' : 'Cerințe de a prezenta polițe cu limite specifice de răspundere (ex. 500k EUR)'}
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.hasProductLiabilityExposure}
                    onChange={(e) => updateField('hasProductLiabilityExposure', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Product Liability / Food / Manufacturing' : 'Răspunderea Producătorului (Bunuri Fabricate / Distribuite)'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Defects in manufactured or imported goods causing third-party loss' : 'Produse ce pot genera daune utilizatorilor finali'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Cyber & Business Interruption */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <Laptop className="w-6 h-6 text-blue-400" />
                  {isEn ? 'Step 4: Cyber Risk & Business Interruption' : 'Pasul 4: Riscuri Cibernetice și Continuitatea Afacerii'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Evaluate digital dependence, data protection, and operational downtime risks.' : 'Măsoară dependența digitală, expunerea GDPR și riscul opririi operațiunilor.'}
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Business Dependence on IT Systems & Cloud' : 'Dependența Activității de Sisteme IT și Servicii Cloud'}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'critical', labelRo: 'Critică (Oprire imediată)', labelEn: 'Critical (Instant freeze)' },
                      { id: 'moderate', labelRo: 'Moderată (Rezistă 1-2 zile)', labelEn: 'Moderate (1-2 days)' },
                      { id: 'low', labelRo: 'Scăzută (Procese manuale)', labelEn: 'Low (Manual fallback)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField('itDependence', opt.id as 'critical' | 'moderate' | 'low')}
                        className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          data.itDependence === opt.id
                            ? 'bg-blue-600/30 border-blue-500 text-white'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        {isEn ? opt.labelEn : opt.labelRo}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                    <input
                      type="checkbox"
                      checked={data.processesSensitiveData}
                      onChange={(e) => updateField('processesSensitiveData', e.target.checked)}
                      className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm">
                      <span className="font-semibold text-white block">
                        {isEn ? 'Handling Confidential Customer / Employee Data (GDPR)' : 'Procesare de Date Confidențiale, Plăți sau Date Personale (GDPR)'}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        {isEn ? 'Databases that could trigger breach notifications if compromised' : 'Baze de date clienți, carduri sau informații financiare'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                    <input
                      type="checkbox"
                      checked={data.operationalBottleneck}
                      onChange={(e) => updateField('operationalBottleneck', e.target.checked)}
                      className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm">
                      <span className="font-semibold text-white block">
                        {isEn ? 'Single Critical Asset / Supplier Bottleneck' : 'Punct Unic de Întrerupere (Utilaj Esențial sau Furnizor Cheie)'}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        {isEn ? 'An equipment breakdown directly halting business revenues' : 'Defectarea unui singur echipament blochează complet livrările către clienți'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Employees & Management */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  {isEn ? 'Step 5: Employees, Benefits & Management' : 'Pasul 5: Angajați, Beneficii și Conducere'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Review employee benefits, key person dependencies, and executive liability.' : 'Analizează beneficiile echipei, persoanele cheie și răspunderea administratorilor.'}
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.providesHealthBenefits}
                    onChange={(e) => updateField('providesHealthBenefits', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Existing Employee Health Insurance / Benefits' : 'Pachet Existent de Asigurare de Sănătate sau Abonamente Angajați'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Programs currently offered to staff' : 'Pachete acordate echipei sau interes pentru optimizare fiscală'}
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.hasKeyPersonExposure}
                    onChange={(e) => updateField('hasKeyPersonExposure', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Key Person / Crucial Founder Exposure' : 'Expunere Persoană Cheie (Fondator / Specialist Vital)'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Individuals whose sudden absence would create serious financial impact' : 'Risc financiar major pentru firmă în caz de deces sau invaliditate a persoanei cheie'}
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200/80 rounded-xl cursor-pointer hover:border-slate-600">
                  <input
                    type="checkbox"
                    checked={data.interestedInDO}
                    onChange={(e) => updateField('interestedInDO', e.target.checked)}
                    className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-white block">
                      {isEn ? 'Directors & Officers (D&O) Liability Interest' : 'Protecție Răspundere Administratori și Directori (D&O)'}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {isEn ? 'Shielding personal assets against managerial decision claims' : 'Protecția patrimoniului personal al managementului împotriva pretențiilor asociaților sau creditorilor'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: Existing Cover & Deadlines */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                  {isEn ? 'Step 6: Existing Cover & Main Priorities' : 'Pasul 6: Polițe Curente și Priorități de Revizuire'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Tell us about your upcoming renewal timeline and primary concerns.' : 'Specifică termenele de reînnoire cunoscute și ce dorești să optimizezi cu prioritate.'}
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Upcoming Policy Renewal Window' : 'Orizont de Reînnoire a Polițelor Existente'}
                  </label>
                  <select
                    value={data.upcomingRenewalWindow}
                    onChange={(e) => updateField('upcomingRenewalWindow', e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="urgent">Urgent (sub 30 de zile)</option>
                    <option value="1-3-luni">În următoarele 1 - 3 luni</option>
                    <option value="3-6-luni">În următoarele 3 - 6 luni</option>
                    <option value="evaluare-generala">Evaluare generală (nu avem o dată fixă)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    {isEn ? 'Primary Insurance Concern or Question' : 'Principala Întrebare sau Preocupare legată de Asigurări'}
                  </label>
                  <textarea
                    rows={3}
                    value={data.mainConcern}
                    onChange={(e) => updateField('mainConcern', e.target.value)}
                    placeholder={
                      isEn
                        ? 'e.g. We want to reduce deductible costs, verify cyber limits, or add comprehensive health benefits...'
                        : 'ex. Dorim să optimizăm costurile la reînnoire, să verificăm limitele de răspundere cerute de un client sau să introducem asigurare de sănătate...'
                    }
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Deterministic Summary & Consultation Request */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200/60 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  {isEn ? 'Step 7: Audit Summary & Consultation Request' : 'Pasul 7: Sinteză Audit și Programare Consultanță'}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {isEn ? 'Review your reported risk profile synthesis below and submit your request.' : 'Verifică sinteza structurată generată pe baza răspunsurilor tale.'}
                </p>
              </div>

              {submissionSuccess ? (
                <div className="p-8 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-zinc-900">
                    {isEn ? 'Audit Request Registered Successfully' : 'Solicitarea de Audit a Fost Înregistrată'}
                  </h3>
                  <p className="text-emerald-950 text-sm max-w-lg mx-auto">
                    {isEn
                      ? `Thank you! Reference code: ${referenceId}. We will prepare the structured 30-minute review and contact you via your preferred channel.`
                      : `Mulțumim! Număr referință: ${referenceId}. Vom pregăti sinteza preliminară și te vom contacta în intervalul orar specificat.`}
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/"
                      className="px-6 py-2.5 bg-white hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all inline-block"
                    >
                      {isEn ? 'Return to Homepage' : 'Înapoi la pagina principală'}
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Synthesis Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Reported exposures */}
                    <div className="p-5 bg-zinc-100 border border-zinc-200/80 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {isEn ? 'Reported Exposures' : 'Expuneri Semnalate de Companie'}
                      </div>
                      <ul className="text-xs text-zinc-600 space-y-1.5">
                        {reportedExposures.length > 0 ? (
                          reportedExposures.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              {item}
                            </li>
                          ))
                        ) : (
                          <li className="text-slate-500 italic">
                            {isEn ? 'No major risk spikes reported' : 'Nu au fost bifate expuneri majore'}
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Reported covers */}
                    <div className="p-5 bg-zinc-100 border border-zinc-200/80 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {isEn ? 'Existing Cover Reported' : 'Polițe sau Beneficii Declarate Active'}
                      </div>
                      <ul className="text-xs text-zinc-600 space-y-1.5">
                        {existingPoliciesReported.length > 0 ? (
                          existingPoliciesReported.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {item}
                            </li>
                          ))
                        ) : (
                          <li className="text-slate-500 italic">
                            {isEn ? 'No existing policies recorded in session' : 'Nu au fost consemnate polițe existente'}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Recommended review priorities */}
                  <div className="p-5 bg-blue-950/30 border border-blue-800/40 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      {isEn ? 'Recommended Topics for 30-Minute Consultation' : 'Teme Recomandate pentru Discuția de 30 de Minute'}
                    </div>
                    <ul className="text-xs text-zinc-800 space-y-2">
                      {topicsForReview.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Preferences Review */}
                  <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs text-zinc-600 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-zinc-500 block">{isEn ? 'Company / Contact:' : 'Companie & Contact:'}</span>
                      <strong>{data.companyName}</strong> — {data.contactName} ({data.contactRole || 'Reprezentant'})
                    </div>
                    <div>
                      <span className="text-zinc-500 block">{isEn ? 'Contact Method & Time:' : 'Metodă & Interval:'}</span>
                      {data.phone} ({data.preferredMethod}) • {data.preferredTime}
                    </div>
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={data.privacyConsent}
                        onChange={(e) => updateField('privacyConsent', e.target.checked)}
                        className="mt-1 rounded bg-white border-slate-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-zinc-500 leading-relaxed">
                        {isEn
                          ? 'I agree to the processing of business contact information strictly for scheduling and conducting the 30-minute SME risk consultation. Data is handled under privacy safeguards and not shared with third parties.'
                          : 'Sunt de acord cu prelucrarea datelor de contact furnizate exclusiv în scopul organizării și desfășurării sesiunii consultative de audit de 30 de minute, conform Politicii de Confidențialitate.'}
                      </span>
                    </label>

                    {submitError && (
                      <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {isEn ? 'Submitting Audit Request...' : 'Se înregistrează solicitarea...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {isEn ? 'Schedule 30-Minute SME Risk Consultation' : 'Programează Auditul de Riscuri (30 Min)'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Navigation Prev / Next Buttons */}
          {!submissionSuccess && (
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-200/60">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-50 hover:bg-slate-700 text-zinc-600 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {isEn ? 'Previous Step' : 'Pasul Anterior'}
                </button>
              ) : <div />}

              {step < totalSteps && (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1 && !data.companyName) {
                      setSubmitError(isEn ? 'Please enter your company name.' : 'Vă rugăm să introduceți numele companiei.');
                      return;
                    }
                    setSubmitError(null);
                    setStep((s) => s + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-2 shadow-md shadow-blue-600/30 ml-auto"
                >
                  {isEn ? 'Next Step' : 'Pasul Următor'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
