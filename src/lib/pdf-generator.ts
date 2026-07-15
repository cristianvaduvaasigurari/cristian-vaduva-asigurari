import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDFFromElement(element: HTMLElement, filename: string) {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

// Utility to remove diacritics since jsPDF standard fonts don't support them well
function removeDiacritics(str: string): string {
  if (!str) return "";
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ă/g, "a").replace(/Ă/g, "A")
    .replace(/î/g, "i").replace(/Î/g, "I")
    .replace(/â/g, "a").replace(/Â/g, "A")
    .replace(/ș/g, "s").replace(/Ș/g, "S")
    .replace(/ț/g, "t").replace(/Ț/g, "T")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ţ/g, "t").replace(/Ţ/g, "T");
}

export function generateGenericPDF(title: string, description: string, summary: string, filename: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const cleanTitle = removeDiacritics(title);
  const cleanDesc = removeDiacritics(description);
  const cleanSummary = removeDiacritics(summary);

  // ==========================================
  // PAGE 1: Professional COVER
  // ==========================================
  
  // Cover Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  
  // Cover Accents
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 0, pageWidth, 15, "F");
  doc.rect(0, pageHeight - 15, pageWidth, 15, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("CRISTIAN VADUVA", pageWidth / 2, 80, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("beneficiu Knowledge Platform", pageWidth / 2, 90, { align: "center" });

  doc.setDrawColor(51, 65, 85); // slate-700
  doc.line(pageWidth / 4, 110, (pageWidth / 4) * 3, 110);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  const splitCoverTitle = doc.splitTextToSize(cleanTitle, pageWidth - 40);
  doc.text(splitCoverTitle, pageWidth / 2, 130, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(203, 213, 225); // slate-300
  const splitCoverDesc = doc.splitTextToSize(cleanDesc, pageWidth - 60);
  doc.text(splitCoverDesc, pageWidth / 2, 130 + (splitCoverTitle.length * 10) + 10, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Data Generarii: ${new Date().toLocaleDateString("ro-RO")}`, pageWidth / 2, pageHeight - 40, { align: "center" });

  // ==========================================
  // PAGE 2: SUMMARY CONTENT
  // ==========================================
  doc.addPage();
  
  // Header Page 2
  doc.setFillColor(30, 58, 138); // blue-900
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("AiX Academy Report", 20, 20);

  // Main Content
  doc.setTextColor(30, 41, 59); // slate-800
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Sumar Executiv", 20, 50);
  
  doc.setTextColor(51, 65, 85); // slate-700
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  
  const splitSummary = doc.splitTextToSize(cleanSummary, pageWidth - 40);
  doc.text(splitSummary, 20, 65);

  const contentEnd = 65 + (splitSummary.length * 6);

  // CTA Section
  const ctaY = contentEnd + 20;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(20, ctaY, pageWidth - 40, 45, "F");
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(20, ctaY, pageWidth - 40, 45, "S");

  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Pentru a stabili detaliile politei tale, contacteaza Cristian Vaduva.", 30, ctaY + 15);

  doc.setTextColor(71, 85, 105); // slate-600
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Telefon: +40 767 110 439  |  WhatsApp: +43 650 953 6345", 30, ctaY + 25);
  doc.text("Email: contact@cristianvaduva.com  |  Web: www.cristianvaduva.com", 30, ctaY + 33);

  // Footer Page 2
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.line(20, pageHeight - 30, pageWidth - 20, pageHeight - 30);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(8);
  doc.text("Powered by cristianvaduva.com | Confidential", 20, pageHeight - 20);
  doc.text(`Pagina 2 din 2`, pageWidth - 40, pageHeight - 20);
  
  doc.save(`${filename}.pdf`);
}
