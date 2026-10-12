"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  FileDown, 
  Shield, 
  Camera, 
  Info, 
  AlertTriangle, 
  CheckCircle2,
  PackageCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { 
  HouseholdInventoryItem, 
  generateHouseholdInventoryPdf 
} from "@/lib/pdf-household-inventory";

const CATEGORIES = [
  "Electrocasnice Mari",
  "Electronice, TV & Audio",
  "Laptopuri, Telefoane & IT",
  "Mobilier & Corpuri Iluminat",
  "Ceasuri & Bijuterii",
  "Artă, Tablouri & Colecții",
  "Echipamente Sportive & Scule",
  "Îmbrăcăminte & Bunuri Personale",
  "Alte Bunuri de Valoare"
];

export function HouseholdInventory() {
  const [ownerName, setOwnerName] = useState<string>("");
  const [propertyAddress, setPropertyAddress] = useState<string>("");
  const [currency, setCurrency] = useState<"RON" | "EUR">("RON");

  // Items state
  const [items, setItems] = useState<HouseholdInventoryItem[]>([
    {
      id: "item-1",
      description: "Televizor OLED 65 inch 4K",
      category: "Electronice, TV & Audio",
      purchaseDate: "2024-11",
      estimatedValue: 7500,
      currency: "RON",
      serialNumber: "LG-OLED65-9921",
      notes: "Factură păstrată în cont online retailer"
    },
    {
      id: "item-2",
      description: "Laptop MacBook Pro 16 inch",
      category: "Laptopuri, Telefoane & IT",
      purchaseDate: "2025-02",
      estimatedValue: 12000,
      currency: "RON",
      serialNumber: "C02XYZ12345",
      notes: "Garanție activă"
    },
    {
      id: "item-3",
      description: "Frigider side-by-side no-frost",
      category: "Electrocasnice Mari",
      purchaseDate: "2023-06",
      estimatedValue: 4800,
      currency: "RON",
      serialNumber: "BOSCH-KGN-441",
      notes: "Bucătărie"
    }
  ]);

  // Form input state for adding item
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [purchaseDate, setPurchaseDate] = useState<string>("");
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const totalValue = items.reduce((acc, it) => acc + (it.estimatedValue || 0), 0);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
        setHasPhoto(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const val = Math.max(0, parseFloat(estimatedValue) || 0);
    const newItem: HouseholdInventoryItem = {
      id: `item-${Date.now()}`,
      description: description.trim(),
      category,
      purchaseDate: purchaseDate.trim(),
      estimatedValue: val,
      currency,
      serialNumber: serialNumber.trim() || undefined,
      notes: notes.trim() || undefined,
      hasPhoto
    };

    setItems([...items, newItem]);
    // Reset form
    setDescription("");
    setEstimatedValue("");
    setSerialNumber("");
    setNotes("");
    setPurchaseDate("");
    setHasPhoto(false);
    setPhotoPreview(null);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const handleDownloadPdf = () => {
    const doc = generateHouseholdInventoryPdf({
      ownerName: ownerName.trim() || "Proprietar Asigurat",
      propertyAddress: propertyAddress.trim() || "Locuință Asigurată",
      currency,
      items
    });
    doc.save(`Inventar_Bunuri_Locuinta_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Intro Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
              <PackageCheck className="w-3.5 h-3.5" />
              Pregătire Dosar Daună & Proba Posesiei
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
              Inventar Fotografic & Centralizator Bunuri Locuință
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
              În caz de incendiu, inundație sau efracție, asigurătorul solicită dovada existenței și valorii fiecărui bun. 
              Completează inventarul bunurilor de valoare din casă și generează instant un document PDF securizat pentru dosarul tău personal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={handleDownloadPdf}
              className="bg-zinc-900 hover:bg-black text-white rounded-xl shadow-sm text-xs font-semibold h-11 px-4 flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              Descarcă Raport PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy Notice Box */}
      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 flex items-start gap-3">
        <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-zinc-900 block">Confidențialitate 100% Locală:</strong>
          <p>
            Datele, seriile și fotografiile selectate rămân exclusiv în memoria browserului tău și în documentul PDF generat. 
            Niciun fișier nu este încărcat pe servere externe fără acțiunea ta explicită.
          </p>
        </div>
      </div>

      {/* Owner & Address Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50/60 border border-slate-200/80 rounded-xl text-xs">
        <div>
          <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Nume Titular Asigurat
          </label>
          <Input
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="ex. Cristian Popescu"
            className="h-10 bg-white text-xs rounded-lg"
          />
        </div>
        <div>
          <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Adresă Locuință Asigurată
          </label>
          <Input
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            placeholder="ex. Str. Mihai Eminescu nr. 12, Sector 2, București"
            className="h-10 bg-white text-xs rounded-lg"
          />
        </div>
        <div>
          <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Monedă de Referință
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "RON" | "EUR")}
            className="w-full h-10 bg-white border border-zinc-300 rounded-lg px-3 text-xs text-zinc-900 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="RON">RON (Lei)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} className="p-5 bg-white border border-zinc-200 rounded-xl space-y-4 shadow-xs">
        <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" />
          Adaugă un bun în inventar
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-medium text-zinc-700 mb-1">Descriere Articol / Model *</label>
            <Input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ex. Televizor Sony Bravia 55 inch / Ceas automat Tissot"
              className="h-10 text-xs rounded-lg bg-zinc-50/50"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Categorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 bg-zinc-50/50 border border-zinc-300 rounded-lg px-3 text-xs text-zinc-800"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Valoare Estimată ({currency}) *</label>
            <Input
              required
              type="number"
              min="0"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              placeholder="ex. 4500"
              className="h-10 text-xs rounded-lg bg-zinc-50/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Serie / Marcă / IMEI</label>
            <Input
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="ex. SN-88291039"
              className="h-10 text-xs rounded-lg bg-zinc-50/50"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Dată Achiziție (aprox.)</label>
            <Input
              type="text"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              placeholder="ex. 2024 sau 11/2023"
              className="h-10 text-xs rounded-lg bg-zinc-50/50"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Mențiuni / Dovadă factură</label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ex. Factură păstrată în email"
              className="h-10 text-xs rounded-lg bg-zinc-50/50"
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Poză / Dovadă Vizuală</label>
            <label className="flex items-center justify-center gap-1.5 h-10 px-3 bg-zinc-50 border border-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 transition-colors text-zinc-700">
              <Camera className="w-3.5 h-3.5 text-zinc-500" />
              <span>{hasPhoto ? "Poză selectată ✓" : "Alege poză..."}</span>
              <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
            </label>
          </div>
        </div>

        {photoPreview && (
          <div className="flex items-center gap-3 p-2 bg-zinc-50 rounded-lg border border-zinc-200">
            {/* Local thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoPreview} alt="Previzualizare bun" className="w-12 h-12 object-cover rounded-md border" />
            <span className="text-xs text-zinc-600">
              Previzualizare locală atașată. Documentul PDF menționează posesia dovezii foto.
            </span>
          </div>
        )}

        <div className="pt-1 flex justify-end">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold h-10 px-5">
            + Adaugă Articol în Tabel
          </Button>
        </div>
      </form>

      {/* Itemized Table */}
      <div className="overflow-x-auto border border-zinc-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-100 text-zinc-800 font-semibold border-b border-zinc-200">
            <tr>
              <th className="p-3 w-10">#</th>
              <th className="p-3">Descriere Bun</th>
              <th className="p-3">Categorie</th>
              <th className="p-3">Serie / Marcă</th>
              <th className="p-3">Achiziție</th>
              <th className="p-3 text-right">Valoare ({currency})</th>
              <th className="p-3 text-center w-12">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {items.map((it, idx) => (
              <tr key={it.id} className="hover:bg-zinc-50/80 transition-colors">
                <td className="p-3 text-zinc-500 font-mono">{idx + 1}</td>
                <td className="p-3 font-semibold text-zinc-900">
                  {it.description}
                  {it.notes && <span className="block text-[11px] text-zinc-500 font-normal">{it.notes}</span>}
                </td>
                <td className="p-3 text-zinc-600">{it.category}</td>
                <td className="p-3 text-zinc-600 font-mono text-[11px]">{it.serialNumber || "-"}</td>
                <td className="p-3 text-zinc-600">{it.purchaseDate || "-"}</td>
                <td className="p-3 text-right font-bold text-zinc-900">
                  {new Intl.NumberFormat("ro-RO").format(it.estimatedValue)}
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(it.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors rounded"
                    title="Șterge rând"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-zinc-50 font-bold border-t-2 border-zinc-200 text-zinc-900">
            <tr>
              <td colSpan={5} className="p-3 text-right uppercase tracking-wider text-[11px] text-zinc-600">
                Total Estimativ Bunuri ({items.length} articole):
              </td>
              <td className="p-3 text-right text-sm text-emerald-700">
                {new Intl.NumberFormat("ro-RO").format(totalValue)} {currency}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Disclaimers & Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-amber-900">
          <div className="font-bold flex items-center gap-1.5 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Notă Tehnică & Limită Legală
          </div>
          <p className="leading-relaxed">
            Acest inventar constituie un document privat de pregătire a dosarului de daună și nu garantează acceptarea automată a valorii declarate de către asigurător. 
            În caz de sinistru, asigurătorul verifică aplicarea principiului despăgubirii reale conform condițiilor de asigurare, deducând uzura fizică și franciza stipulată în contract.
          </p>
        </div>

        <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-blue-900">
          <div className="font-bold flex items-center gap-1.5 text-blue-800">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Corelare cu Suma Asigurată a Locuinței
          </div>
          <p className="leading-relaxed">
            Asigură-te că polița ta facultativă de locuință conține o clauză dedicată pentru „Conținut / Bunuri casnice” cel puțin egală cu valoarea calculată de <strong>{new Intl.NumberFormat("ro-RO").format(totalValue)} {currency}</strong>, altfel bunurile vor fi subasigurate.
          </p>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să asiguri corect bunurile din locuință?</strong>
          Trimite-mi valoarea totală pe WhatsApp pentru a include clauzele optime de furt, daune apă și supratensiune electrică.
        </div>
        <WhatsAppCta
          toolName="Inventar Bunuri Locuință"
          contextSummary="Consultanță protecție bunuri casnice și conținut locuință"
          label="Scrie-mi pe WhatsApp pentru Asigurare Bunuri"
          size="md"
        />
      </div>
    </div>
  );
}
