'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Scale, 
  Check, 
  AlertCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  Users, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Stethoscope,
  Receipt,
  FileCheck2,
  Globe
} from 'lucide-react';
import { submitCorporateHealthLead } from '@/lib/actions';

export function CorporateHealthJourney() {
  const [language, setLanguage] = useState<'ro' | 'en'>('ro');
  const isEn = language === 'en';

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeCount, setEmployeeCount] = useState('10-50');
  const [locations, setLocations] = useState('');
  const [desiredDate, setDesiredDate] = useState('1-3-luni');
  const [currentBenefits, setCurrentBenefits] = useState('fara-beneficii');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'spitalizare',
    'analize_avansate',
    'decontare_directa'
  ]);
  const [budget, setBudget] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const togglePriority = (id: string) => {
    setSelectedPriorities(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setSubmitError(isEn ? 'Please provide a contact phone number.' : 'Vă rugăm să introduceți numărul de telefon.');
      return;
    }
    if (!companyName) {
      setSubmitError(isEn ? 'Please provide your company name.' : 'Vă rugăm să introduceți denumirea companiei.');
      return;
    }
    if (!privacyConsent) {
      setSubmitError(isEn ? 'Please agree to the privacy policy to submit.' : 'Vă rugăm să confirmați acordul de confidențialitate.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('industry', industry);
    formData.append('employeeCount', employeeCount);
    formData.append('locations', locations);
    formData.append('desiredDate', desiredDate);
    formData.append('currentBenefits', currentBenefits);
    formData.append('priorities', selectedPriorities.join(', '));
    formData.append('budget', budget);
    formData.append('contactName', contactName);
    formData.append('contactRole', contactRole);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('notes', notes);
    formData.append('language', language);

    try {
      const res = await submitCorporateHealthLead(formData);
      if (res.success) {
        setSubmissionSuccess(true);
        setReferenceId(res.referenceId || null);
      } else {
        setSubmitError(res.error || (isEn ? 'Error submitting request.' : 'A apărut o eroare la salvare.'));
      }
    } catch {
      setSubmitError(isEn ? 'Unexpected error. Please contact us.' : 'A apărut o eroare neprevăzută.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <HeartHandshake className="w-4 h-4" />
              {isEn ? 'Corporate Health & Employee Benefits Advisory' : 'Consultanță Asigurări de Sănătate Angajați & Beneficii HR'}
            </div>
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setLanguage('ro')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'ro' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {isEn
              ? 'Employee Health Insurance for HR Teams & Entrepreneurs'
              : 'Asigurare de Sănătate pentru Angajați | Ghid HR & Solicitare Ofertă'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {isEn
              ? 'Design high-retention corporate health programs, compare private health insurance vs medical clinic subscriptions, and optimize fiscal deductibility according to Law 227/2015.'
              : 'Construiește pachete atractive de beneficii medicale pentru echipă, compară asigurarea privată de sănătate cu abonamentele de clinică și valorifică facilitățile fiscale prevăzute de Codul Fiscal.'}
          </p>
        </div>

        {/* Section 1: Value Pillars for Employers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {isEn ? 'Recruitment & Retention' : 'Atracție și Retenție de Talente'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isEn
                ? 'Health insurance is one of the most requested employee benefits in Romania, offering real safety against high hospital costs.'
                : 'Asigurarea medicală este printre primele beneficii extrasalariale solicitate de candidați, asigurând protecție financiară concretă în spitale private.'}
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {isEn ? 'Fiscal Deductibility' : 'Optimizare Fiscală (Art. 76 & 142)'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isEn
                ? 'Employer-paid health insurance up to 400 EUR/year per employee is non-taxable and exempt from CAS and CASS within statutory limits.'
                : 'Primele de asigurare voluntară de sănătate suportate de angajator sunt neimpozabile și scutite de contribuții sociale până la plafonul de 400 EUR/an/angajat.'}
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {isEn ? 'Reduced Absenteeism' : 'Diagnostic Rapid & Spitalizare'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isEn
                ? 'Direct settlement for complex surgery, second medical opinions, and immediate access to top private hospital networks.'
                : 'Decontare directă a costurilor de spitalizare și intervenții chirurgicale complexe, reducând perioadele de inactivitate și concediile medicale prelungite.'}
            </p>
          </div>
        </div>

        {/* Section 2: Technical Distinction Table: Health Insurance vs Medical Subscriptions */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-2 border-b border-slate-700/70 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <FileCheck2 className="w-3.5 h-3.5" />
              {isEn ? 'Technical & Legal Comparison' : 'Diferență Tehnică și Juridică'}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isEn
                ? 'Voluntary Health Insurance vs. Medical Clinic Subscriptions'
                : 'Asigurare Voluntară de Sănătate vs. Abonament Medical la Clinici'}
            </h2>
            <p className="text-slate-300 text-sm">
              {isEn
                ? 'Understanding the fundamental distinction is critical before structuring an employee benefit program.'
                : 'Abonamentul medical și asigurarea de sănătate nu sunt identice contractual și nu oferă același tip de transfer de risc.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/60">
                  <th className="py-3 px-4 font-semibold text-slate-200">
                    {isEn ? 'Feature / Dimension' : 'Caracteristică'}
                  </th>
                  <th className="py-3 px-4 font-semibold text-blue-400">
                    {isEn ? 'Voluntary Health Insurance (VHI)' : 'Asigurare Privată de Sănătate'}
                  </th>
                  <th className="py-3 px-4 font-semibold text-slate-400">
                    {isEn ? 'Medical Clinic Subscription' : 'Abonament Medical la Clinică'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">
                    {isEn ? 'Core Mechanism' : 'Mecanism Principal'}
                  </td>
                  <td className="py-3 px-4 text-emerald-300">
                    {isEn
                      ? 'Financial risk transfer for major medical expenses, hospital bills and complex care.'
                      : 'Transfer de risc financiar: despăgubește costurile spitalizării, intervențiilor și tratamentelor.'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {isEn
                      ? 'Prepaid package of outpatient checkups and predefined routine discounts.'
                      : 'Pachet prepătit de consultații primare și reduceri la servicii de laborator prestabilite.'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">
                    {isEn ? 'Provider Freedom' : 'Rețea de Spitale & Clinici'}
                  </td>
                  <td className="py-3 px-4 text-emerald-300">
                    {isEn
                      ? 'Open access to private hospital networks with direct settlement or worldwide reimbursement.'
                      : 'Acces deschis la rețele vaste de clinici și spitale private, prin decontare directă sau rambursare.'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {isEn
                      ? 'Restricted strictly to the clinics and partner centers of that specific medical brand.'
                      : 'Limitat strict la rețeaua proprie și partenerii afiliați ai furnizorului respectiv de servicii.'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">
                    {isEn ? 'Complex Surgery & Hospitalization' : 'Spitalizare & Chirurgie Complexă'}
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">
                    {isEn
                      ? 'Covered up to significant annual limits (e.g. 50,000 - 200,000 EUR/year).'
                      : 'Acoperită în limite semnificative (de la mii la zeci de mii de euro per eveniment/an).'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {isEn
                      ? 'Usually excluded or offered merely as a modest percentage discount on large hospital bills.'
                      : 'De regulă exclusă sau oferită doar ca discount procentual modest din nota de plată din spital.'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">
                    {isEn ? 'Fiscal Treatment (Law 227/2015)' : 'Tratament Fiscal (Codul Fiscal)'}
                  </td>
                  <td className="py-3 px-4 text-blue-300">
                    {isEn
                      ? 'Up to 400 EUR/year non-taxable / exempt per employee (cumulated with subscriptions & monthly 33% cap).'
                      : 'Până la 400 EUR/an/angajat neimpozabil și scutit de CAS/CASS, cumulat cu abonamentele și plafonul de 33%.'}
                  </td>
                  <td className="py-3 px-4 text-blue-300">
                    {isEn
                      ? 'Shares the same statutory 400 EUR / 33% cumulative threshold under Art. 76(4^1).'
                      : 'Împarte același plafon fiscal de 400 EUR/an conform Art. 76 alin. (4^1) din Legea 227/2015.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: In-Depth Fiscal Accuracy & Statutory References */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            {isEn ? 'Rigorous Fiscal Code Analysis (Law 227/2015)' : 'Cadrul Fiscal Aplicabil: Legea nr. 227/2015 (Codul Fiscal)'}
          </div>

          <h3 className="text-xl font-bold text-white">
            {isEn
              ? 'Employer Tax Deductibility & Employee Exemption Rules'
              : 'Regimul Fiscal al Asigurărilor de Sănătate Suportate de Angajator'}
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              {isEn
                ? 'Under Law 227/2015 on the Romanian Fiscal Code, voluntary health insurance premiums and medical subscriptions benefit from dedicated tax-incentive regimes for both employers and employees, subject to statutory limits.'
                : 'Conform Legii nr. 227/2015 privind Codul Fiscal, primele de asigurare voluntară de sănătate și abonamentele medicale beneficiază de un regim fiscal favorabil, atât în cazul beneficiilor suportate de angajator, cât și în cazul primelor achitate direct de angajat.'}
            </p>

            {/* Structured Fiscal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Regime 1: Employer-Paid */}
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5" />
                  {isEn ? '1. Employer-Paid Benefits (Art. 76 & Art. 142)' : '1. Beneficii Suportate de Angajator (Art. 76 & 142)'}
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>{isEn ? 'Income Tax Exemption: ' : 'Scutire Impozit pe Venit (10%): '}</strong>
                    {isEn
                      ? 'Non-taxable income under Art. 76 para. (4^1) letter t) up to EUR 400/year/employee (RON equivalent).'
                      : 'Venit neimpozabil conform Art. 76 alin. (4^1) lit. t), în limita a 400 EUR/an/angajat (echivalent în lei).'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Social Contributions Exemption: ' : 'Scutire Contribuții Sociale (CAS 25%, CASS 10%, CAM 2,25%): '}</strong>
                    {isEn
                      ? 'Exempt from CAS (Art. 142 lit. s), CASS (Art. 157 para. 2), and CAM (Art. 220^4 para. 2).'
                      : 'Exceptate de la plata CAS (Art. 142 lit. s), CASS (Art. 157 alin. 2) și CAM (Art. 220^4 alin. 2).'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Monthly 33% Salary Ceiling: ' : 'Plafonul Lunar de 33% din Salariul de Bază: '}</strong>
                    {isEn
                      ? 'Must fit within the cumulative monthly extra-salary cap of 33% of base salary together with other Art. 76(4^1) benefits.'
                      : 'Trebuie să se încadreze în plafonul lunar general de 33% din salariul de bază, calculat cumulat cu celelalte beneficii extrasalariale.'}
                  </li>
                </ul>
              </div>

              {/* Regime 2: Employee-Paid & Corporate Deductibility */}
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  {isEn ? '2. Employee-Paid & Corporate Deductibility' : '2. Prime Achitate de Angajat & Deducere Angajator'}
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>{isEn ? 'Personal Deduction (Employee-Paid): ' : 'Deducere Personală (Angajat — Art. 78): '}</strong>
                    {isEn
                      ? 'Deductible from gross salary under Art. 78 para. (2) up to a separate EUR 400/year limit if paid directly by employee.'
                      : 'Deductibilă din venitul brut salarial conform Art. 78 alin. (2) lit. a) pct. (v) în limita a 400 EUR/an.'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Corporate Profit Tax: ' : 'Impozit pe Profit Angajator (Art. 25): '}</strong>
                    {isEn
                      ? 'Treated as deductible personnel expense under Art. 25 para. (1)-(2) for standard corporate tax payers.'
                      : 'Cheltuială deductibilă de personal conform regulilor generale din Art. 25 alin. (1)-(2).'}
                  </li>
                  <li>
                    <strong>{isEn ? 'VAT Treatment: ' : 'Regim TVA (Art. 292): '}</strong>
                    {isEn
                      ? 'Insurance transactions are statutory VAT-exempt without deduction rights under Art. 292 para. (2) letter b).'
                      : 'Operațiunile de asigurare sunt scutite de TVA fără drept de deducere conform Art. 292 alin. (2) lit. b).'}
                  </li>
                </ul>
              </div>

            </div>

            <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-2 text-amber-200">
              <div className="font-semibold flex items-center gap-2 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                {isEn ? 'Critical Regulatory Summary & Limits:' : 'Reguli Cumulative Esențiale și Limite de Aplicare:'}
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-amber-200/90">
                <li>
                  {isEn
                    ? 'The 400 EUR annual threshold is a cumulative ceiling shared by voluntary health insurance premiums and medical clinic subscriptions combined.'
                    : 'Plafonul de 400 EUR/an este un prag cumulativ împărțit de primele de asigurare voluntară de sănătate și abonamentele medicale.'}
                </li>
                <li>
                  {isEn
                    ? 'Amounts exceeding either the EUR 400/year threshold or the monthly 33% base-salary limit are reclassified as taxable salary benefits and subjected to standard salary taxes.'
                    : 'Sumele care depășesc fie plafonul anual de 400 EUR, fie plafonul lunar de 33% din salariul de bază, se asimilează salariilor și se supun impozitării complete.'}
                </li>
                <li>
                  {isEn
                    ? 'Voluntary health insurance (financial risk transfer across hospitals) and medical subscriptions (prepaid outpatient packages) differ substantially in contractual scope.'
                    : 'Asigurarea privată de sănătate (transfer de risc financiar pentru spitalizări) și abonamentul medical (pachet prepătit de consultații) au regimuri contractuale complet distincte.'}
                </li>
              </ul>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <strong>{isEn ? 'Primary Legal Sources: ' : 'Surse legislative primare: '}</strong>
                <a
                  href="https://legislatie.just.ro/Public/DetaliiDocument/171282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Portalul Legislativ — Legea nr. 227/2015 privind Codul Fiscal (Art. 76, Art. 78, Art. 142, Art. 157, Art. 220^4, Art. 292)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="italic text-slate-500">
                {isEn
                  ? 'Verification note: Updated and verified against the applicable Romanian Fiscal Code provisions (verified October 2026). Individual tax treatment may vary based on corporate legal entity type (microenterprise vs. corporate profit tax) and specific collective bargaining terms; formal confirmation with your certified accountant or tax consultant is recommended.'
                  : 'Notă metodologică: Informații actualizate și verificate conform prevederilor Codului Fiscal din România (verificat Octombrie 2026). Tratamentul fiscal concret poate varia în funcție de regimul de impozitare al angajatorului (microîntreprindere vs. plătitor de impozit pe profit) și contractul individual/colectiv de muncă; recomandăm validarea înregistrărilor contabile cu expertul contabil al societății.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Quotation Request & Advisory Form */}
        <div id="solicita-oferta" className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 scroll-mt-24">
          <div className="border-b border-slate-700/70 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-7 h-7 text-blue-400" />
              {isEn ? 'Request Corporate Health Insurance Quotation' : 'Solicită Ofertă Personalizată de Sănătate pentru Echipă'}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {isEn
                ? 'Fill in your basic company requirements below. We will benchmark the market and present tailored group offers.'
                : 'Completează detaliile orientative ale companiei pentru a compara opțiunile de asigurare de sănătate disponibile pe piață.'}
            </p>
          </div>

          {submissionSuccess ? (
            <div className="p-8 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">
                {isEn ? 'Quotation Request Received' : 'Cererea de Ofertă a Fost Transmisă'}
              </h3>
              <p className="text-emerald-200 text-sm max-w-lg mx-auto">
                {isEn
                  ? `Thank you! Reference ID: ${referenceId}. We will review the market options for ${companyName} and contact you with a comparative overview.`
                  : `Mulțumim! Număr referință: ${referenceId}. Vom analiza ofertele asigurătorilor pentru ${companyName} și vă vom prezenta o sinteză comparativă.`}
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all inline-block"
                >
                  {isEn ? 'Return to Homepage' : 'Înapoi la pagina principală'}
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {isEn ? 'Company Name *' : 'Denumire Companie *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ex. Tech Innovations SRL"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {isEn ? 'Industry' : 'Domeniu de Activitate'}
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="ex. IT / Servicii / Retail / Producție"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {isEn ? 'Number of Employees' : 'Număr Angajați Eligibili'}
                  </label>
                  <select
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="3-10">3 - 10 angajați (Micro / IMM mic)</option>
                    <option value="11-50">11 - 50 angajați (Grup Standard)</option>
                    <option value="51-200">51 - 200 angajați (Grup Mediu)</option>
                    <option value="200+">Peste 200 angajați (Corporate / Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {isEn ? 'Locations / Cities' : 'Orașe / Locații Angajați'}
                  </label>
                  <input
                    type="text"
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    placeholder="ex. București, Cluj, Remote național"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {isEn ? 'Implementation Timeline' : 'Orizont de Implementare / Reînnoire'}
                  </label>
                  <select
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="cat-mai-curand">Cât mai curând (sub 30 zile)</option>
                    <option value="1-3-luni">În 1 - 3 luni</option>
                    <option value="evaluare-buget">Evaluare pentru bugetul viitor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {isEn ? 'Current Health Benefits' : 'Beneficii Medicale Curente'}
                  </label>
                  <select
                    value={currentBenefits}
                    onChange={(e) => setCurrentBenefits(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="fara-beneficii">Nu oferim în prezent</option>
                    <option value="abonament-clinica">Abonament la o rețea de clinici</option>
                    <option value="asigurare-existenta">Avem deja o asigurare de sănătate (revizuire)</option>
                  </select>
                </div>
              </div>

              {/* Priorities multi-select */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {isEn ? 'Priority Coverages Desired' : 'Priorități de Acoperire Dorite'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'spitalizare', labelRo: 'Spitalizare & Chirurgie', labelEn: 'Hospitalization & Surgery' },
                    { id: 'analize_avansate', labelRo: 'Analize & Imagistică (RMN/CT)', labelEn: 'Advanced Diagnostics' },
                    { id: 'decontare_directa', labelRo: 'Decontare Directă la Rețea', labelEn: 'Direct Network Settlement' },
                    { id: 'stomatologie', labelRo: 'Stomatologie / Profilaxie', labelEn: 'Dental Care' },
                    { id: 'preventie_checkup', labelRo: 'Check-up Anual Complet', labelEn: 'Annual Health Checkup' },
                    { id: 'extindere_familie', labelRo: 'Opțiune Includere Familie', labelEn: 'Family Dependent Extension' },
                  ].map((p) => {
                    const active = selectedPriorities.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePriority(p.id)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                          active
                            ? 'bg-blue-600/30 border-blue-500 text-white'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span>{isEn ? p.labelEn : p.labelRo}</span>
                        {active && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-700/60 pt-6 space-y-4">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {isEn ? 'Contact Person Details' : 'Date de Contact ale Solicitantului'}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {isEn ? 'Full Name *' : 'Nume și Prenume *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="ex. Elena Ionescu"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {isEn ? 'Role in Company' : 'Funcție / Rol'}
                    </label>
                    <input
                      type="text"
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      placeholder="ex. HR Director / CFO / General Manager"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {isEn ? 'Business Phone *' : 'Telefon *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="ex. 0722 111 222"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {isEn ? 'Business Email' : 'Email Profesional'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ex. hr@companie.ro"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    {isEn ? 'Additional Notes / Specific Questions' : 'Mențiuni sau Întrebări Specifice'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      isEn
                        ? 'e.g. We are interested in a modular tier system for managers vs employees...'
                        : 'ex. Ne interesează o structură diferențiată pe niveluri de management sau includerea membrilor de familie...'
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="space-y-4 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-1 rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    {isEn
                      ? 'I agree to the processing of business contact details solely for preparing and sending the corporate health insurance comparison and proposal.'
                      : 'Sunt de acord cu prelucrarea datelor de contact furnizate exclusiv în scopul transmiterii ofertei comparative de asigurări de sănătate pentru angajați, conform Politicii de Confidențialitate.'}
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
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isEn ? 'Sending Request...' : 'Se transmite cererea de ofertă...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {isEn ? 'Request Comparative Corporate Health Proposal' : 'Solicită Oferta Comparativă de Sănătate'}
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
