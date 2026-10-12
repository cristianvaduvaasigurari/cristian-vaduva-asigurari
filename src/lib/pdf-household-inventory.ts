/**
 * Household Inventory Claims Preparation PDF Generator
 * Creates an itemized personal inventory document for property insurance and claims preparation.
 * 100% local, no external server calls.
 */

import { jsPDF } from 'jspdf';

export interface HouseholdInventoryItem {
  id: string;
  description: string;
  category: string;
  purchaseDate?: string;
  estimatedValue: number;
  currency: 'RON' | 'EUR';
  serialNumber?: string;
  notes?: string;
  hasPhoto?: boolean;
}

export interface HouseholdInventoryPdfData {
  ownerName?: string;
  propertyAddress?: string;
  currency: 'RON' | 'EUR';
  items: HouseholdInventoryItem[];
}

function removeDiacritics(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ă/g, 'a').replace(/Ă/g, 'A')
    .replace(/î/g, 'i').replace(/Î/g, 'I')
    .replace(/â/g, 'a').replace(/Â/g, 'A')
    .replace(/ș/g, 's').replace(/Ș/g, 'S')
    .replace(/ț/g, 't').replace(/Ț/g, 'T')
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ţ/g, 't').replace(/Ţ/g, 'T');
}

export function generateHouseholdInventoryPdf(data: HouseholdInventoryPdfData): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Header Bar
  doc.setFillColor(24, 24, 27); // zinc-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('INVENTAR PREVENTIV BUNURI LOCUINTA', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Dosar Personal de Pregatire Dauna & Dovada Prealabila a Posesiei | Cristian Vaduva', margin, 19);

  const dateStr = new Date().toLocaleDateString('ro-RO');
  doc.text(`Generat: ${dateStr}`, pageWidth - margin - 35, 19);

  let y = 38;

  // Property & Owner info box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('DETALII PROPRIETAR & IMOBIL', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const owner = removeDiacritics(data.ownerName || 'Proprietar Neconsemnat');
  const address = removeDiacritics(data.propertyAddress || 'Adresa Nedeclarata');
  doc.text(`Titular: ${owner}`, margin + 4, y + 13);
  doc.text(`Adresa: ${address}`, margin + 80, y + 13);

  y += 26;

  // Inventory Table Header
  doc.setFillColor(37, 99, 235);
  doc.rect(margin, y, contentWidth, 7, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Nr.', margin + 2, y + 5);
  doc.text('Descriere Bun / Articol', margin + 10, y + 5);
  doc.text('Categorie', margin + 70, y + 5);
  doc.text('Serie / Marca', margin + 105, y + 5);
  doc.text('Data Achizitie', margin + 140, y + 5);
  doc.text(`Valoare (${data.currency})`, pageWidth - margin - 22, y + 5);

  y += 7;

  let totalValue = 0;
  let itemCount = 0;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  data.items.forEach((item, index) => {
    if (y > pageHeight - 35) {
      doc.addPage();
      y = 20;

      // Repeat Table Header
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('Nr.', margin + 2, y + 5);
      doc.text('Descriere Bun / Articol', margin + 10, y + 5);
      doc.text('Categorie', margin + 70, y + 5);
      doc.text('Serie / Marca', margin + 105, y + 5);
      doc.text('Data Achizitie', margin + 140, y + 5);
      doc.text(`Valoare (${data.currency})`, pageWidth - margin - 22, y + 5);
      y += 7;
      doc.setFont('helvetica', 'normal');
    }

    const rowBg = index % 2 === 0 ? 255 : 249;
    doc.setFillColor(rowBg, rowBg, rowBg);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, y + 8, margin + contentWidth, y + 8);

    doc.setTextColor(30, 41, 59);
    doc.text(String(index + 1), margin + 2, y + 5.5);

    const desc = removeDiacritics(item.description);
    doc.text(desc.length > 34 ? desc.slice(0, 32) + '...' : desc, margin + 10, y + 5.5);

    const cat = removeDiacritics(item.category);
    doc.text(cat.length > 18 ? cat.slice(0, 16) + '..' : cat, margin + 70, y + 5.5);

    const serial = removeDiacritics(item.serialNumber || '-');
    doc.text(serial.length > 18 ? serial.slice(0, 16) + '..' : serial, margin + 105, y + 5.5);

    const pDate = removeDiacritics(item.purchaseDate || '-');
    doc.text(pDate, margin + 140, y + 5.5);

    const valStr = new Intl.NumberFormat('ro-RO').format(item.estimatedValue);
    doc.setFont('helvetica', 'bold');
    doc.text(valStr, pageWidth - margin - 5, y + 5.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    totalValue += item.estimatedValue;
    itemCount++;
    y += 8;
  });

  // Total Summary Row
  y += 2;
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 9, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 9, 'D');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`TOTAL GENERAL (${itemCount} articole inventariate):`, margin + 10, y + 6);
  const totalFormatted = new Intl.NumberFormat('ro-RO').format(totalValue) + ' ' + data.currency;
  doc.text(totalFormatted, pageWidth - margin - 5, y + 6, { align: 'right' });

  y += 16;

  // Legal & Underwriting Disclaimer Box
  if (y > pageHeight - 35) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(146, 64, 14); // amber-800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AVIZ JURIDIC SI LIMITARI PRIVIND REGIMUL DESPAGUBIRILOR:', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const disclaimerText = removeDiacritics(
    'Acest inventar reprezinta o evidenta personala preventiva intocmita de asigurat si nu constituie o evaluare de patrimoniu certificata sau o acceptare automata a riscului din partea asiguratorului. In cazul producerii unui eveniment asigurat (incendiu, efractie, inundatie), despagubirea efectiva este conditionata de clauzele politei active, de prezentarea dovezilor de proprietate (facturi, bonuri, certificate, extrase cont) si de aplicarea uzurii/fransizei contractuale conform conditiilor generale de asigurare.'
  );
  doc.text(doc.splitTextToSize(disclaimerText, contentWidth - 8), margin + 4, y + 10);

  // Footer on each page
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Pagina ${i} din ${pageCount} | Cristian Vaduva — Consultanta Asigurari | WhatsApp: +43 650 953 6345`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );
  }

  return doc;
}
