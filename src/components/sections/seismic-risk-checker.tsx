'use client';

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Home, 
  Send, 
  AlertCircle,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { 
  BUCHAREST_SEISMIC_DATASET, 
  SEISMIC_CLASSES_EXPLANATION, 
  OFFICIAL_DATA_SOURCES, 
  SeismicBuildingRecord 
} from '@/data/seismicRiskData';
import { submitSeismicPropertyReviewLead } from '@/lib/actions';

export function SeismicRiskChecker() {
  const [lang, setLang] = useState<'ro' | 'en'>('ro');
  const isRo = lang === 'ro';

  // Search Inputs
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [streetQuery, setStreetQuery] = useState<string>('');
  const [numberQuery, setNumberQuery] = useState<string>('');
  const [homefindUrl, setHomefindUrl] = useState<string>('');

  // Search Results State
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedBuilding, setSelectedBuilding] = useState<SeismicBuildingRecord | null>(null);

  // Lead Form State
  const [interestType, setInterestType] = useState<string>('Cumparator');
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Normalize search text (remove diacritics, lowercase)
  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/b-dul|bvd|bd|str|sos|calea|strada|bulevardul|soseaua/g, '')
      .trim();
  };

  // Filtered dataset
  const searchResults = useMemo(() => {
    if (!streetQuery.trim()) return [];

    const normalizedStreet = normalize(streetQuery);
    const normalizedNumber = numberQuery.trim().toLowerCase();

    return BUCHAREST_SEISMIC_DATASET.filter((item) => {
      // Sector filter
      if (selectedSector !== 'all' && item.sector.toString() !== selectedSector) {
        return false;
      }

      // Street matching
      const itemStreet = normalize(item.streetNameRo);
      const matchesStreet = itemStreet.includes(normalizedStreet) || normalizedStreet.includes(itemStreet);
      if (!matchesStreet) return false;

      // Number matching if provided
      if (normalizedNumber) {
        const itemNumber = item.streetNumber.toLowerCase();
        return itemNumber.includes(normalizedNumber) || normalizedNumber.includes(itemNumber);
      }

      return true;
    });
  }, [streetQuery, numberQuery, selectedSector]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetQuery.trim()) return;

    setHasSearched(true);
    if (searchResults.length === 1) {
      setSelectedBuilding(searchResults[0]);
    } else {
      setSelectedBuilding(null);
    }
  };

  const handleResetSearch = () => {
    setStreetQuery('');
    setNumberQuery('');
    setSelectedSector('all');
    setHomefindUrl('');
    setHasSearched(false);
    setSelectedBuilding(null);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentAddress = streetQuery
      ? `${streetQuery} ${numberQuery ? `nr. ${numberQuery}` : ''} ${selectedSector !== 'all' ? `(Sector ${selectedSector})` : ''}`
      : selectedBuilding
      ? `${selectedBuilding.streetNameRo} nr. ${selectedBuilding.streetNumber} (Sector ${selectedBuilding.sector})`
      : 'București (Adresă nespecificată)';

    if (!phone) {
      setSubmitError(isRo ? 'Vă rugăm să introduceți un număr de telefon valid.' : 'Please provide a valid phone number.');
      return;
    }
    if (!privacyConsent) {
      setSubmitError(isRo ? 'Vă rugăm să confirmați acordul de confidențialitate.' : 'Please consent to the privacy policy.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('propertyAddress', currentAddress);
    formData.append('sector', selectedSector !== 'all' ? selectedSector : selectedBuilding ? selectedBuilding.sector.toString() : 'București');
    formData.append('interestType', interestType);
    formData.append('homefindUrl', homefindUrl);
    formData.append('contactName', contactName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('notes', notes);
    formData.append('language', lang);

    try {
      const res = await submitSeismicPropertyReviewLead(formData);
      if (res.success) {
        setSubmissionSuccess(true);
        setReferenceId(res.referenceId || null);
      } else {
        setSubmitError(res.error || (isRo ? 'Eroare la transmitere.' : 'Error submitting request.'));
      }
    } catch {
      setSubmitError(isRo ? 'A apărut o eroare neprevăzută.' : 'Unexpected error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 text-zinc-900">
      
      {/* HEADER HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 bg-gradient-to-b from-amber-50/30 via-slate-50/20 to-white p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              {isRo ? 'Due Diligence Imobiliar & Asigurări' : 'Real Estate Due Diligence & Insurance'}
            </div>

            {/* Language Switch */}
            <div className="inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-200">
              <button
                type="button"
                onClick={() => setLang('ro')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  lang === 'ro' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Română
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
              {isRo
                ? 'Verifică Imobilul Înainte să Cumperi. Înțelege Riscul Înainte să te Asiguri.'
                : 'Verify Property Before You Buy. Understand Risk Before You Insure.'}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
              {isRo
                ? 'Instrument independent de verificare a încadrării seismice publice (AMCCRS / PMB) pentru clădirile din București, integrat cu analiza eligibilității de asigurare (PAD & Facultativ) și asistență imobiliară HomeFind.'
                : 'Independent address-level tool to check official public seismic risk classifications (AMCCRS / PMB) for Bucharest buildings, connecting structural due diligence with insurance eligibility and HomeFind advisory.'}
            </p>
          </div>

          {/* Key Principle Disclaimers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3.5 bg-white border border-zinc-200/80 rounded-xl space-y-1 shadow-xs">
              <span className="font-semibold text-zinc-900 block">1. Evidență Publică Oficială</span>
              <span className="text-zinc-600">Eșantion verificat din registrul public AMCCRS / PMB cu trimitere la lista completă.</span>
            </div>
            <div className="p-3.5 bg-white border border-zinc-200/80 rounded-xl space-y-1 shadow-xs">
              <span className="font-semibold text-amber-800 block">2. Absența nu confirmă siguranța</span>
              <span className="text-zinc-600">Neidentificarea unei potriviri în eșantion nu atestă siguranța seismică a clădirii.</span>
            </div>
            <div className="p-3.5 bg-white border border-zinc-200/80 rounded-xl space-y-1 shadow-xs">
              <span className="font-semibold text-blue-700 block">3. Impact pe Asigurare & Credit</span>
              <span className="text-zinc-600">Încadrarea influențează direct acceptarea la subscriere facultativă și cerințele băncii.</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND VERIFICATION SECTION */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        
        <div className="border-b border-zinc-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              {isRo ? 'Caută Adresa sau Strada în Registrul de Risc Seismic' : 'Search Address in Bucharest Seismic Register'}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm mt-1">
              {isRo
                ? 'Introdu numele străzii și numărul pentru a căuta în evidențele publice ale clădirilor expertizate tehnic.'
                : 'Enter street name and building number to query municipal records of technically assessed properties.'}
            </p>
          </div>

          {hasSearched && (
            <button
              onClick={handleResetSearch}
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 underline font-semibold self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isRo ? 'Resetează căutarea' : 'Reset search'}
            </button>
          )}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Sector filter */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                {isRo ? 'Sector' : 'Sector'}
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none shadow-xs"
              >
                <option value="all">{isRo ? 'Toate sectoarele (1 - 6)' : 'All Sectors (1 - 6)'}</option>
                <option value="1">Sector 1</option>
                <option value="2">Sector 2</option>
                <option value="3">Sector 3</option>
                <option value="4">Sector 4</option>
                <option value="5">Sector 5</option>
                <option value="6">Sector 6</option>
              </select>
            </div>

            {/* Street name input */}
            <div className="sm:col-span-6">
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                {isRo ? 'Denumire Stradă / Bulevard *' : 'Street Name *'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={streetQuery}
                  onChange={(e) => {
                    setStreetQuery(e.target.value);
                    setHasSearched(false);
                    setSelectedBuilding(null);
                  }}
                  placeholder={isRo ? 'ex. Magheru, Victoriei, Dacia, Mosilor...' : 'e.g. Magheru, Victoriei, Dacia...'}
                  className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none shadow-xs placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Number input */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                {isRo ? 'Număr Imobil (Opțional)' : 'Building Number'}
              </label>
              <input
                type="text"
                value={numberQuery}
                onChange={(e) => {
                  setNumberQuery(e.target.value);
                  setHasSearched(false);
                  setSelectedBuilding(null);
                }}
                placeholder="ex. 2, 25, 54..."
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none shadow-xs placeholder:text-zinc-400"
              />
            </div>

          </div>

          {/* Optional HomeFind URL */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1.5 flex items-center justify-between">
              <span>{isRo ? 'Ai văzut proprietatea pe HomeFind sau alt portal imobiliar? (Opțional)' : 'Link to property listing on HomeFind / portal (Optional)'}</span>
              <a
                href="https://homefind.cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                HomeFind Ecosystem <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="url"
              value={homefindUrl}
              onChange={(e) => setHomefindUrl(e.target.value)}
              placeholder="https://homefind.cristianvaduva.com/proprietate/..."
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" />
              {isRo ? 'Verifică Înregistrarea Seismică a Imobilului' : 'Query Seismic Classification'}
            </button>
          </div>
        </form>

        {/* RESULTS STATES */}
        {hasSearched && (
          <div className="pt-6 border-t border-zinc-200 space-y-6">
            
            {/* STATE 1: Exact Single Match Selected */}
            {selectedBuilding ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-200 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
                        {selectedBuilding.streetNameRo} nr. {selectedBuilding.streetNumber}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-extrabold text-white"
                        style={{
                          backgroundColor:
                            selectedBuilding.seismicClass === 'RsI'
                              ? '#dc2626'
                              : selectedBuilding.seismicClass === 'RsII'
                              ? '#ea580c'
                              : selectedBuilding.seismicClass === 'CONSOLIDAT'
                              ? '#2563eb'
                              : selectedBuilding.seismicClass === 'U1' || selectedBuilding.seismicClass === 'U2' || selectedBuilding.seismicClass === 'U3'
                              ? '#9333ea'
                              : '#ca8a04',
                        }}
                      >
                        {selectedBuilding.seismicClass === 'CONSOLIDAT'
                          ? (isRo ? 'CONSOLIDAT' : 'RETROFITTED')
                          : selectedBuilding.urgencyCategoryOld
                          ? `CAT. URGENȚĂ ${selectedBuilding.urgencyCategoryOld}`
                          : `CLASA ${selectedBuilding.seismicClass}`}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 font-medium">
                      Sector {selectedBuilding.sector}, {isRo ? 'București' : 'Bucharest'} • {isRo ? 'Sursă:' : 'Source:'} {selectedBuilding.amccrsRecordId || (isRo ? 'Evidența Publică PMB' : 'PMB Public Registry')}
                    </div>
                  </div>

                  <a
                    href={selectedBuilding.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 text-xs font-semibold shadow-xs transition-all inline-flex items-center gap-1.5 shrink-0"
                  >
                    {isRo ? 'Verifică în Registrul Oficial AMCCRS' : 'Verify in Official AMCCRS Register'}
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  </a>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80">
                    <span className="text-zinc-500 block">{isRo ? 'An Construcție:' : 'Year Built:'}</span>
                    <span className="text-zinc-900 font-bold text-sm">{selectedBuilding.yearBuilt || (isRo ? 'Nespecificat' : 'Unspecified')}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80">
                    <span className="text-zinc-500 block">{isRo ? 'Regim Înălțime:' : 'Height Regimen:'}</span>
                    <span className="text-zinc-900 font-bold text-sm">{selectedBuilding.levels || (isRo ? 'Nespecificat' : 'Unspecified')}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80">
                    <span className="text-zinc-500 block">{isRo ? 'An Expertiză Tehnică:' : 'Evaluation Year:'}</span>
                    <span className="text-zinc-900 font-bold text-sm">{selectedBuilding.yearEvaluated || (isRo ? 'Înregistrat' : 'Recorded')}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80">
                    <span className="text-zinc-500 block">{isRo ? 'Status Consolidare:' : 'Retrofit Status:'}</span>
                    <span className={`font-bold text-sm ${selectedBuilding.consolidationStatus === 'consolidat' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedBuilding.consolidationStatus === 'consolidat'
                        ? (isRo ? 'Consolidat' : 'Retrofitted')
                        : (isRo ? 'Neconsolidat' : 'Unretrofitted')}
                    </span>
                  </div>
                </div>

                {/* Legacy Urgency Tier Special Notice */}
                {selectedBuilding.urgencyCategoryOld && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-xs space-y-1 text-purple-900">
                    <div className="font-bold text-purple-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-purple-600" />
                      {isRo ? 'Clădire încadrată în Categorie de Urgență (Normativ P100-92):' : 'Legacy Urgency Category Notice (P100-92 Standard):'}
                    </div>
                    <p className="text-purple-900/90 leading-relaxed">
                      {isRo
                        ? 'Acest imobil a fost evaluat tehnic conform vechilor reglementări P100-92. Conform Legii nr. 212/2022, imobilul necesită reevaluare tehnică pentru încadrarea în clasele actuale de risc seismic (RsI – RsIV).'
                        : 'This building was evaluated under legacy P100-92 rules and requires re-evaluation under current Law 212/2022 standards.'}
                    </p>
                  </div>
                )}

                {/* Insurance & Underwriting Eligibility Box */}
                <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs sm:text-sm text-zinc-900">
                  <div className="font-bold text-blue-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                    {isRo ? 'Evaluare Asigurabilitate & Recomandare Subscriere:' : 'Insurance Underwriting Assessment:'}
                  </div>
                  <p className="text-zinc-700 leading-relaxed">
                    {isRo ? selectedBuilding.insuranceEligibilityRo : selectedBuilding.insuranceEligibilityEn}
                  </p>
                  <p className="text-[11px] text-zinc-500 pt-1">
                    {isRo
                      ? '* Condițiile exacte de subscriere, franșizele aplicabile și acceptarea riscului se stabilesc individual de către fiecare companie de asigurare pe baza raportului tehnic și a inspecției de risc.'
                      : '* Final underwriting acceptance, deductibles, and terms are determined individually by each insurer.'}
                  </p>
                </div>

                {/* Data provenance tag */}
                <div className="text-[11px] text-zinc-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-200 pt-3">
                  <div className="space-y-1">
                    <span className="block text-zinc-700 font-medium">
                      {isRo
                        ? `Sursă: ${selectedBuilding.sourceDoc} (Actualizare tabel: 19 mai 2026 • Verificare: Octombrie 2026)`
                        : `Source: ${selectedBuilding.sourceDoc} (Table updated: 19 May 2026 • Verified: October 2026)`}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                      <Info className="w-3 h-3 text-amber-600 shrink-0" />
                      {selectedBuilding.provenanceStatus === 'legacy_classification'
                        ? (isRo ? 'Statut evidență: Categorie de urgență istorică (P100-92)' : 'Registry status: Legacy P100-92 classification')
                        : (isRo ? 'Statut evidență: Eșantion indicativ din registrul public AMCCRS' : 'Registry status: Indicative sample from public AMCCRS registry')}
                    </span>
                  </div>
                  <a
                    href="#solicita-analiza"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-xs"
                  >
                    {isRo ? 'Solicită Ofertă Personalizată' : 'Request Tailored Quote'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : searchResults.length > 1 ? (
              
              /* STATE 2: Multiple Matches Found on Street (Ambiguous Address) */
              <div className="space-y-4">
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between text-xs text-zinc-700">
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    {isRo
                      ? `Au fost identificate ${searchResults.length} imobile expertizate pe strada căutată. Selectează numărul exact pentru a vizualiza datele:`
                      : `Found ${searchResults.length} assessed buildings on this street. Select exact number to view record:`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedBuilding(item)}
                      className="p-4 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 rounded-xl text-left transition-all flex items-center justify-between group shadow-xs cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-zinc-900 text-sm group-hover:text-blue-600 block">
                          {item.streetNameRo} nr. {item.streetNumber}
                        </span>
                        <span className="text-xs text-zinc-500 block">
                          Sector {item.sector} • Construit {item.yearBuilt || (isRo ? 'Nespecificat' : 'N/A')} • {item.levels || (isRo ? 'N/A' : 'N/A')}
                        </span>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-md text-xs font-bold text-white shrink-0 ml-3"
                        style={{
                          backgroundColor:
                            item.seismicClass === 'RsI'
                              ? '#dc2626'
                              : item.seismicClass === 'RsII'
                              ? '#ea580c'
                              : item.seismicClass === 'CONSOLIDAT'
                              ? '#2563eb'
                              : item.seismicClass === 'U1' || item.seismicClass === 'U2' || item.seismicClass === 'U3'
                              ? '#9333ea'
                              : '#ca8a04',
                        }}
                      >
                        {item.seismicClass}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (

              /* STATE 3: No Match in Dataset */
              <div className="p-8 bg-white border border-zinc-200 rounded-2xl text-center space-y-5 shadow-sm">
                <Info className="w-10 h-10 text-amber-600 mx-auto" />
                <h3 className="text-xl font-bold text-zinc-900">
                  {isRo
                    ? `Nu am identificat o potrivire în datele consultate pentru „${streetQuery} ${numberQuery}”`
                    : `No record match found in queried dataset for "${streetQuery} ${numberQuery}"`}
                </h3>
                
                <div className="max-w-2xl mx-auto space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-left space-y-2">
                    <strong className="block text-amber-800 text-sm">
                      {isRo ? 'Mențiune legală și tehnică importantă:' : 'Important legal and technical notice:'}
                    </strong>
                    <p className="leading-relaxed">
                      {isRo
                        ? 'Nu am identificat o potrivire în datele consultate. Acest rezultat nu confirmă că imobilul este sigur seismic și nu înlocuiește verificarea registrului oficial, documentația tehnică sau o evaluare realizată de specialiști.'
                        : 'No match was found in the consulted dataset. This result does not confirm that the building is seismically safe and does not replace official register verification, technical documentation, or an assessment by certified specialists.'}
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-left space-y-1.5 text-xs text-zinc-600">
                    <div className="text-zinc-900 font-semibold">
                      {isRo ? 'Setul de date consultat:' : 'Dataset consulted:'}
                    </div>
                    <p>
                      {isRo
                        ? 'Căutarea a interogat eșantionul local verificat de imobile din evidențele publice ale Primăriei Municipiului București (AMCCRS) — actualizare tabel sursă: 19 mai 2026, verificare manuală: Octombrie 2026. Bucureștiul deține peste 3.000 de imobile expertizate istoric.'
                        : 'The search queried the local verified sample of technically assessed properties from AMCCRS / PMB public records — source table updated: 19 May 2026, manually verified: October 2026.'}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs">
                  <a
                    href="https://amccrs-pmb.ro/lista-imobile/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 rounded-xl font-semibold shadow-xs transition-all inline-flex items-center gap-1.5"
                  >
                    {isRo ? 'Consultă Registrul Complet pe Portalul AMCCRS' : 'Query Full Register on AMCCRS Portal'}
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                  </a>
                  <a
                    href="#solicita-analiza"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-all inline-flex items-center gap-1.5"
                  >
                    {isRo ? 'Solicită Asistență pentru Analiza Imobilului' : 'Request Property Advisory Review'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* EDUCATIONAL SECTION: SEISMIC CLASSES EXPLAINED */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-zinc-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            {isRo ? 'Cadru Legal & Normativ Tehnic' : 'Statutory Classification Standard'}
          </div>
          <h2 className="text-2xl font-heading font-bold text-zinc-900">
            {isRo
              ? 'Ce Înseamnă Clasele de Risc Seismic (Legea 212/2022 & Normativ P100-3)'
              : 'Understanding Seismic Risk Classes in Romania'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SEISMIC_CLASSES_EXPLANATION.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.badgeColor }}
                  />
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                    {isRo ? item.titleRo : item.titleEn}
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {isRo ? item.descriptionRo : item.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200 text-[11px] text-zinc-600">
                <strong className="text-zinc-900 block mb-0.5">
                  {isRo ? 'Impact Asigurare:' : 'Insurance Impact:'}
                </strong>
                {isRo ? item.insuranceImpactRo : item.insuranceImpactEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REAL ESTATE & HOMEFIND INTEGRATION BOX */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 bg-gradient-to-r from-blue-50/40 via-slate-50/20 to-white p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              HomeFind Real Estate Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 tracking-tight">
              {isRo
                ? 'Evaluezi o Achiziție Imobiliară în București?'
                : 'Evaluating a Real Estate Purchase in Bucharest?'}
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {isRo
                ? 'Platforma imobiliară HomeFind vă permite explorarea ofertelor active din piață, iar prin serviciul nostru de consultanță vă sprijinim cu verificarea independentă a documentației tehnice, situația PAD și obținerea asigurării facultative optime.'
                : 'The HomeFind property portal allows you to explore active market opportunities, while our advisory assists you with independent verification of technical documentation, statutory PAD status, and optimal property insurance coverage.'}
            </p>
            <div className="pt-2">
              <a
                href="https://homefind.cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-900 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
              >
                {isRo ? 'Explorează Proprietăți pe HomeFind' : 'Explore Properties on HomeFind'}
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </a>
            </div>
          </div>

          {/* Due Diligence 4-Step Checklist */}
          <div className="p-6 bg-white border border-zinc-200 rounded-2xl space-y-3 shadow-xs">
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              {isRo ? 'Ghidul Cumpărătorului: 4 Pași Înainte de Tranzacție' : 'Buyer Checklist: 4 Essential Steps'}
            </div>
            <ul className="space-y-2 text-xs text-zinc-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{isRo ? '1. Solicită cartea tehnică a blocului și anul exact al recepției construcției.' : '1. Request the structural logbook and exact building reception year.'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{isRo ? '2. Verifică la asociația de proprietari dacă a existat vreo expertiză seismică comandată.' : '2. Inquire with the HOA whether technical expertise was commissioned.'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{isRo ? '3. Verifică condițiile băncii finanțatoare privind clasa de risc seismic admisă la credit.' : '3. Verify mortgage bank policies regarding eligible seismic categories.'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{isRo ? '4. Emite polița obligatorie PAD și analizează opțiunile de asigurare facultativă.' : '4. Issue mandatory PAD and evaluate voluntary property insurance quotes.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* LEAD CONSULTATION FORM */}
      <div id="solicita-analiza" className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-24">
        <div className="border-b border-zinc-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            {isRo ? 'Solicită o Analiză de Asigurare & Verificare Imobil' : 'Request Property Insurance & Due Diligence Review'}
          </h2>
          <p className="text-zinc-600 text-sm mt-1">
            {isRo
              ? 'Trimite-ne detaliile proprietății pe care o evaluezi pentru a analiza opțiunile de asigurare facultativă, PAD și cerințele băncii.'
              : 'Submit the property address you are evaluating for a review of insurance options and bank compliance.'}
          </p>
        </div>

        {submissionSuccess ? (
          <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-2xl font-bold text-zinc-900">
              {isRo ? 'Solicitarea a Fost Înregistrată cu Succes' : 'Request Registered Successfully'}
            </h3>
            <p className="text-emerald-900 text-sm max-w-lg mx-auto">
              {isRo
                ? `Mulțumim! Număr referință: ${referenceId}. Vom analiza adresa și te vom contacta telefonic cu soluțiile de asigurare disponibile.`
                : `Thank you! Reference ID: ${referenceId}. We will review the address and contact you with available insurance options.`}
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmissionSuccess(false)}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition-all inline-block shadow-sm"
              >
                {isRo ? 'Verifică alt imobil' : 'Check another property'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  {isRo ? 'Statutul Tău în Relație cu Imobilul' : 'Your Relationship to Property'}
                </label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs"
                >
                  <option value="Cumparator">{isRo ? 'Cumpărător (Evaluez o achiziție / credit)' : 'Buyer (Evaluating purchase / mortgage)'}</option>
                  <option value="Proprietar">{isRo ? 'Proprietar actual (Doresc asigurare)' : 'Current Owner (Seeking insurance)'}</option>
                  <option value="Chirias">{isRo ? 'Chiriaș / Locator' : 'Tenant / Occupant'}</option>
                  <option value="Agent Imobiliar">{isRo ? 'Agent Imobiliar / Consultant' : 'Real Estate Agent / Broker'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  {isRo ? 'Nume și Prenume *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="ex. Radu Ionescu"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  {isRo ? 'Număr de Telefon *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ex. 0722 000 000"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  {isRo ? 'Email' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex. radu@email.ro"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                {isRo ? 'Mențiuni Suplimentare / Întrebări Specifice' : 'Additional Notes / Questions'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  isRo
                    ? 'ex. Blocul este din 1965, doresc credit ipotecar și am nevoie de ofertă PAD și facultativă...'
                    : 'e.g. Building from 1965, seeking mortgage and need PAD + voluntary quote...'
                }
                className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-zinc-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs placeholder:text-zinc-400"
              />
            </div>

            {/* Privacy Consent */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-1 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-zinc-600 leading-relaxed">
                  {isRo
                    ? 'Sunt de acord cu prelucrarea datelor de contact furnizate exclusiv în scopul analizei de asigurabilitate a imobilului și prezentării ofertelor de asigurare solicitate, conform Politicii de Confidențialitate.'
                    : 'I agree to the processing of contact information solely for property insurance review and consultation.'}
                </span>
              </label>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isRo ? 'Se transmite solicitarea...' : 'Submitting Request...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {isRo ? 'Solicită Analiza de Asigurare pentru Imobil' : 'Request Property Insurance Review'}
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

      {/* OFFICIAL SOURCE REGISTER FOOTER */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-4 text-xs text-zinc-600">
        <div className="font-bold text-zinc-900 uppercase tracking-wider text-xs">
          {isRo ? 'Surse Oficiale de Date & Cadrul de Conformitate' : 'Official Data Provenance & Legal References'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFICIAL_DATA_SOURCES.map((src, idx) => (
            <div key={idx} className="space-y-1">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                {src.name} <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                {isRo ? src.descriptionRo : src.descriptionEn}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-zinc-200 text-zinc-500 text-[11px] text-center">
          {isRo
            ? 'Ultima verificare a evidențelor oficiale: Octombrie 2026. Acest instrument are rol informativ și de asistență preliminară în asigurări. Verificarea oficială definitivă se efectuează prin documentația tehnică de cadastru și cartea funciară.'
            : 'Official records verified: October 2026. This tool provides preliminary insurance advisory assistance and does not replace certified technical building inspections.'}
        </div>
      </div>

    </div>
  );
}
