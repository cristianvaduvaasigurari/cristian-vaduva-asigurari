/**
 * SME 5-Minute Risk Audit PDF Generator
 * Creates an executive risk audit summary for Romanian businesses and SMEs.
 * 100% local in-browser / Node.js vector rendering with jsPDF.
 */

import { jsPDF } from 'jspdf';

export interface SmeAuditPdfData {
  companyName: string;
  sectorName: string;
  employeeCount?: string;
  auditDate: string;
  reportedExposures: string[];
  existingProtections: string[];
  recommendedTopics: string[];
  missingInformation: string[];
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

export function generateSmeAuditPdf(data: SmeAuditPdfData): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 30, pageWidth, 2.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RAPORT PRELIMINAR AUDIT DE RISCURI IMM', margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Sinteza Evaluarii Expunerilor Operationale & Prioritati de Protectie | Cristian Vaduva', margin, 20);

  const cleanDate = removeDiacritics(data.auditDate || new Date().toLocaleDateString('ro-RO'));
  doc.text(`Data Audit: ${cleanDate}`, pageWidth - margin - 35, 20);

  let y = 40;

  // Company Information Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('IDENTIFICARE ENTITATE EVALUATA', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const cleanCompany = removeDiacritics(data.companyName || 'Companie Nedeclarata');
  const cleanSector = removeDiacritics(data.sectorName || 'General IMM');
  const cleanEmployees = removeDiacritics(data.employeeCount || 'Nedecarat');
  doc.text(`Companie: ${cleanCompany}`, margin + 4, y + 13);
  doc.text(`Sector Activitate: ${cleanSector}`, margin + 70, y + 13);
  doc.text(`Nr. Personal: ${cleanEmployees}`, margin + 135, y + 13);

  y += 26;

  // Section 1: Reported Exposures
  doc.setFillColor(254, 242, 242); // red-50
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'FD');
  doc.setTextColor(185, 28, 28); // red-700
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('1. VULNERABILITATI SI EXPUNERI OPERATIONALE SEMNALATE', margin + 4, y + 5.5);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  if (data.reportedExposures.length === 0) {
    doc.text('Nu au fost identificate expuneri critice majore in raspunsurile furnizate.', margin + 4, y);
    y += 6;
  } else {
    data.reportedExposures.forEach((item) => {
      const cleanItem = removeDiacritics(item);
      doc.text(`• ${cleanItem}`, margin + 4, y);
      y += 5.5;
    });
  }

  y += 4;

  // Section 2: Existing Protections
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'FD');
  doc.setTextColor(21, 128, 61); // emerald-700
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('2. POLITE SI MASURI DE PROTECTIE DECLARATE ACTIVE', margin + 4, y + 5.5);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  if (data.existingProtections.length === 0) {
    doc.text('Nu au fost consemnate polite sau masuri active de transfer financiar al riscului.', margin + 4, y);
    y += 6;
  } else {
    data.existingProtections.forEach((item) => {
      const cleanItem = removeDiacritics(item);
      doc.text(`• ${cleanItem}`, margin + 4, y);
      y += 5.5;
    });
  }

  y += 4;

  // Section 3: Recommended Topics
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'FD');
  doc.setTextColor(29, 78, 216); // blue-700
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('3. CATEGORII RECOMANDATE PENTRU STRUCTURARE SI DISCUTIE', margin + 4, y + 5.5);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  data.recommendedTopics.forEach((item) => {
    const cleanItem = removeDiacritics(item);
    doc.text(`• ${cleanItem}`, margin + 4, y);
    y += 5.5;
  });

  y += 4;

  // Section 4: Missing Information Needed
  if (data.missingInformation && data.missingInformation.length > 0) {
    doc.setFillColor(254, 243, 199); // amber-50
    doc.setDrawColor(253, 230, 138);
    doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'FD');
    doc.setTextColor(180, 83, 9); // amber-700
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('4. INFORMATII SI DOCUMENTE NECESARE PENTRU SUBSCIERE EXACTA', margin + 4, y + 5.5);

    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);

    data.missingInformation.forEach((item) => {
      const cleanItem = removeDiacritics(item);
      doc.text(`• ${cleanItem}`, margin + 4, y);
      y += 5.5;
    });
  }

  y += 6;

  // Legal and regulatory disclaimer
  if (y > pageHeight - 40) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('AVIZ PRIVIND STATUTUL CONSULTATIV AL AUDITULUI:', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  const disclaimer = removeDiacritics(
    'Prezentul document constituie o sinteza orientativa preliminara bazata pe declaratiile reprezentantului companiei si nu reprezinta o certificare legala sau de conformitate de securitate si nici o oferta ferma de asigurare. Nicio asigurare nu este prezentata ca fiind obligatorie prin lege decat in masura in care normele speciale sectoriale o impun expres (ex. malpraxis, transportatori licentiati). Subscrierea efectiva este supusa analizei de risc a asiguratorilor autorizati ASF.'
  );
  doc.text(doc.splitTextToSize(disclaimer, contentWidth - 8), margin + 4, y + 10);

  // Footer on each page
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Pagina ${i} din ${pageCount} | Cristian Vaduva — Consultanta Asigurari IMM | WhatsApp: +43 650 953 6345`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );
  }

  return doc;
}
